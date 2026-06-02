import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ClientDetailPageComponent } from './client-detail-page.component';
import { ClientDetailFacade } from '../../services/client-detail.facade';
import { ClientDetailState } from '../../models/client-management-state.model';

describe('ClientDetail flow', () => {
  let fixture: ComponentFixture<ClientDetailPageComponent>;
  let loadedClientId = '';

  const stateSubject = new BehaviorSubject<ClientDetailState>({
    status: 'idle',
    client: null,
    isRefreshing: false
  });

  const routerStub = {
    navigate: vi.fn()
  };

  const facadeStub = {
    state$: stateSubject.asObservable(),
    loadClient: (id: string) => {
      loadedClientId = id;
    },
    retry: vi.fn()
  };

  beforeEach(async () => {
    loadedClientId = '';

    await TestBed.configureTestingModule({
      imports: [ClientDetailPageComponent],
      providers: [
        { provide: ClientDetailFacade, useValue: facadeStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'client-42' })
            }
          }
        },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDetailPageComponent);
    fixture.detectChanges();
  });

  it('should call loadClient with route id', () => {
    expect(loadedClientId).toBe('client-42');
  });

  it('should show not found message for 404-like state', () => {
    stateSubject.next({
      status: 'error',
      client: null,
      isRefreshing: false,
      errorMessage: 'La fiche client est introuvable.'
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('introuvable');
  });

  it('should show technical message for 500-like state', () => {
    stateSubject.next({
      status: 'error',
      client: null,
      isRefreshing: false,
      errorMessage: 'Impossible de charger la fiche client. Reessayez.'
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Impossible de charger');
  });
});
