import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Situation, SituationFamiliale } from '../../models/connaissance-client.model';

@Component({
  selector: 'app-edit-situation-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-situation-modal.component.html',
  styleUrl: './edit-situation-modal.component.scss'
})
export class EditSituationModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() situation: Situation | null = null;

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<Situation>();

  readonly situations: SituationFamiliale[] = [
    'CELIBATAIRE',
    'MARIE',
    'DIVORCE',
    'VEUF',
    'PACSE'
  ];

  readonly form = new FormBuilder().nonNullable.group({
    situationFamiliale: ['CELIBATAIRE' as SituationFamiliale, [Validators.required]],
    nombreEnfants: [0, [Validators.required, Validators.min(0), Validators.max(20)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['situation'] || changes['isOpen']) && this.situation) {
      this.form.patchValue(this.situation);
    }
  }

  onCancel(): void {
    this.closed.emit();
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saved.emit(this.form.getRawValue());
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) {
      this.onCancel();
    }
  }
}
