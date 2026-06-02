import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ClientDetailPageComponent } from './client-detail-page.component';
import { ClientDetailFacade } from '../../services/client-detail.facade';
import { ClientDetailState } from '../../models/client-management-state.model';

describe('Delete client flow', () => {
  let fixture: ComponentFixture<ClientDetailPageComponent>;
  let deletedClientId = '';

  const stateSubject = new BehaviorSubject<ClientDetailState>({
    status: 'success',
    client: {
      id: 'client-7',
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
    },
    isRefreshing: false
  });

  const routerStub = {
    navigate: vi.fn()
  };

  const facadeStub = {
    state$: stateSubject.asObservable(),
    loadClient: vi.fn(),
    retry: vi.fn(),
    updateAdresse: vi.fn(),
    updateSituation: vi.fn(),
    deleteClient: (id: string) => {
      deletedClientId = id;
    }
  };

  beforeEach(async () => {
    deletedClientId = '';
    routerStub.navigate.mockClear();

    await TestBed.configureTestingModule({
      imports: [ClientDetailPageComponent],
      providers: [
        { provide: ClientDetailFacade, useValue: facadeStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'client-7' })
            }
          }
        },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDetailPageComponent);
    fixture.detectChanges();
  });

  it('should call facade deleteClient with current id', () => {
    const component = fixture.componentInstance;

    component.confirmDelete();

    expect(deletedClientId).toBe('client-7');
  });

  it('should navigate to list when state contains deletedClientId', () => {
    stateSubject.next({
      status: 'success',
      client: null,
      isRefreshing: false,
      deletedClientId: 'client-7'
    });
    fixture.detectChanges();

    expect(routerStub.navigate).toHaveBeenCalledWith(['/clients']);
  });
});
