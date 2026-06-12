import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ClientDetailPageComponent } from './client-detail-page.component';
import { ClientDetailFacade } from '../../services/client-detail.facade';
import { ClientDetailState } from '../../models/client-management-state.model';

describe('ClientDetailPageComponent', () => {
  let fixture: ComponentFixture<ClientDetailPageComponent>;
  let loadCalls = 0;
  let retryCalls = 0;

  const stateSubject = new BehaviorSubject<ClientDetailState>({
    status: 'loading',
    client: null,
    isRefreshing: false
  });

  const routerStub = {
    navigate: vi.fn()
  };

  const facadeStub = {
    state$: stateSubject.asObservable(),
    loadClient: () => {
      loadCalls += 1;
    },
    retry: () => {
      retryCalls += 1;
    }
  };

  beforeEach(async () => {
    loadCalls = 0;
    retryCalls = 0;
    stateSubject.next({ status: 'loading', client: null, isRefreshing: false });

    await TestBed.configureTestingModule({
      imports: [ClientDetailPageComponent],
      providers: [
        { provide: ClientDetailFacade, useValue: facadeStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'client-1' })
            }
          }
        },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDetailPageComponent);
    fixture.detectChanges();
  });

  it('should load client on init', () => {
    expect(loadCalls).toBe(1);
  });

  it('should render loading state', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Chargement de la fiche client');
  });

  it('should render error state and trigger retry', () => {
    const component = fixture.componentInstance;

    stateSubject.next({
      status: 'error',
      client: null,
      isRefreshing: false,
      errorMessage: 'Erreur'
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Erreur');

    component.onRetry();
    expect(retryCalls).toBe(1);
  });

  it('should render success state with client details', () => {
    stateSubject.next({
      status: 'success',
      isRefreshing: false,
      client: {
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
      }
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Bousquet');
    expect(text).toContain('Bordeaux');
    expect(text).toContain('CELIBATAIRE');
  });
});
