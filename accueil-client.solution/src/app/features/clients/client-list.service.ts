import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Client } from './client.model';
import { MOCK_CLIENTS } from './client-list.mock';

export type ClientAddress = Pick<Client, 'ligne1' | 'codePostal' | 'ville'> & {
  ligne2?: string;
};
export type ClientFamily = Pick<Client, 'situationFamiliale' | 'nombreEnfants'>;

@Injectable({ providedIn: 'root' })
export class ClientListService {
  private readonly clientsSubject = new BehaviorSubject<readonly Client[]>(
    MOCK_CLIENTS.map((client) => ({ ...client })),
  );
  private nextId = 1;

  getClients(): Observable<readonly Client[]> {
    return this.clientsSubject.asObservable();
  }

  getClientById(id: string): Observable<Client | undefined> {
    return of(this.clientsSubject.value.find((client) => client.id === id));
  }

  updateAddress(id: string, address: ClientAddress): Observable<Client | undefined> {
    const clients = this.clientsSubject.value;
    const clientIndex = clients.findIndex((client) => client.id === id);
    if (clientIndex === -1) {
      return of(undefined);
    }

    const updatedClient: Client = { ...clients[clientIndex], ...address };
    if (!address.ligne2) {
      delete updatedClient.ligne2;
    }

    const updatedClients = [...clients];
    updatedClients[clientIndex] = updatedClient;
    this.clientsSubject.next(updatedClients);
    return of(updatedClient);
  }

  updateFamily(id: string, family: ClientFamily): Observable<Client | undefined> {
    const clients = this.clientsSubject.value;
    const clientIndex = clients.findIndex((client) => client.id === id);
    if (clientIndex === -1) {
      return of(undefined);
    }

    const updatedClient: Client = { ...clients[clientIndex], ...family };
    const updatedClients = [...clients];
    updatedClients[clientIndex] = updatedClient;
    this.clientsSubject.next(updatedClients);
    return of(updatedClient);
  }

  deleteClient(id: string): Observable<boolean> {
    const clients = this.clientsSubject.value;
    const updatedClients = clients.filter((client) => client.id !== id);
    if (updatedClients.length === clients.length) {
      return of(false);
    }

    this.clientsSubject.next(updatedClients);
    return of(true);
  }

  createClient(client: Omit<Client, 'id'>): Observable<Client> {
    let id: string;
    do {
      id = `client-${String(this.nextId).padStart(3, '0')}`;
      this.nextId += 1;
    } while (this.clientsSubject.value.some((existingClient) => existingClient.id === id));

    const createdClient: Client = { ...client, id };
    this.clientsSubject.next([...this.clientsSubject.value, createdClient]);
    return of(createdClient);
  }
}
