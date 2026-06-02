import { Routes } from '@angular/router';
import { ClientListPageComponent } from './features/client-list/containers/client-list-page/client-list-page.component';

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
		path: 'clients/:id',
		component: ClientListPageComponent
	},
	{
		path: '**',
		redirectTo: 'clients'
	}
];
