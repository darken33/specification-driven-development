import { delay, http, HttpResponse } from 'msw';
import {
  Adresse,
  ApiConnaissanceClientCreateDto,
  ApiConnaissanceClientDto,
  Situation
} from '../../app/features/client-management/models/connaissance-client.model';
import { connaissanceClientFixtures } from '../fixtures/connaissance-client.fixtures';
import { resolveScenario } from './scenario.util';

type Scenario = 'success' | 'validation_error' | 'server_error' | 'slow';

let clientsDb: ApiConnaissanceClientDto[] = structuredClone(connaissanceClientFixtures);

function findClientIndex(id: string): number {
  return clientsDb.findIndex((client) => client.id === id);
}

function asId(idParam: string | readonly string[] | undefined): string {
  if (typeof idParam === 'string') {
    return idParam;
  }

  if (Array.isArray(idParam)) {
    return typeof idParam[0] === 'string' ? idParam[0] : '';
  }

  return '';
}

function buildApiError(status: number, message: string, path: string) {
  return {
    timestamp: new Date().toISOString(),
    status,
    error: status === 500 ? 'Internal Server Error' : 'Bad Request',
    message,
    path
  };
}

async function maybeDelay(scenario: Scenario): Promise<void> {
  await delay(scenario === 'slow' ? 2000 : 300);
}

function resolveManagementScenario(request: Request): Scenario {
  return resolveScenario(request, ['success', 'validation_error', 'server_error', 'slow']) as Scenario;
}

export const connaissanceClientManagementHandlers = [
  http.post('/v1/connaissance-clients', async ({ request }) => {
    const scenario = resolveManagementScenario(request);
    await maybeDelay(scenario);

    if (scenario === 'server_error') {
      return HttpResponse.json(
        buildApiError(500, 'Mocked backend error', '/v1/connaissance-clients'),
        { status: 500 }
      );
    }

    if (scenario === 'validation_error') {
      return HttpResponse.json(
        buildApiError(400, 'Validation failed for client creation', '/v1/connaissance-clients'),
        { status: 400 }
      );
    }

    const payload = (await request.json()) as ApiConnaissanceClientCreateDto;
    const newClient: ApiConnaissanceClientDto = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
      ...payload
    };

    clientsDb = [newClient, ...clientsDb];
    return HttpResponse.json(newClient, { status: 201 });
  }),

  http.get('/v1/connaissance-clients/:id', async ({ params, request }) => {
    const scenario = resolveManagementScenario(request);
    const id = asId(params['id']);
    await maybeDelay(scenario);

    if (scenario === 'server_error') {
      return HttpResponse.json(
        buildApiError(500, 'Mocked backend error', `/v1/connaissance-clients/${id}`),
        { status: 500 }
      );
    }

    if (scenario === 'validation_error') {
      return HttpResponse.json(
        buildApiError(400, 'Invalid identifier', `/v1/connaissance-clients/${id}`),
        { status: 400 }
      );
    }

    const match = clientsDb.find((client) => client.id === id);
    if (!match) {
      return HttpResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 404,
          error: 'Not Found',
          message: 'Client not found',
          path: `/v1/connaissance-clients/${id}`
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(match);
  }),

  http.put('/v1/connaissance-clients/:id/adresse', async ({ params, request }) => {
    const scenario = resolveManagementScenario(request);
    const id = asId(params['id']);
    await maybeDelay(scenario);

    if (scenario === 'server_error') {
      return HttpResponse.json(buildApiError(500, 'Mocked backend error', `/v1/connaissance-clients/${id}/adresse`), {
        status: 500
      });
    }

    if (scenario === 'validation_error') {
      return HttpResponse.json(
        buildApiError(400, 'Validation failed for adresse update', `/v1/connaissance-clients/${id}/adresse`),
        { status: 400 }
      );
    }

    const clientIndex = findClientIndex(id);
    if (clientIndex < 0) {
      return HttpResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 404,
          error: 'Not Found',
          message: 'Client not found',
          path: `/v1/connaissance-clients/${id}/adresse`
        },
        { status: 404 }
      );
    }

    const payload = (await request.json()) as Adresse;
    const updatedClient: ApiConnaissanceClientDto = {
      ...clientsDb[clientIndex],
      ligne1: payload.ligne1,
      ligne2: payload.ligne2,
      codePostal: payload.codePostal,
      ville: payload.ville
    };

    clientsDb[clientIndex] = updatedClient;
    return HttpResponse.json(updatedClient);
  }),

  http.put('/v1/connaissance-clients/:id/situation', async ({ params, request }) => {
    const scenario = resolveManagementScenario(request);
    const id = asId(params['id']);
    await maybeDelay(scenario);

    if (scenario === 'server_error') {
      return HttpResponse.json(
        buildApiError(500, 'Mocked backend error', `/v1/connaissance-clients/${id}/situation`),
        { status: 500 }
      );
    }

    if (scenario === 'validation_error') {
      return HttpResponse.json(
        buildApiError(400, 'Validation failed for situation update', `/v1/connaissance-clients/${id}/situation`),
        { status: 400 }
      );
    }

    const clientIndex = findClientIndex(id);
    if (clientIndex < 0) {
      return HttpResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 404,
          error: 'Not Found',
          message: 'Client not found',
          path: `/v1/connaissance-clients/${id}/situation`
        },
        { status: 404 }
      );
    }

    const payload = (await request.json()) as Situation;
    const updatedClient: ApiConnaissanceClientDto = {
      ...clientsDb[clientIndex],
      situationFamiliale: payload.situationFamiliale,
      nombreEnfants: payload.nombreEnfants
    };

    clientsDb[clientIndex] = updatedClient;
    return HttpResponse.json(updatedClient);
  }),

  http.delete('/v1/connaissance-clients/:id', async ({ params, request }) => {
    const scenario = resolveManagementScenario(request);
    const id = asId(params['id']);
    await maybeDelay(scenario);

    if (scenario === 'server_error') {
      return HttpResponse.json(buildApiError(500, 'Mocked backend error', `/v1/connaissance-clients/${id}`), {
        status: 500
      });
    }

    if (scenario === 'validation_error') {
      return HttpResponse.json(buildApiError(400, 'Invalid identifier', `/v1/connaissance-clients/${id}`), {
        status: 400
      });
    }

    clientsDb = clientsDb.filter((client) => client.id !== id);
    return HttpResponse.json({ deleted: true, id });
  })
];
