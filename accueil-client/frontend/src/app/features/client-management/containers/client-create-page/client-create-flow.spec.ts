import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ClientCreatePageComponent } from './client-create-page.component';
import { ClientCreateFacade } from '../../services/client-create.facade';
import { ClientCreateState } from '../../models/client-management-state.model';

describe('ClientCreate flow', () => {
  let fixture: ComponentFixture<ClientCreatePageComponent>;
  let submittedPayload: unknown = null;

  const stateSubject = new BehaviorSubject<ClientCreateState>({
    status: 'idle',
    isSubmitting: false
  });

  const routerStub = {
    navigate: vi.fn()
  };

  const facadeStub = {
    state$: stateSubject.asObservable(),
    createClient: (payload: unknown) => {
      submittedPayload = payload;
    }
  };

  beforeEach(async () => {
    submittedPayload = null;
    stateSubject.next({ status: 'idle', isSubmitting: false });
    routerStub.navigate.mockClear();

    await TestBed.configureTestingModule({
      imports: [ClientCreatePageComponent],
      providers: [
        { provide: ClientCreateFacade, useValue: facadeStub },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientCreatePageComponent);
    fixture.detectChanges();
  });

  it('should call facade createClient and navigate to detail on success state', () => {
    const component = fixture.componentInstance;

    component.form.patchValue({
      nom: 'Bousquet',
      prenom: 'Philippe',
      ligne1: '48 rue bauducheu',
      ligne2: '',
      codePostal: '33800',
      ville: 'Bordeaux',
      situationFamiliale: 'CELIBATAIRE',
      nombreEnfants: 0
    });

    component.onSubmit();

    expect(submittedPayload).toBeTruthy();

    stateSubject.next({
      status: 'success',
      isSubmitting: false,
      createdClientId: 'new-client-id'
    });
    fixture.detectChanges();

    expect(routerStub.navigate).toHaveBeenCalledWith(['/clients', 'new-client-id']);
  });
});
