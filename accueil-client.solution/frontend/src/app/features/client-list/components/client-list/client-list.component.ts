import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientListItemVM } from '../../models/connaissance-client.model';

@Component({
  selector: 'app-client-list',
  imports: [CommonModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  @Input({ required: true }) items: ClientListItemVM[] = [];
  @Output() selectClient = new EventEmitter<string>();
  @Output() createClient = new EventEmitter<void>();

  private readonly palette = ['#1f6fbe', '#2f8f46', '#e86a0b', '#7a2ea8', '#0f96a5'];

  trackById(_: number, item: ClientListItemVM): string {
    return item.id;
  }

  onSelect(id: string): void {
    this.selectClient.emit(id);
  }

  onCreateClient(): void {
    this.createClient.emit();
  }

  colorAt(index: number): string {
    return this.palette[index % this.palette.length];
  }

  private tokenize(value: string): string[] {
    return value.trim().split(/\s+/);
  }

  firstName(displayName: string): string {
    const parts = this.tokenize(displayName);
    return parts[0] ?? '';
  }

  lastName(displayName: string): string {
    const parts = this.tokenize(displayName);
    return parts.at(-1) ?? '';
  }

  initials(displayName: string): string {
    const parts = this.tokenize(displayName);
    if (parts.length === 0) {
      return '--';
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0][0]}${parts.at(-1)?.[0] ?? ''}`.toUpperCase();
  }

  cityPostalLabel(cityPostal: string): string {
    const tokens = cityPostal.split(' ').filter(Boolean);
    const cp = tokens[0] ?? '';
    const city = tokens.slice(1).join(' ');
    return city ? `${cp} - ${city}` : cp;
  }
}
