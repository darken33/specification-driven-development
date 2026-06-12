import { of, throwError } from 'rxjs';
import { ClientListApiService } from './client-list-api.service';
import { ClientListFacade } from './client-list.facade';
import { ClientListMapper } from './client-list.mapper';

describe('ClientListFacade', () => {
  it('should transition to success when API returns data', () => {
    const api = {
      getClients: () =>
        of([
          {
            id: '1',
            nom: 'Dupont',
            prenom: 'Jean',
            ligne1: 'x',
            codePostal: '75000',
            ville: 'Paris',
            situationFamiliale: 'CELIBATAIRE',
            nombreEnfants: 0
          }
        ])
    } as unknown as ClientListApiService;
    const facade = new ClientListFacade(api, new ClientListMapper());

    let latestStatus = 'idle';
    facade.state$.subscribe((state) => {
      latestStatus = state.status;
    });

    facade.loadClients();

    expect(latestStatus).toBe('success');
  });

  it('should transition to empty when API returns no data', () => {
    const api = { getClients: () => of([]) } as unknown as ClientListApiService;
    const facade = new ClientListFacade(api, new ClientListMapper());

    let latestStatus = 'idle';
    facade.state$.subscribe((state) => {
      latestStatus = state.status;
    });

    facade.loadClients();

    expect(latestStatus).toBe('empty');
  });

  it('should transition to error on API failure', () => {
    const api = { getClients: () => throwError(() => new Error('boom')) } as unknown as ClientListApiService;
    const facade = new ClientListFacade(api, new ClientListMapper());

    let latestStatus = 'idle';
    facade.state$.subscribe((state) => {
      latestStatus = state.status;
    });

    facade.loadClients();

    expect(latestStatus).toBe('error');
  });
});
