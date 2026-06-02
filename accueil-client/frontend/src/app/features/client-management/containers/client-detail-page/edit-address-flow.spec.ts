import { of } from 'rxjs';
import { ConnaissanceClientApiService } from '../../services/connaissance-client-api.service';
import { ClientDetailFacade } from '../../services/client-detail.facade';

describe('Edit address flow', () => {
  it('should call PUT then GET after a successful address update', () => {
    const callOrder: string[] = [];

    const api = {
      getClient: () => {
        callOrder.push('GET');
        return of({
          id: 'client-1',
          nom: 'Bousquet',
          prenom: 'Philippe',
          adresse: {
            ligne1: '48 rue bauducheu',
            codePostal: '33800',
            ville: 'Bordeaux'
          },
          situation: {
            situationFamiliale: 'CELIBATAIRE',
            nombreEnfants: 0
          }
        });
      },
      updateAdresse: () => {
        callOrder.push('PUT');
        return of({});
      }
    } as unknown as ConnaissanceClientApiService;

    const facade = new ClientDetailFacade(api);

    facade.updateAdresse('client-1', {
      ligne1: '48 rue bauducheu',
      ligne2: '',
      codePostal: '33800',
      ville: 'Bordeaux'
    });

    expect(callOrder).toEqual(['PUT', 'GET']);
  });
});
