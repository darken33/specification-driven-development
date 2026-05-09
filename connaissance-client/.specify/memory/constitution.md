# Connaissance Client — Constitution

<!-- Sync Impact Report: Version 1.0.0 (initial constitution), Ratified: 2026-04-22 -->
<!-- All principles derived from existing codebase analysis; no prior constitution to supersede -->

## Core Principles

### I. Domain-Driven Design (DDD) — Non-Negotiable

**Mandate**: All features MUST follow strict DDD architecture with clear separation between domain logic and infrastructure.

**Requirements**:
- **Domain Module** (core business logic): Framework-agnostic, testable, contains aggregates, value objects, repositories (interfaces), domain services
- **Adapters** (infrastructure): Database (MongoDB), external services, event publishers (Kafka)
- **API Module**: OpenAPI-first contract generates DTOs and controller stubs; business logic delegates to domain
- **App Module**: Spring Boot assembly layer only; wires adapters and services via Spring beans

**Rationale**: DDD enables business logic to remain independent from frameworks and databases, making testing faster, evolution safer, and team onboarding clearer.


### II. Test-First Development (MANDATORY)

**Mandate**: Every feature starts with failing tests; RED-GREEN-REFACTOR cycle is non-negotiable.

**Requirements**:
- Test structure: Given-When-Then pattern (readable, deterministic)
- Unit tests (mocks): Domain logic covered at near 100% via `ConnaissanceClientServiceImpl`, repositories, value objects
- Integration tests (suffix `IT.java`): Exercise full HTTP→Domain→DB flow; use `@SpringBootTest` + test containers
- Minimum coverage threshold: **80% via Jacoco**; higher coverage on domain and API layers (>90%)
- Mock external services: `CodePostauxService`, `AdresseEventService`, `ClientRepository` are injected; never hit real Kafka/DB in unit tests

**Rationale**: Tests serve as contract documentation and safety net for refactoring; Given-When-Then clarity prevents debugging confusion.


### III. Separation of Concerns (Port-Adapter Pattern)

**Mandate**: All infrastructure dependencies MUST be abstracted via Ports (interfaces) in the domain; Adapters provide implementations.

**Requirements**:
- **Ports** (domain boundaries): `ClientRepository`, `CodePostauxService`, `AdresseEventService` reside in domain module as pure interfaces
- **Adapters** (interchangeable implementations):
  - `connaissance-client-db-adapter`: MongoDB persistence with `ClientRepositoryImpl`
  - `connaissance-client-cp-adapter`: External postal code validation service
  - `connaissance-client-event-adapter`: Event publishing (Kafka prod, in-memory workshop)
- **Spring Configuration**: Wiring adapters to ports happens in `ConnaissanceClientApplication` (@Bean definitions); adapters must be swappable via `@ConditionalOnProperty`
- **No Domain Imports of Spring**: Domain module MUST NOT depend on `spring-boot`, `spring-context`, or `spring-data`

**Rationale**: Adapters are interchangeable (test workshops vs. production); business rules stay pure; infrastructure changes don't cascade to domain.


### IV. Java 21 & Modern Language Features

**Mandate**: Project targets Java 21+; use modern language features to reduce boilerplate and improve expressiveness.

**Requirements**:
- **Java Version**: Compiler source/target = 21 (set in root pom.xml: `<maven.compiler.source>21</maven.compiler.source>`)
- **Records for Value Objects**: Immutable, type-safe data carriers (`Nom`, `Prenom`, `Adresse`, `Destinataire` use `public record`)
- **Jakarta Annotations**: Use `@NonNull` from `org.jspecify` for null-safety contracts
- **Lombok for Boilerplate**: `@AllArgsConstructor`, `@Slf4j`, `@Component` reduce noise in classes like `ConnaissanceClientServiceImpl`
- **Pattern Matching**: Prefer modern patterns over instanceof chains
- **Text Blocks**: For multiline strings (e.g., OpenAPI descriptions)

**Rationale**: Java 21 records eliminate getter/setter noise; null-safety contracts prevent NullPointerException; code is more readable and maintainable.


### V. OpenAPI-First Contract Design

**Mandate**: API behavior is defined first in OpenAPI YAML; Java DTOs/controllers are generated, not manually written.

**Requirements**:
- **Source of Truth**: `connaissance-client-api/src/main/resources/connaissance-client-api.yaml` defines all endpoints, request/response schemas, error codes
- **Code Generation**: `openapi-generator-maven-plugin` (v7.18.0) generates `ConnaissanceClientApiController` and DTOs → `target/generated-sources`
- **Never Edit Generated Code**: Delegate pattern in `ConnaissanceClientDelegate` intercepts generated controller calls; business logic resides here and calls domain service
- **Versioning**: API version in OpenAPI (currently v2.1.0); PATCH versions for minor fixes, MINOR for new endpoints, MAJOR for breaking changes
- **Documentation**: OpenAPI descriptions explain business rules, validation, performance expectations

**Rationale**: OpenAPI-first prevents drift between spec and implementation; code generation eliminates manual DTO maintenance; contract clarity reduces integration bugs.


### VI. Adaptive Profiles: Workshop vs. Production

**Mandate**: Codebase MUST support multiple deployment profiles without code duplication; use Spring's `@ConditionalOnProperty`.

**Requirements**:
- **Workshop Profile** (`workshop.enabled=true`): In-memory adapters for fast learning, offline development
  - `InMemoryAdresseEventServiceImpl`: Captures events in thread-safe list (CopyOnWriteArrayList), no Kafka required
  - `WorkshopClientRepositoryImpl`: Optional in-memory repository for demo scenarios
- **Production Profile** (`workshop.enabled=false`, default): Real adapters for production workloads
  - `ClientRepositoryImpl`: MongoDB persistence via Spring Data
  - `KafkaAdresseEventServiceImpl`: Event publishing to Kafka (future implementation)
- **Explicit Switching**: Adapter selection happens at Spring bean creation time; no runtime branching in business logic

**Rationale**: Developers can run and test locally without Docker; production deployment uses same codebase; reduces maintenance burden.


### VII. Enforced Quality Gates

**Mandate**: All code MUST pass security, dependency, and coverage checks before merge.

**Requirements**:
- **OWASP Dependency Check** (v9.0.8): All CVEs rated medium+ must be resolved or explicitly waived with justification
- **Jacoco Coverage**: Minimum 80% line coverage; domain and API layers must exceed 90%
  - Reports generated in `target/site/jacoco/` for PR review
  - Coverage regression detected in CI builds
- **SonarQube Analysis** (optional, recommended): Code smells, security hotspots, maintainability index tracked
- **Maven Enforcer**: Dependency convergence rules; no conflicting transitive versions
- **Failing Tests = Blocking**: No green builds with red tests; CI gate requires `mvn verify` to pass

**Rationale**: Security vulnerabilities and low coverage are technical debt that compounds; early detection prevents production incidents.


### VIII. Semantic Versioning & API Stability

**Mandate**: Releases follow MAJOR.MINOR.PATCH semver; breaking changes are rare and justified.

**Format**: `<MAJOR>.<MINOR>.<PATCH>-<QUALIFIER>` (e.g., `2.2.0-SNAPSHOT`)

**Requirements**:
- **MAJOR**: Aggregate root structure change, port interface removal, mandatory DTO field removal (rare)
- **MINOR**: New port, new adapter, new endpoint without breaking existing contracts
- **PATCH**: Bug fixes, internal optimizations, documentation, Javadoc updates, security patches (zero-downtime deployments OK)
- **Snapshot Builds**: `-SNAPSHOT` suffix during development; releases MUST drop this suffix (Maven convention)
- **Backward Compatibility**: PATCH and MINOR must not break existing OpenAPI contracts; clients on older MINOR versions must still work

**Rationale**: Clear versioning prevents surprise breaks; semver enables automated dependency upgrades with confidence.


## Technology Stack (Non-Negotiable)

### Core Runtime
- **Java**: 21 (or later)
- **Spring Boot**: 4.0.1+ (LTS releases preferred)
- **Spring Cloud**: 2025.1.0 (service discovery, config, resilience)

### Data & Persistence
- **MongoDB**: Primary data store (via Spring Data MongoDB)
- **Schema**: Flat document design for now; future: embed addresses in client document if access patterns justify
- **TTL Indexes**: Consider for audit trail and hard-deleted records (future)

### Messaging & Events
- **Kafka**: Event streaming; events published asynchronously when address/situation changes (future: enable in production)
- **Schema Registry**: Avro schemas for event versioning (optional, prepare for)

### Code Generation & Quality
- **OpenAPI Generator**: Java 21 template, Jackson (JSON serialization)
- **MapStruct**: Annotation-driven DTO ↔ Domain mapping (v1.6.3+); maintains type safety
- **Jacoco**: Line and branch coverage reporting; integrated in Maven surefire/failsafe
- **Lombok**: Reduce boilerplate; use `@AllArgsConstructor`, `@Data` (with caution), `@Slf4j`
- **JSpecify**: Null-safety annotations for better tooling support

### Testing
- **JUnit 5** (Jupiter): Test framework (bundled in spring-boot-starter-test)
- **Mockito**: Mock external dependencies; use `@Mock`, `when()`, `verify()`
- **TestContainers** (optional, recommended): Real MongoDB/Kafka containers for integration tests avoiding brittle docker-compose coupling
- **Maven Failsafe**: Separate integration test execution (naming: `*IT.java`)

### Build & Deployment
- **Maven 3.9+**: Multi-module reactor build; use wrapper `./mvnw`
- **Docker**: Single-stage Dockerfile (Alpine base for size); JAR placement in `/app/connaissance-client.jar`
- **Docker Compose**: `env-tests/docker/docker-compose.yml` for local dev; includes MongoDB, Kafka, Schema Registry, Zookeeper

### Observability (Future Enhancements)
- **Micrometer**: Metrics collection (bundled with Spring Boot Actuator)
- **Structured Logging**: SLF4J + Logstash JSON format (prepare for)
- **Distributed Tracing**: Spring Cloud Sleuth + Jaeger (optional, prepare for)


## Development Workflow & Quality Gates

### Branching & Commits
- **Feature Branches**: `feature/<ticket-id>-<description>` (e.g., `feature/TICKET-123-add-email-field`)
- **Commit Messages**: Conventional Commits (feat/fix/docs/chore); link to ticket IDs
- **PR Required**: No direct commits to main; all code reviewed and tested before merge
- **Automated Checks**: CI pipeline runs `mvn clean verify` (tests + coverage + dependency check)

### Code Review Checklist
1. **Architecture**: Does it follow DDD? Are ports abstracted?
2. **Testing**: Is there enough test coverage? Given-When-Then pattern clear?
3. **Naming**: Are class/method names declarative? (e.g., `changementSituation` → `updateFamilialStatus` clearer)
4. **Dependencies**: Any new transitive deps? OWASP check passed?
5. **Backward Compatibility**: Does it break existing OpenAPI contracts?
6. **Documentation**: Javadoc on public methods? OpenAPI descriptions updated?

### Pre-Merge Gates
- [ ] `mvn clean install -DskipTests=false` passes locally (all tests GREEN)
- [ ] Jacoco coverage report reviewed: no regressions
- [ ] No OWASP CVEs rated medium+ unresolved
- [ ] OpenAPI schema updated if API changed
- [ ] 2+ PR approvals (architecture review + domain expert)

### Release Process (Future)
1. Update version in `pom.xml`: bump MAJOR/MINOR/PATCH per semver rules
2. Tag commit: `vX.Y.Z` (e.g., `v2.2.0`)
3. Build release artifact: `mvn clean package -DskipTests` (release build uses no-snapshot JAR)
4. Docker image: `docker build -t connaissance-client:X.Y.Z .`
5. Deploy to staging; run smoke tests (API health check, sample requests)
6. Promote to production (blue-green deployment recommended; Kubernetes rolling update)


## Governance & Amendments

### Constitution Authority
This constitution supersedes all other architectural guidance documents. In case of conflict:
1. Constitution's intent prevails
2. Individual judgement on edge cases: escalate to architecture review team

### Amendment Process
1. **Trigger**: Architectural decision record (ADR) filed with justification
2. **Proposal**: Draft constitution change (what, why, impact)
3. **Review**: Architecture council (lead, 2+ senior engineers) approves
4. **Documentation**: Sync Impact Report added as HTML comment (old → new versions, affected templates/processes)
5. **Effective Date**: Amendment applies to all new branches post-merge; ongoing work grandfathered if costly to retrofit
6. **Version Bump**: Constitution version updated per semver rules (MAJOR/MINOR/PATCH)

### Compliance Monitoring
- **Quarterly Reviews**: Test coverage trends, CVE remediation SLA, API breaking change count
- **PR Gate Automation**: Linting (Checkstyle), test coverage checks, dependency check in CI pipeline
- **Onboarding**: All new team members sign off on constitution understanding (recorded in project wiki)

### Non-Compliance Escalation
- **Minor Breach** (e.g., one test missing, documentation typo): Comment in PR, ask for fix before merge
- **Moderate Breach** (e.g., direct domain import from adapter, <75% test coverage): BLOCK PR, escalate to tech lead
- **Severe Breach** (e.g., hardcoded secrets, disabled OWASP check, manual DTO edits): Reject, escalate to architect + security team

---

**Version**: 1.0.0 | **Ratified**: 2026-04-22 | **Last Amended**: 2026-04-22

<!-- Sync Impact Report Summary
This is the initial constitution (v1.0.0). All principles derived from live codebase analysis (Java 21, Spring Boot 4, DDD patterns, test coverage, OpenAPI generation).

Affected Templates (post-constitution):
- .specify/templates/spec-template.md: Ensure API specs reference OpenAPI-first principle
- .specify/templates/plan-template.md: Add architecture review gate for DDD compliance
- .specify/templates/tasks-template.md: Include test coverage verification tasks
- README.md: Link to constitution; reference semver policy

Todo:
- TODO(TESTCONTAINERS_SETUP): Implement TestContainers for MongoDB/Kafka IT tests (replaces docker-compose brittleness)
- TODO(KAFKA_PRODUCTION): Enable KafkaAdresseEventServiceImpl in production profile
- TODO(SLEUTH_TRACING): Add Spring Cloud Sleuth for distributed tracing
- TODO(LINT_CONFIG): Add Checkstyle + SpotBugs to Maven enforcer
-->
