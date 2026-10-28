import { Routes } from '@angular/router';
import { ClientCreatePageComponent } from './features/clients/client-create-page.component';
import { ClientDetailPageComponent } from './features/clients/client-detail-page.component';
import { ClientListPageComponent } from './features/clients/client-list-page.component';

export const routes: Routes = [
	{ path: '', component: ClientListPageComponent },
	{ path: 'clients/new', component: ClientCreatePageComponent },
	{ path: 'clients/:id', component: ClientDetailPageComponent },
];
