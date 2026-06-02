import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientListState } from '../models/connaissance-client.model';
import { ClientListApiService } from './client-list-api.service';
import { ClientListMapper } from './client-list.mapper';

@Injectable({
  providedIn: 'root'
})
export class ClientListFacade {
  private readonly stateSubject = new BehaviorSubject<ClientListState>({
    status: 'idle',
    items: []
  });

  readonly state$ = this.stateSubject.asObservable();

  constructor(
    private readonly apiService: ClientListApiService,
    private readonly mapper: ClientListMapper
  ) {}

  loadClients(): void {
    this.stateSubject.next({ status: 'loading', items: [] });

    this.apiService.getClients().subscribe({
      next: (clients) => {
        const items = this.mapper.toListItems(clients ?? []);
        if (items.length === 0) {
          this.stateSubject.next({ status: 'empty', items: [] });
          return;
        }

        this.stateSubject.next({
          status: 'success',
          items
        });
      },
      error: () => {
        this.stateSubject.next({
          status: 'error',
          items: [],
          errorMessage: 'Impossible de recuperer la liste des clients. Reessayez.'
        });
      }
    });
  }

  retry(): void {
    this.loadClients();
  }
}
