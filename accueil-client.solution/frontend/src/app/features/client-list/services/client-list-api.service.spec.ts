import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ClientListApiService } from './client-list-api.service';

describe('ClientListApiService', () => {
  let service: ClientListApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ClientListApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should fetch client list', () => {
    const result: unknown[] = [];

    service.getClients().subscribe((clients) => result.push(clients));

    const request = httpController.expectOne('/v1/connaissance-clients');
    expect(request.request.method).toBe('GET');
    request.flush([{ id: '1', nom: 'Dupont', prenom: 'Jean', ligne1: 'x', codePostal: '75000', ville: 'Paris', situationFamiliale: 'CELIBATAIRE', nombreEnfants: 0 }]);

    expect(result.length).toBe(1);
  });

  it('should propagate http errors', () => {
    let status = 0;

    service.getClients().subscribe({
      error: (err) => {
        status = err.status;
      }
    });

    const request = httpController.expectOne('/v1/connaissance-clients');
    request.flush({ message: 'error' }, { status: 500, statusText: 'Server Error' });

    expect(status).toBe(500);
  });
});
