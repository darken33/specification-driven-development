import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Subject, of, throwError } from 'rxjs';
import { Client } from './client.model';
import { ClientListService } from './client-list.service';
import { ClientCreatePageComponent } from './client-create-page.component';

const clientFixture = (overrides: Partial<Client> = {}): Client => ({
  id: 'client-created',
  nom: 'Martin',
  prenom: 'Camille',
  ligne1: '12 rue des Lilas',
  codePostal: '33000',
  ville: 'Bordeaux',
  situationFamiliale: 'CELIBATAIRE',
  nombreEnfants: 0,
  ...overrides,
});

describe('ClientCreatePageComponent', () => {
  const clientService = { createClient: vi.fn() };

  beforeEach(async () => {
    clientService.createClient.mockReset();
    clientService.createClient.mockReturnValue(of(clientFixture()));
    await TestBed.configureTestingModule({
      imports: [ClientCreatePageComponent],
      providers: [
        provideRouter([]),
        { provide: ClientListService, useValue: clientService },
      ],
    }).compileComponents();
  });

  it('creates a valid client and returns to the list', () => {
    const fixture = TestBed.createComponent(ClientCreatePageComponent);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();
    fixture.componentInstance.form.setValue({
      nom: 'Martin',
      prenom: 'Camille',
      ligne1: '12 rue des Lilas',
      ligne2: '',
      codePostal: '33000',
      ville: 'Bordeaux',
      situationFamiliale: 'CELIBATAIRE',
      nombreEnfants: 0,
    });

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(clientService.createClient).toHaveBeenCalledOnce();
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  it('shows field errors and does not create an invalid client', () => {
    const fixture = TestBed.createComponent(ClientCreatePageComponent);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(clientService.createClient).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('#nom-error')?.textContent).toContain(
      'Le nom est obligatoire',
    );
    expect(fixture.nativeElement.querySelector('label[for="nom"]')?.textContent).toContain('Nom');
    const nameInput = fixture.nativeElement.querySelector('[formControlName="nom"]');
    expect(nameInput?.getAttribute('aria-invalid')).toBe('true');
    expect(nameInput?.getAttribute('aria-describedby')).toBe('nom-error');
  });

  it('cancels without creating a client', () => {
    const fixture = TestBed.createComponent(ClientCreatePageComponent);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('[data-action="cancel"]').click();

    expect(clientService.createClient).not.toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  it('keeps entered values and allows retry after a save error', () => {
    clientService.createClient.mockReturnValueOnce(throwError(() => new Error('mock failure')));
    const fixture = TestBed.createComponent(ClientCreatePageComponent);
    fixture.detectChanges();
    fixture.componentInstance.form.setValue({
      nom: 'Martin',
      prenom: 'Camille',
      ligne1: '12 rue des Lilas',
      ligne2: '',
      codePostal: '33000',
      ville: 'Bordeaux',
      situationFamiliale: 'CELIBATAIRE',
      nombreEnfants: 0,
    });

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain(
      'Impossible de créer',
    );
    expect(fixture.componentInstance.form.controls.nom.value).toBe('Martin');
    expect(fixture.componentInstance.isSubmitting()).toBe(false);
  });

  it('ignores repeated submission while creation is pending', () => {
    const pending = new Subject<Client>();
    clientService.createClient.mockReturnValue(pending);
    const fixture = TestBed.createComponent(ClientCreatePageComponent);
    fixture.detectChanges();
    fixture.componentInstance.form.setValue({
      nom: 'Martin',
      prenom: 'Camille',
      ligne1: '12 rue des Lilas',
      ligne2: '',
      codePostal: '33000',
      ville: 'Bordeaux',
      situationFamiliale: 'CELIBATAIRE',
      nombreEnfants: 0,
    });
    const form = fixture.nativeElement.querySelector('form');

    form.dispatchEvent(new Event('submit'));
    form.dispatchEvent(new Event('submit'));

    expect(clientService.createClient).toHaveBeenCalledOnce();
    pending.complete();
  });
});