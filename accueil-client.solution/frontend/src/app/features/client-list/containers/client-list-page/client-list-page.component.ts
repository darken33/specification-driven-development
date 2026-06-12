import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ClientListComponent } from '../../components/client-list/client-list.component';
import { ClientListStateComponent } from '../../components/client-list-state/client-list-state.component';
import { ClientListFacade } from '../../services/client-list.facade';

@Component({
  selector: 'app-client-list-page',
  imports: [AsyncPipe, ClientListComponent, ClientListStateComponent],
  templateUrl: './client-list-page.component.html',
  styleUrl: './client-list-page.component.scss'
})
export class ClientListPageComponent implements OnInit {
  private readonly facade = inject(ClientListFacade);
  private readonly router = inject(Router);

  readonly state$ = this.facade.state$;
  readonly listItems$ = this.state$.pipe(map((state) => state.items));

  ngOnInit(): void {
    this.facade.loadClients();
  }

  onRetry(): void {
    this.facade.retry();
  }

  onSelectClient(clientId: string): void {
    this.router.navigate(['/clients', clientId]);
  }

  onCreateClient(): void {
    this.router.navigate(['/clients/new']);
  }
}
