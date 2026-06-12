import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientDetailState } from '../models/client-management-state.model';
import { Adresse, Situation } from '../models/connaissance-client.model';
import { ConnaissanceClientApiService } from './connaissance-client-api.service';

const initialState: ClientDetailState = {
  status: 'idle',
  client: null,
  isRefreshing: false
};

@Injectable({
  providedIn: 'root'
})
export class ClientDetailFacade {
  private readonly stateSubject = new BehaviorSubject<ClientDetailState>(initialState);

  readonly state$ = this.stateSubject.asObservable();

  constructor(private readonly apiService: ConnaissanceClientApiService) {}

  loadClient(id: string): void {
    this.stateSubject.next({
      status: 'loading',
      client: null,
      isRefreshing: false
    });

    this.apiService.getClient(id).subscribe({
      next: (client) => {
        this.stateSubject.next({
          status: 'success',
          client,
          isRefreshing: false
        });
      },
      error: (error) => {
        this.stateSubject.next({
          status: 'error',
          client: null,
          isRefreshing: false,
          errorMessage:
            error?.status === 404
              ? 'La fiche client est introuvable.'
              : 'Impossible de charger la fiche client. Reessayez.'
        });
      }
    });
  }

  retry(id: string): void {
    this.loadClient(id);
  }

  updateAdresse(id: string, adresse: Adresse): void {
    const current = this.stateSubject.value;
    this.stateSubject.next({
      ...current,
      isSaving: true,
      isRefreshing: true
    });

    this.apiService.updateAdresse(id, adresse).subscribe({
      next: () => {
        this.apiService.getClient(id).subscribe({
          next: (client) => {
            this.stateSubject.next({
              status: 'success',
              client,
              isRefreshing: false,
              isSaving: false
            });
          },
          error: () => {
            this.stateSubject.next({
              status: 'error',
              client: current.client,
              isRefreshing: false,
              isSaving: false,
              errorMessage: 'La mise a jour de l\'adresse est effectuee mais le rechargement a echoue.'
            });
          }
        });
      },
      error: () => {
        this.stateSubject.next({
          ...current,
          isRefreshing: false,
          isSaving: false,
          errorMessage: 'Impossible de mettre a jour l\'adresse.'
        });
      }
    });
  }

  updateSituation(id: string, situation: Situation): void {
    const current = this.stateSubject.value;
    this.stateSubject.next({
      ...current,
      isSaving: true,
      isRefreshing: true
    });

    this.apiService.updateSituation(id, situation).subscribe({
      next: () => {
        this.apiService.getClient(id).subscribe({
          next: (client) => {
            this.stateSubject.next({
              status: 'success',
              client,
              isRefreshing: false,
              isSaving: false
            });
          },
          error: () => {
            this.stateSubject.next({
              status: 'error',
              client: current.client,
              isRefreshing: false,
              isSaving: false,
              errorMessage: 'La mise a jour de la situation est effectuee mais le rechargement a echoue.'
            });
          }
        });
      },
      error: () => {
        this.stateSubject.next({
          ...current,
          isRefreshing: false,
          isSaving: false,
          errorMessage: 'Impossible de mettre a jour la situation familiale.'
        });
      }
    });
  }

  deleteClient(id: string): void {
    const current = this.stateSubject.value;
    this.stateSubject.next({
      ...current,
      isDeleting: true
    });

    this.apiService.deleteClient(id).subscribe({
      next: () => {
        this.stateSubject.next({
          status: 'success',
          client: current.client,
          isRefreshing: false,
          isDeleting: false,
          deletedClientId: id
        });
      },
      error: () => {
        this.stateSubject.next({
          ...current,
          isDeleting: false,
          errorMessage: 'Impossible de supprimer la fiche client.'
        });
      }
    });
  }
}
