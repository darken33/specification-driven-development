import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { Client } from './client.model';
import { ClientListService } from './client-list.service';
import { MOCK_CLIENTS } from './client-list.mock';

describe('ClientListService', () => {
  let service: ClientListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientListService);
  });

  it('returns the stable mock once per entry in its configured order', async () => {
    const clients = await firstValueFrom(service.getClients());

    expect(clients.length).toBeGreaterThanOrEqual(5);
    expect(clients).toEqual(MOCK_CLIENTS);
    expect(clients).not.toBe(MOCK_CLIENTS);
    expect(clients[0]).not.toBe(MOCK_CLIENTS[0]);
    expect(clients.map(({ nom, prenom }) => `${prenom} ${nom}`)).toEqual(
      MOCK_CLIENTS.map(({ nom, prenom }) => `${prenom} ${nom}`),
    );
  });

  it('starts a new in-memory session from the unchanged seed dataset', async () => {
    const clients = await firstValueFrom(service.getClients());
    clients[0].nom = 'Changed during this session';

    const freshService = new ClientListService();
    const freshClients = await firstValueFrom(freshService.getClients());

    expect(MOCK_CLIENTS[0].nom).toBe('Martin');
    expect(freshClients[0].nom).toBe('Martin');
    expect(freshClients.map(({ id }) => id)).toEqual(MOCK_CLIENTS.map(({ id }) => id));
  });

  it('creates a client with a unique ID and accepts homonyms', async () => {
    const newClient: Omit<Client, 'id'> = {
      nom: 'Martin',
      prenom: 'Camille',
      ligne1: '12 rue des Lilas',
      codePostal: '33000',
      ville: 'Bordeaux',
      situationFamiliale: 'CELIBATAIRE',
      nombreEnfants: 0,
    };

    const firstCreated = await firstValueFrom(service.createClient(newClient));
    const secondCreated = await firstValueFrom(service.createClient(newClient));
    const clients = await firstValueFrom(service.getClients());

    expect(firstCreated.id).toBeTruthy();
    expect(secondCreated.id).not.toBe(firstCreated.id);
    expect(clients.slice(-2)).toEqual([firstCreated, secondCreated]);
    expect(clients.filter(({ nom, prenom }) => nom === 'Martin' && prenom === 'Camille')).toHaveLength(
      3,
    );
  });

  it('finds a client by ID without changing the list order', async () => {
    const before = await firstValueFrom(service.getClients());

    const client = await firstValueFrom(service.getClientById(before[2].id));
    const after = await firstValueFrom(service.getClients());

    expect(client).toEqual(before[2]);
    expect(after.map(({ id }) => id)).toEqual(before.map(({ id }) => id));
  });

  it('returns undefined for an unknown ID without changing the list', async () => {
    const before = await firstValueFrom(service.getClients());

    const client = await firstValueFrom(service.getClientById('unknown-client'));
    const after = await firstValueFrom(service.getClients());

    expect(client).toBeUndefined();
    expect(after).toEqual(before);
  });

  it('updates only address fields and preserves the rest of the client', async () => {
    const before = await firstValueFrom(service.getClientById('client-001'));
    const updated = await firstValueFrom(
      service.updateAddress('client-001', {
        ligne1: '44 rue des Fleurs',
        ligne2: 'Bâtiment B',
        codePostal: '33100',
        ville: 'Bordeaux',
      }),
    );

    expect(updated).toEqual({
      ...before,
      ligne1: '44 rue des Fleurs',
      ligne2: 'Bâtiment B',
      codePostal: '33100',
      ville: 'Bordeaux',
    });
    expect(updated?.nom).toBe(before?.nom);
    expect(updated?.prenom).toBe(before?.prenom);
    expect(updated?.situationFamiliale).toBe(before?.situationFamiliale);
    expect(updated?.nombreEnfants).toBe(before?.nombreEnfants);
  });

  it('does not change any client when an address update targets an unknown ID', async () => {
    const before = await firstValueFrom(service.getClients());

    const updated = await firstValueFrom(
      service.updateAddress('unknown-client', {
        ligne1: '44 rue des Fleurs',
        ligne2: '',
        codePostal: '33100',
        ville: 'Bordeaux',
      }),
    );

    expect(updated).toBeUndefined();
    expect(await firstValueFrom(service.getClients())).toEqual(before);
  });

  it('updates only family fields and preserves the rest of the client', async () => {
    const before = await firstValueFrom(service.getClientById('client-001'));
    const updated = await firstValueFrom(
      service.updateFamily('client-001', {
        situationFamiliale: 'PACSE',
        nombreEnfants: 2,
      }),
    );

    expect(updated).toEqual({
      ...before,
      situationFamiliale: 'PACSE',
      nombreEnfants: 2,
    });
    expect(updated?.nom).toBe(before?.nom);
    expect(updated?.prenom).toBe(before?.prenom);
    expect(updated?.ligne1).toBe(before?.ligne1);
    expect(updated?.ville).toBe(before?.ville);
  });

  it('does not change any client when a family update targets an unknown ID', async () => {
    const before = await firstValueFrom(service.getClients());

    const updated = await firstValueFrom(
      service.updateFamily('unknown-client', {
        situationFamiliale: 'MARIE',
        nombreEnfants: 2,
      }),
    );

    expect(updated).toBeUndefined();
    expect(await firstValueFrom(service.getClients())).toEqual(before);
  });

  it('removes only the selected client and leaves all others in order', async () => {
    const before = await firstValueFrom(service.getClients());

    const removed = await firstValueFrom(service.deleteClient('client-003'));
    const after = await firstValueFrom(service.getClients());

    expect(removed).toBe(true);
    expect(after.map(({ id }) => id)).toEqual(
      before.filter(({ id }) => id !== 'client-003').map(({ id }) => id),
    );
  });

  it('returns false and preserves the list for an unknown deletion ID', async () => {
    const before = await firstValueFrom(service.getClients());

    const removed = await firstValueFrom(service.deleteClient('unknown-client'));

    expect(removed).toBe(false);
    expect(await firstValueFrom(service.getClients())).toEqual(before);
  });
});
