import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ClientListPageComponent } from './client-list-page.component';
import { ClientListFacade } from '../../services/client-list.facade';
import { ClientListState } from '../../models/connaissance-client.model';

describe('ClientListPageComponent', () => {
  let fixture: ComponentFixture<ClientListPageComponent>;
  let stateSubject: BehaviorSubject<ClientListState>;
  let loadClientsCalls = 0;
  let retryCalls = 0;

  const routerStub = {
    navigate: vi.fn()
  };

  beforeEach(async () => {
    stateSubject = new BehaviorSubject<ClientListState>({ status: 'loading', items: [] });

    const facadeStub = {
      state$: stateSubject.asObservable(),
      loadClients: () => {
        loadClientsCalls += 1;
      },
      retry: () => {
        retryCalls += 1;
      }
    };

    await TestBed.configureTestingModule({
      imports: [ClientListPageComponent],
      providers: [
        { provide: ClientListFacade, useValue: facadeStub },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientListPageComponent);
    fixture.detectChanges();
  });

  it('should load clients on init', () => {
    expect(loadClientsCalls).toBe(1);
  });

  it('should render list component on success', () => {
    stateSubject.next({
      status: 'success',
      items: [{ id: '1', displayName: 'Jean Dupont', cityPostal: '75000 Paris' }]
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-client-list')).toBeTruthy();
  });

  it('should render state component on error', () => {
    stateSubject.next({ status: 'error', items: [], errorMessage: 'Erreur' });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-client-list-state')).toBeTruthy();
  });

  it('should call retry on onRetry', () => {
    const component = fixture.componentInstance;
    component.onRetry();

    expect(retryCalls).toBe(1);
  });
});
