# Connaissance Client Constitution

<!-- Sync Impact Report
VERSION: 1.0.0 (Initial adoption)
RATIFICATION_DATE: 2026-06-11
AMENDMENTS: N/A (first version)
NEW_PRINCIPLES: I-VII (all initial)
TEMPLATES_UPDATED: Pending (see Follow-up section)
-->

## Core Principles

### I. Hexagonal Architecture (Ports & Adapters)
The system MUST strictly follow hexagonal/onion architecture with clear separation of concerns:
- **Domain Layer**: Pure business logic, zero framework dependencies, contains aggregates, value objects, domain services, and interfaces (ports)
- **Adapter Layer**: Concrete implementations for persistence, external services, and event publishing
- **API Layer**: REST contracts and HTTP concerns, generated from OpenAPI specifications
- **Application Layer**: Spring Boot assembly, configuration, and dependency injection

**Rationale**: Enables independent testability, framework agnosticism, and clear business-domain isolation. Makes domain logic reusable and evolves independent of technology choices.

### II. Domain-Driven Design (DDD) is Non-Negotiable
- Entity aggregates MUST be identifiable by UUID and enforce invariants
- Value Objects MUST be immutable, strongly typed (e.g., `Nom`, `Prenom`, `CodePostal`, not raw Strings)
- Domain Services MUST encapsulate business use cases (e.g., `ConnaissanceClientService`)
- Domain Exceptions MUST be semantically named (e.g., `ClientInconnuException`, `AdresseInvalideException`)
- Repository interfaces MUST live in domain; implementations in adapters
- Port interfaces (e.g., `ClientRepository`, `CodePostauxService`) MUST reside in domain layer

**Rationale**: DDD keeps the codebase maintainable, explicit, and aligned with business semantics. Strong typing reduces runtime errors and improves IDE support.

### III. API-First with OpenAPI 3.0+
- OpenAPI specification (YAML) is the single source of truth for REST contracts
- Code MUST be generated from OpenAPI via `openapi-generator-maven-plugin`; never manually edit generated stubs
- OpenAPI spec MUST document all use cases, validation rules, business constraints, and response codes
- Specifications MUST include detailed descriptions, examples, and error scenarios
- Version changes in OpenAPI MUST follow semantic versioning (MAJOR.MINOR.PATCH)

**Rationale**: API-first ensures consistency between specification and implementation, reduces drift, enables contract testing, and improves developer experience and documentation automation.

### IV. Test-First with Mandatory Coverage
- Tests MUST be written before or alongside implementation (TDD preferred)
- Unit tests in domain layer MUST test aggregates, value objects, and domain logic in isolation
- Integration tests (naming: `*IT.java`) MUST validate adapter contracts and cross-layer interactions
- Test coverage (JaCoCo) target: **≥80%** excluding generated code and infrastructure
- Test execution MUST use Maven Failsafe for integration tests; unit tests via standard `mvn test`

**Rationale**: Early test design catches requirements misunderstandings, prevents regressions, and documents expected behavior.

### V. Spring Boot & Cloud-Native Standards
- Target Java version: **Java 21** (LTS), enforce via `pom.xml` properties and IDE configuration
- Spring Boot version: **4.0+** (latest stable) with Spring Cloud **2025.1.0+**
- Security MUST use Spring Security + OAuth2 Resource Server; JWT validation mandatory
- Observability MUST include Actuator health endpoints + Prometheus metrics (micrometer)
- Dependency versioning MUST be centralized in parent POM and managed transitively
- Spring Boot Maven Plugin MUST be configured for repackaging into executable JAR

**Rationale**: Ensures compatibility with modern cloud platforms, standard logging/monitoring, and secure by default.

### VI. Dependency Quality & Supply Chain Security
- All external dependencies MUST be scanned via OWASP Dependency-Check before deployment
- Dependency vulnerabilities MUST be addressed within SLA (Critical: 7 days, High: 30 days)
- Direct dependencies MUST be explicitly declared; no implicit transitive dependencies
- Lombok and MapStruct (code generation) MUST be declared in `<annotationProcessorPaths>` only
- Java nullability annotations (JSpecify) MUST be applied to public APIs

**Rationale**: Prevents supply chain attacks, reduces security incidents, and ensures explicit, maintainable dependency graphs.

### VII. Observable, Containerizable, Production-Ready
- Logging MUST use SLF4J + Logback with structured output (JSON in production)
- Metrics MUST be published to Prometheus via micrometer registry
- Health checks MUST respond on `/actuator/health` with detailed component status
- Application MUST run as stateless container (Docker) with JDK 21 base image
- Configuration MUST be externalized via Spring Boot `application.yml` (12-factor app)
- All modules MUST include unit AND integration tests; no module without tests

**Rationale**: Enables observability, predictable deployments, horizontal scaling, and reduced MTTR.

## Architecture Constraints

### Technology Stack (Non-Negotiable)
- **Language**: Java 21 (LTS)
- **Framework**: Spring Boot 4.0+ with Spring Cloud 2025.1.0+
- **Build Tool**: Maven 3.8+ (enforce via wrapper `./mvnw`)
- **Persistence**: MongoDB (primary), no polyglot persistence without governance review
- **Messaging**: Kafka for async events (via Spring Cloud Stream or direct client)
- **API Generation**: OpenAPI 3.0.1 + openapi-generator-maven-plugin
- **Mapping**: MapStruct (type-safe DTO transformation)
- **Immutability**: Lombok with `@FieldDefaults`, `@AllArgsConstructor`, `@EqualsAndHashCode`
- **Nullability**: JSpecify annotations on all public APIs
- **Container**: Docker + JDK 21 base image

### Performance & Reliability
- **Availability Target**: 99.9% uptime (production)
- **Response Time Target**: P95 < 500ms for client queries (excluding network)
- **Throughput Target**: ≥ 100 requests/sec per instance
- **Memory Limit**: Container heap ≤ 512MB for standard workload
- **Resilience**: Circuit breakers (Resilience4j) on external service calls (postal code service)
- **Retry Policy**: Exponential backoff with jitter for transient failures

### Security
- JWT Bearer token validation REQUIRED on all endpoints (except health)
- OAuth2 Resource Server MUST validate token issuer and scopes
- Sensitive data (personal info) MUST NOT appear in logs; sanitize before logging
- Database connections MUST use SSL/TLS (MongoDB connection string validation)
- OWASP Top 10 violations MUST be addressed; dependency scanning non-negotiable

## Development Workflow

### Source Control & Branching
- **Repository**: Multi-module Maven monorepo (root `pom.xml` + module-specific `pom.xml`)
- **Branching**: Conventional (feature/*, bugfix/*, hotfix/*)
- **Commits**: Semantic commit messages (`feat:`, `fix:`, `test:`, `docs:`, `chore:`)
- **PR Requirements**: 
  - All tests passing (unit + integration)
  - Code coverage maintained or improved
  - OWASP scan clean
  - Peer review (≥1 approval)

### Build & Test Execution
- **Local Build**: `./mvnw clean install -DskipTests=false`
- **Local Run**: `./mvnw -pl connaissance-client-app -am spring-boot:run`
- **Generate OpenAPI Code**: `./mvnw -pl connaissance-client-api -am generate-sources`
- **Integration Tests**: `./mvnw verify` (includes Failsafe tests)
- **Docker Build**: `docker build -t connaissance-client:local . && docker run -p 8080:8080 connaissance-client:local`
- **Coverage Report**: Targets ≥80%; generated in `target/site/jacoco/index.html`

### Module Structure (Convention)
```
connaissance-client/
├── connaissance-client-domain        [DDD models, aggregates, ports, services]
├── connaissance-client-db-adapter    [MongoDB repository impl]
├── connaissance-client-cp-adapter    [External services: postal codes]
├── connaissance-client-event-adapter [Kafka event publishing]
├── connaissance-client-api           [OpenAPI spec + generated controllers/DTOs]
└── connaissance-client-app           [Spring Boot assembly + configuration]
```
Each adapter MUST have its own `src/test` folder with integration tests.

## Governance

### Versioning Policy
- **Format**: MAJOR.MINOR.PATCH (SemVer 2.0.0)
- **MAJOR**: Breaking API changes, domain model restructuring, persistence layer migration
- **MINOR**: New domain use cases, new adapter implementations, new Kafka events
- **PATCH**: Bug fixes, documentation updates, dependency upgrades (non-breaking)
- **Pre-release**: `-SNAPSHOT` during active development; release via Maven release plugin

### Constitution Amendment Process
1. Identify gap or violation (issue in repo or code review finding)
2. Draft amendment addressing root cause with rationale
3. Peer review by architecture team (≥2 approvals)
4. Update constitution in `constitution.md` with new version and `LAST_AMENDED_DATE`
5. Update all dependent templates (spec-template, plan-template, tasks-template)
6. Commit with message: `docs: amend constitution to vX.Y.Z (principle: description)`

### Compliance Review Cadence
- **PR-level**: Every PR MUST verify hexagonal structure, DDD principles, test coverage, security scan
- **Sprint-level**: Weekly code review checklist against constitution (alignment verification)
- **Release-level**: Pre-release checklist: coverage ≥80%, zero high-severity vulnerabilities, all integration tests green

### Dispute Resolution
- Complexity exceptions require architecture team consensus + constitution update
- Deviations from core principles (I, II, III, IV, VII) are NON-NEGOTIABLE without governance amendment
- Principle VI (dependency security) is NON-NEGOTIABLE per legal/compliance requirements

**Version**: 1.0.0 | **Ratified**: 2026-06-11 | **Last Amended**: 2026-06-11
