import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Client } from './client.model';
import { ClientListService } from './client-list.service';

type ClientListState =
  | { status: 'loading' }
  | { status: 'success'; clients: readonly Client[] }
  | { status: 'empty' }
  | { status: 'error' };

@Component({
  imports: [RouterLink],
  selector: 'app-client-list-page',
  templateUrl: './client-list-page.component.html',
  styleUrl: './client-list-page.component.css',
})
export class ClientListPageComponent implements OnInit {
  private readonly clientListService = inject(ClientListService);
  readonly state = signal<ClientListState>({ status: 'loading' });

  ngOnInit(): void {
    this.loadClients();
  }

  retry(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.state.set({ status: 'loading' });
    this.clientListService.getClients().subscribe({
      next: (clients) =>
        this.state.set(clients.length ? { status: 'success', clients } : { status: 'empty' }),
      error: () => this.state.set({ status: 'error' }),
    });
  }
}
