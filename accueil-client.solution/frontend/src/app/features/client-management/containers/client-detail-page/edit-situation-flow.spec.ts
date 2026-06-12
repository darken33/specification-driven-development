import { of } from 'rxjs';
import { ConnaissanceClientApiService } from '../../services/connaissance-client-api.service';
import { ClientDetailFacade } from '../../services/client-detail.facade';

describe('Edit situation flow', () => {
  it('should call PUT then GET after a successful situation update', () => {
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
            situationFamiliale: 'MARIE',
            nombreEnfants: 2
          }
        });
      },
      updateSituation: () => {
        callOrder.push('PUT');
        return of({});
      }
    } as unknown as ConnaissanceClientApiService;

    const facade = new ClientDetailFacade(api);

    facade.updateSituation('client-1', {
      situationFamiliale: 'MARIE',
      nombreEnfants: 2
    });

    expect(callOrder).toEqual(['PUT', 'GET']);
  });
});
