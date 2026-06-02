import { delay, http, HttpResponse } from 'msw';
import { ConnaissanceClient } from '../../app/features/client-list/models/connaissance-client.model';

const scenarioKey = 'client-list-scenario';

const mockClients: ConnaissanceClient[] = [
  {
    id: '8a9204f5-aa42-47bc-9f04-17caab5de111',
    nom: 'Dupont',
    prenom: 'Jean',
    ligne1: '10 rue de la Paix',
    codePostal: '75002',
    ville: 'Paris',
    situationFamiliale: 'CELIBATAIRE',
    nombreEnfants: 0
  },
  {
    id: '8a9204f5-aa42-47bc-9f04-17caab5de222',
    nom: 'Martin',
    prenom: 'Camille',
    ligne1: '22 avenue Victor Hugo',
    codePostal: '33000',
    ville: 'Bordeaux',
    situationFamiliale: 'MARIE',
    nombreEnfants: 2
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
