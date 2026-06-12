import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientCreateState } from '../models/client-management-state.model';
import { ConnaissanceClientInput } from '../models/connaissance-client.model';
import { ConnaissanceClientApiService } from './connaissance-client-api.service';

const initialState: ClientCreateState = {
  status: 'idle',
  isSubmitting: false
};

@Injectable({
  providedIn: 'root'
})
export class ClientCreateFacade {
  private readonly stateSubject = new BehaviorSubject<ClientCreateState>(initialState);

  readonly state$ = this.stateSubject.asObservable();

  constructor(private readonly apiService: ConnaissanceClientApiService) {}

  createClient(payload: ConnaissanceClientInput): void {
    this.stateSubject.next({
      status: 'loading',
      isSubmitting: true
    });

    this.apiService.createClient(payload).subscribe({
      next: (client) => {
        this.stateSubject.next({
          status: 'success',
          isSubmitting: false,
          createdClientId: client.id
        });
      },
      error: () => {
        this.stateSubject.next({
          status: 'error',
          isSubmitting: false,
          errorMessage: 'Impossible de creer le client. Verifiez les informations et reessayez.'
        });
      }
    });
  }

  reset(): void {
    this.stateSubject.next(initialState);
  }
}
