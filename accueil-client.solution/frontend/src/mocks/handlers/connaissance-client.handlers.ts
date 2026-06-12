import { delay, http, HttpResponse } from 'msw';
import { ConnaissanceClient } from '../../app/features/client-list/models/connaissance-client.model';

const scenarioKey = 'client-list-scenario';

const mockClients: ConnaissanceClient[] = [
  {
    id: '8a9204f5-aa42-47bc-9f04-17caab5de111',
    nom: 'Bousquet',
    prenom: 'Philippe',
    ligne1: '48 rue bauducheu',
    ligne2: '',
    codePostal: '33800',
    ville: 'Bordeaux',
    situationFamiliale: 'CELIBATAIRE',
    nombreEnfants: 0
  },
  {
    id: '8a9204f5-aa42-47bc-9f04-17caab5de222',
    nom: 'Bousquet',
    prenom: 'Anne',
    ligne1: '12 avenue de l Ocean',
    ligne2: 'Batiment B',
    codePostal: '33600',
    ville: 'Pessac',
    situationFamiliale: 'MARIE',
    nombreEnfants: 1
  }
];

function resolveScenario(): 'success-non-empty' | 'success-empty' | 'error-500' {
  if (globalThis.window === undefined) {
    return 'success-non-empty';
  }

  const value = globalThis.localStorage.getItem(scenarioKey);
  if (value === 'success-empty' || value === 'error-500') {
    return value;
  }

  return 'success-non-empty';
}

export const connaissanceClientHandlers = [
  http.get('/v1/connaissance-clients', async () => {
    const scenario = resolveScenario();

    await delay(600);

    if (scenario === 'error-500') {
      return HttpResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 500,
          error: 'Internal Server Error',
          message: 'Mocked backend error',
          path: '/v1/connaissance-clients'
        },
        { status: 500 }
      );
    }

    if (scenario === 'success-empty') {
      return HttpResponse.json([]);
    }

    return HttpResponse.json(mockClients);
  })
];
