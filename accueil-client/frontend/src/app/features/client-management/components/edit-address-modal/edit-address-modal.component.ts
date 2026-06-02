import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Adresse } from '../../models/connaissance-client.model';

@Component({
  selector: 'app-edit-address-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-address-modal.component.html',
  styleUrl: './edit-address-modal.component.scss'
})
export class EditAddressModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() address: Adresse | null = null;

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<Adresse>();

  readonly form = new FormBuilder().nonNullable.group({
    ligne1: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    ligne2: ['', [Validators.maxLength(50)]],
    codePostal: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{5}$/)]],
    ville: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['address'] || changes['isOpen']) && this.address) {
      this.form.patchValue(this.address);
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
