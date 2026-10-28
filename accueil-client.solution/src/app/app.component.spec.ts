import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { firstValueFrom } from 'rxjs';
import { App } from './app.component';
import { routes } from './app.routes';
import { ClientCreatePageComponent } from './features/clients/client-create-page.component';
import { ClientDetailPageComponent } from './features/clients/client-detail-page.component';
import { ClientListPageComponent } from './features/clients/client-list-page.component';
import { ClientListService } from './features/clients/client-list.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('renders the home page through the root route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', ClientListPageComponent);

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Liste des clients',
    );
  });

  it('resolves the reserved create route before the parameterized detail route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/new', ClientCreatePageComponent);

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Nouveau client',
    );

    await harness.navigateByUrl('/clients/client-001', ClientDetailPageComponent);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Fiche client');
  });

  it('shows the empty-list state after deleting the final client', async () => {
    const service = TestBed.inject(ClientListService);
    const clients = await firstValueFrom(service.getClients());
    for (const client of clients.slice(0, -1)) {
      await firstValueFrom(service.deleteClient(client.id));
    }

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/clients/client-005', ClientDetailPageComponent);
    harness.routeNativeElement?.querySelector<HTMLButtonElement>('[data-action="delete"]')?.click();
    await harness.fixture.whenStable();
    harness.routeNativeElement?.querySelector<HTMLButtonElement>('[data-action="confirm-delete"]')?.click();
    await harness.fixture.whenStable();

    expect(harness.routeNativeElement?.textContent).toContain('Aucun client disponible.');
  });
});
