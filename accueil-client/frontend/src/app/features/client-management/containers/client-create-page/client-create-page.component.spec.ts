import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ClientCreatePageComponent } from './client-create-page.component';
import { ClientCreateFacade } from '../../services/client-create.facade';
import { ClientCreateState } from '../../models/client-management-state.model';

describe('ClientCreatePageComponent', () => {
  let fixture: ComponentFixture<ClientCreatePageComponent>;
  let createCalls = 0;

  const stateSubject = new BehaviorSubject<ClientCreateState>({
    status: 'idle',
    isSubmitting: false
  });

  const routerStub = {
    navigate: vi.fn()
  };

  const facadeStub = {
    state$: stateSubject.asObservable(),
    createClient: () => {
      createCalls += 1;
    }
  };

  beforeEach(async () => {
    createCalls = 0;
    stateSubject.next({ status: 'idle', isSubmitting: false });

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

  it('should require nom for submission', () => {
    const component = fixture.componentInstance;

    component.form.patchValue({
      nom: '',
      prenom: 'Jean',
      ligne1: '12 rue du Port',
      codePostal: '33000',
      ville: 'Bordeaux',
      situationFamiliale: 'CELIBATAIRE',
      nombreEnfants: 0
    });

    component.onSubmit();

    expect(component.form.get('nom')?.hasError('required')).toBe(true);
    expect(createCalls).toBe(0);
  });

  it('should validate codePostal format', () => {
    const component = fixture.componentInstance;

    component.form.patchValue({
      nom: 'Durand',
      prenom: 'Alice',
      ligne1: '12 rue du Port',
      codePostal: '33',
      ville: 'Bordeaux',
      situationFamiliale: 'CELIBATAIRE',
      nombreEnfants: 1
    });

    component.onSubmit();

    expect(component.form.get('codePostal')?.hasError('pattern')).toBe(true);
    expect(createCalls).toBe(0);
  });

  it('should submit when form is valid', () => {
    const component = fixture.componentInstance;

    component.form.patchValue({
      nom: 'Durand',
      prenom: 'Alice',
      ligne1: '12 rue du Port',
      ligne2: '',
      codePostal: '33000',
      ville: 'Bordeaux',
      situationFamiliale: 'MARIE',
      nombreEnfants: 2
    });

    component.onSubmit();

    expect(createCalls).toBe(1);
  });
});
