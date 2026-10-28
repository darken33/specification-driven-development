import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
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

describe('ClientListPageComponent', () => {
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

  it('renders the list title, all client fields and active create/detail actions', async () => {
    clientListService.getClients.mockReturnValue(
      of([
        clientFixture({ id: 'client-001' }),
        clientFixture({ id: 'client-002', nom: 'Durand', prenom: 'Alex' }),
        clientFixture({ id: 'client-003', nom: 'Bernard', prenom: 'Lou' }),
        clientFixture({ id: 'client-004', nom: 'Petit', prenom: 'Noa' }),
        clientFixture({ id: 'client-005', nom: 'Robert', prenom: 'Eden' }),
      ]),
    );
    const fixture = TestBed.createComponent(ClientListPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('Liste des clients');
    expect(page.querySelectorAll('article.client-card')).toHaveLength(5);
    expect(page.textContent).toContain('Camille');
    expect(page.textContent).toContain('Martin');
    expect(page.textContent).toContain('33000');
    expect(page.textContent).toContain('Bordeaux');
    expect(page.querySelector('a[href="/clients/new"]')?.textContent).toContain('Nouveau client');
    expect(page.querySelectorAll('a[href^="/clients/client-"]')).toHaveLength(5);
  });

  it('renders one client without requiring optional identifiers', async () => {
    clientListService.getClients.mockReturnValue(of([clientFixture()]));
    const fixture = TestBed.createComponent(ClientListPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('article.client-card')).toHaveLength(1);
    expect(page.textContent).toContain('Camille');
    expect(page.textContent).toContain('Martin');
  });
});
