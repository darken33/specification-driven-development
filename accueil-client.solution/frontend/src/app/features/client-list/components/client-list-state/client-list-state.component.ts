import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientListStatus } from '../../models/connaissance-client.model';

@Component({
  selector: 'app-client-list-state',
  imports: [CommonModule],
  templateUrl: './client-list-state.component.html',
  styleUrl: './client-list-state.component.scss'
})
export class ClientListStateComponent {
  @Input({ required: true }) status: ClientListStatus = 'idle';
  @Input() errorMessage = '';
  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}
