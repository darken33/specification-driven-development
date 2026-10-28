import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Subject, of, throwError } from 'rxjs';
import { Client } from './client.model';
import { ClientListService } from './client-list.service';
import { ClientDetailPageComponent } from './client-detail-page.component';

const clientFixture = (overrides: Partial<Client> = {}): Client => ({
  id: 'client-001',
  nom: 'Martin',
  prenom: 'Camille',
  ligne1: '12 rue des Lilas',
  ligne2: 'Appartement 4',
  codePostal: '33000',
  ville: 'Bordeaux',
  situationFamiliale: 'CELIBATAIRE',
  nombreEnfants: 0,
  ...overrides,
});

describe('ClientDetailPageComponent', () => {
  const clientService = {
    getClientById: vi.fn(),
    updateAddress: vi.fn(),
    updateFamily: vi.fn(),
    deleteClient: vi.fn(),
  };

  beforeEach(async () => {
    clientService.getClientById.mockReset();
    clientService.getClientById.mockReturnValue(of(clientFixture()));
    clientService.updateAddress.mockReset();
    clientService.updateAddress.mockReturnValue(of(clientFixture()));
    clientService.updateFamily.mockReset();
    clientService.updateFamily.mockReturnValue(of(clientFixture()));
    clientService.deleteClient.mockReset();
    clientService.deleteClient.mockReturnValue(of(true));
    await TestBed.configureTestingModule({
      imports: [ClientDetailPageComponent],
      providers: [
        provideRouter([
          { path: 'clients/:id', component: ClientDetailPageComponent },
          { path: '', component: ClientDetailPageComponent },
        ]),
        { provide: ClientListService, useValue: clientService },
      ],
    }).compileComponents();
  });

  it('loads and displays all fields and links back to the list', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);
    const content = harness.routeNativeElement?.textContent ?? '';

    expect(clientService.getClientById).toHaveBeenCalledWith('client-001');
    expect(content).toContain('Camille Martin');
    expect(content).toContain('12 rue des Lilas');
    expect(content).toContain('Appartement 4');
    expect(content).toContain('33000');
    expect(content).toContain('Bordeaux');
    expect(content).toContain('Célibataire');
    expect(content).toContain('0');
    expect(harness.routeNativeElement?.querySelector('a[data-action="back"]')?.getAttribute('href')).toBe('/');
    expect(page).toBeInstanceOf(ClientDetailPageComponent);
  });

  it('shows a loading state while the record is pending', async () => {
    clientService.getClientById.mockReturnValue(new Subject<Client | undefined>());
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);

    expect(harness.routeNativeElement?.querySelector('[role="status"]')?.textContent).toContain(
      'Chargement',
    );
  });

  it('shows an explicit not-found state for an unknown identifier', async () => {
    clientService.getClientById.mockReturnValue(of(undefined));
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/unknown-client', ClientDetailPageComponent);

    expect(harness.routeNativeElement?.textContent).toContain('Client introuvable');
    expect(harness.routeNativeElement?.querySelector('a[data-action="back"]')).not.toBeNull();
  });

  it('offers retry after a load error', async () => {
    clientService.getClientById
      .mockReturnValueOnce(throwError(() => new Error('mock failure')))
      .mockReturnValueOnce(of(clientFixture()));
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);

    expect(harness.routeNativeElement?.querySelector('[role="alert"]')?.textContent).toContain(
      'Impossible de charger',
    );

    harness.routeNativeElement?.querySelector<HTMLButtonElement>('[data-action="retry"]')?.click();
    await harness.fixture.whenStable();

    expect(clientService.getClientById).toHaveBeenCalledTimes(2);
    expect(harness.routeNativeElement?.textContent).toContain('Camille Martin');
  });

  it('opens the address dialog with the current values', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);

    harness.routeNativeElement?.querySelector<HTMLButtonElement>('[data-action="edit-address"]')?.click();
    await harness.fixture.whenStable();

    const dialog = harness.routeNativeElement?.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.querySelector<HTMLInputElement>('[formControlName="ligne1"]')?.value).toBe(
      '12 rue des Lilas',
    );
    expect(dialog?.querySelector<HTMLInputElement>('[formControlName="ligne2"]')?.value).toBe(
      'Appartement 4',
    );
  });

  it('validates the address and cancels without changing the client', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);

    harness.routeNativeElement?.querySelector<HTMLButtonElement>('[data-action="edit-address"]')?.click();
    await harness.fixture.whenStable();
    const page = harness.routeNativeElement;
    const line1 = page?.querySelector<HTMLInputElement>('[formControlName="ligne1"]');
    if (line1) {
      line1.value = 'x';
      line1.dispatchEvent(new Event('input'));
    }
    page?.querySelector<HTMLButtonElement>('[data-action="save-address"]')?.click();
    await harness.fixture.whenStable();

    expect(clientService.updateAddress).not.toHaveBeenCalled();
    expect(page?.querySelector('[id="ligne1-error"]')?.textContent).toContain('2 caractères');

    page?.querySelector<HTMLButtonElement>('[data-action="cancel-address"]')?.click();
    await harness.fixture.whenStable();
    expect(page?.textContent).toContain('12 rue des Lilas');
  });

  it('updates the address on success and keeps the original after a recoverable error', async () => {
    clientService.updateAddress.mockReturnValueOnce(
      of(clientFixture({ ligne1: '44 rue des Fleurs', ligne2: undefined })),
    );
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);
    const page = harness.routeNativeElement;

    page?.querySelector<HTMLButtonElement>('[data-action="edit-address"]')?.click();
    await harness.fixture.whenStable();
    const line1 = page?.querySelector<HTMLInputElement>('[formControlName="ligne1"]');
    if (line1) {
      line1.value = '44 rue des Fleurs';
      line1.dispatchEvent(new Event('input'));
    }
    page?.querySelector<HTMLButtonElement>('[data-action="save-address"]')?.click();
    await harness.fixture.whenStable();

    expect(page?.textContent).toContain('44 rue des Fleurs');
    expect(page?.textContent).not.toContain('12 rue des Lilas');

    clientService.updateAddress.mockReturnValueOnce(throwError(() => new Error('mock failure')));
    page?.querySelector<HTMLButtonElement>('[data-action="edit-address"]')?.click();
    await harness.fixture.whenStable();
    page?.querySelector<HTMLButtonElement>('[data-action="save-address"]')?.click();
    await harness.fixture.whenStable();

    expect(page?.querySelector('[role="alert"]')?.textContent).toContain('Impossible de modifier');
    expect(page?.textContent).toContain('44 rue des Fleurs');
  });

  it('offers all family situations and saves a valid family change', async () => {
    clientService.updateFamily.mockReturnValueOnce(
      of(clientFixture({ situationFamiliale: 'PACSE', nombreEnfants: 20 })),
    );
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);
    const page = harness.routeNativeElement;

    page?.querySelector<HTMLButtonElement>('[data-action="edit-family"]')?.click();
    await harness.fixture.whenStable();
    const dialog = page?.querySelector('[role="dialog"]');
    const options = dialog?.querySelectorAll('select option');
    expect(options).toHaveLength(5);
    expect(dialog?.querySelector<HTMLSelectElement>('[formControlName="situationFamiliale"]')?.value)
      .toBe('CELIBATAIRE');
    expect(dialog?.querySelector<HTMLInputElement>('[formControlName="nombreEnfants"]')?.value)
      .toBe('0');

    const component = harness.routeDebugElement?.componentInstance as ClientDetailPageComponent;
    component.familyForm.setValue({ situationFamiliale: 'PACSE', nombreEnfants: 20 });
    page?.querySelector<HTMLButtonElement>('[data-action="save-family"]')?.click();
    await harness.fixture.whenStable();

    expect(clientService.updateFamily).toHaveBeenCalledWith('client-001', {
      situationFamiliale: 'PACSE',
      nombreEnfants: 20,
    });
    expect(page?.textContent).toContain('Pacsé(e)');
    expect(page?.textContent).toContain('20');
    expect(page?.textContent).toContain('Camille Martin');
  });

  it('rejects 21 children and cancels without changing family data', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);
    const page = harness.routeNativeElement;
    page?.querySelector<HTMLButtonElement>('[data-action="edit-family"]')?.click();
    await harness.fixture.whenStable();

    const component = harness.routeDebugElement?.componentInstance as ClientDetailPageComponent;
    component.familyForm.setValue({ situationFamiliale: 'MARIE', nombreEnfants: 21 });
    page?.querySelector<HTMLButtonElement>('[data-action="save-family"]')?.click();
    await harness.fixture.whenStable();

    expect(clientService.updateFamily).not.toHaveBeenCalled();
    expect(page?.querySelector('#nombreEnfants-error')?.textContent).toContain('0 et 20');

    page?.querySelector<HTMLButtonElement>('[data-action="cancel-family"]')?.click();
    await harness.fixture.whenStable();
    expect(page?.textContent).toContain('Célibataire');
    expect(page?.textContent).toContain('0');
  });

  it('keeps the family data after a recoverable update error', async () => {
    clientService.updateFamily.mockReturnValueOnce(throwError(() => new Error('mock failure')));
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);
    const page = harness.routeNativeElement;
    page?.querySelector<HTMLButtonElement>('[data-action="edit-family"]')?.click();
    await harness.fixture.whenStable();

    const component = harness.routeDebugElement?.componentInstance as ClientDetailPageComponent;
    component.familyForm.setValue({ situationFamiliale: 'MARIE', nombreEnfants: 2 });
    page?.querySelector<HTMLButtonElement>('[data-action="save-family"]')?.click();
    await harness.fixture.whenStable();

    expect(page?.querySelector('[role="alert"]')?.textContent).toContain('Impossible de modifier');
    expect(page?.textContent).toContain('Célibataire');
    expect(page?.textContent).toContain('0');
  });

  it('confirms the client identity and cancels deletion without changing it', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);
    const page = harness.routeNativeElement;
    page?.querySelector<HTMLButtonElement>('[data-action="delete"]')?.click();
    await harness.fixture.whenStable();

    const dialog = page?.querySelector('[role="dialog"]');
    expect(dialog?.textContent).toContain('Camille Martin');
    expect(dialog?.textContent).toContain('irréversible');

    page?.querySelector<HTMLButtonElement>('[data-action="cancel-delete"]')?.click();
    await harness.fixture.whenStable();

    expect(clientService.deleteClient).not.toHaveBeenCalled();
    expect(page?.textContent).toContain('Camille Martin');
  });

  it('deletes after confirmation and returns to the list', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const page = harness.routeNativeElement;
    page?.querySelector<HTMLButtonElement>('[data-action="delete"]')?.click();
    await harness.fixture.whenStable();
    page?.querySelector<HTMLButtonElement>('[data-action="confirm-delete"]')?.click();
    await harness.fixture.whenStable();

    expect(clientService.deleteClient).toHaveBeenCalledWith('client-001');
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  it('keeps the record and allows retry after a deletion error', async () => {
    clientService.deleteClient.mockReturnValueOnce(throwError(() => new Error('mock failure')));
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);
    const page = harness.routeNativeElement;
    page?.querySelector<HTMLButtonElement>('[data-action="delete"]')?.click();
    await harness.fixture.whenStable();
    page?.querySelector<HTMLButtonElement>('[data-action="confirm-delete"]')?.click();
    await harness.fixture.whenStable();

    expect(page?.querySelector('[role="alert"]')?.textContent).toContain('Impossible de supprimer');
    expect(page?.textContent).toContain('Camille Martin');
    expect(page?.querySelector('[role="dialog"]')).not.toBeNull();
  });

  it('moves focus into an edit dialog, closes it with Escape, and restores focus', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);
    const page = harness.routeNativeElement;
    const editButton = page?.querySelector<HTMLButtonElement>('[data-action="edit-address"]');
    editButton?.focus();
    editButton?.click();
    await harness.fixture.whenStable();

    const dialog = page?.querySelector('[role="dialog"]');
    const focusable = Array.from(
      dialog?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]',
      ) ?? [],
    );
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.querySelector('label[for="ligne1"]')).not.toBeNull();
    expect(document.activeElement).toBe(dialog?.querySelector('[autofocus]'));

    focusable.at(-1)?.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await harness.fixture.whenStable();
    expect(document.activeElement).toBe(focusable[0]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await harness.fixture.whenStable();

    expect(page?.querySelector('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(editButton);
  });
});