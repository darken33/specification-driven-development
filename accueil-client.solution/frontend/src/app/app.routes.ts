import { Routes } from '@angular/router';
import { ClientListPageComponent } from './features/client-list/containers/client-list-page/client-list-page.component';
import { ClientCreatePageComponent } from './features/client-management/containers/client-create-page/client-create-page.component';
import { ClientDetailPageComponent } from './features/client-management/containers/client-detail-page/client-detail-page.component';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'clients'
	},
	{
		path: 'clients',
		component: ClientListPageComponent
	},
	{
		path: 'clients/new',
		component: ClientCreatePageComponent
	},
	{
		path: 'clients/:id',
		component: ClientDetailPageComponent
	},
	{
		path: '**',
		redirectTo: 'clients'
	}
];
