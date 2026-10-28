import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Subject, of } from 'rxjs';
import { Client } from './client.model';
import { ClientListService } from './client-list.service';
import { ClientListPageComponent } from './client-list-page.component';

const clientFixture = (overrides: Partial<Client> = {}): Client => ({
  id: 'client-test',
  nom: 'Martin',
  prenom: 'Camille',
  ligne1: '12 rue des Lilas',
  codePostal: '33000',
  ville: 'Bordeaux',
  situationFamiliale: 'CELIBATAIRE',
  nombreEnfants: 0,
  ...overrides,
});

describe('ClientListPageComponent states', () => {
  const clientListService = {
    getClients: vi.fn(),
  };

  beforeEach(async () => {
    clientListService.getClients.mockReset();
    await TestBed.configureTestingModule({
      imports: [ClientListPageComponent],
      providers: [
        provideRouter([]),
        { provide: ClientListService, useValue: clientListService },
      ],
    }).compileComponents();
  });

  it('announces loading while the response is pending', () => {
    clientListService.getClients.mockReturnValue(new Subject<readonly Client[]>());
    const fixture = TestBed.createComponent(ClientListPageComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain(
      'Chargement',
    );
  });

  it('announces a successful empty result separately from loading', async () => {
    clientListService.getClients.mockReturnValue(of([]));
    const fixture = TestBed.createComponent(ClientListPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain(
      'Aucun client disponible',
    );
  });

  it('announces an error and retries the load successfully', async () => {
    const failedResponse = new Subject<readonly Client[]>();
    clientListService.getClients
      .mockReturnValueOnce(failedResponse)
      .mockReturnValueOnce(of([clientFixture()]));
    const fixture = TestBed.createComponent(ClientListPageComponent);
    fixture.detectChanges();
    failedResponse.error(new Error('mock failure'));
    fixture.detectChanges();

    const retryButton = fixture.nativeElement.querySelector(
      'button[aria-label="Réessayer le chargement"]',
    ) as HTMLButtonElement;
    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain(
      'Impossible de charger',
    );
    expect(retryButton).toBeTruthy();
    retryButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('article.client-card')).toHaveLength(1);
    expect(clientListService.getClients).toHaveBeenCalledTimes(2);
  });

  it('shows a clear fallback for missing display values', async () => {
    clientListService.getClients.mockReturnValue(
      of([clientFixture({ nom: '', prenom: '', codePostal: '', ville: '' })]),
    );
    const fixture = TestBed.createComponent(ClientListPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('article.client-card') as HTMLElement;
    expect(card.textContent?.match(/Non renseigné/g)).toHaveLength(4);
  });
});
