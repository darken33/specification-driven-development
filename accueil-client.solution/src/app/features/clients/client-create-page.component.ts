import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SituationFamiliale } from './client.model';
import { ClientListService } from './client-list.service';

type ClientCreateField =
  | 'nom'
  | 'prenom'
  | 'ligne1'
  | 'ligne2'
  | 'codePostal'
  | 'ville'
  | 'situationFamiliale'
  | 'nombreEnfants';

const integerValidator: ValidatorFn = ({ value }) =>
  Number.isInteger(value) ? null : { integer: true };

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-client-create-page',
  templateUrl: './client-create-page.component.html',
  styleUrl: './client-create-page.component.css',
})
export class ClientCreatePageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly clientService = inject(ClientListService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly saveError = signal(false);
  readonly situations: readonly SituationFamiliale[] = [
    'CELIBATAIRE',
    'MARIE',
    'DIVORCE',
    'VEUF',
    'PACSE',
  ];
  readonly form = this.formBuilder.nonNullable.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Z ,.'-]+$")],
    ],
    prenom: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Z ,.'-]+$")],
    ],
    ligne1: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 ,.'-]+$")],
    ],
    ligne2: ['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 ,.'-]+$")]],
    codePostal: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{5}$')]],
    ville: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Z ,.'-]+$")],
    ],
    situationFamiliale: ['CELIBATAIRE' as SituationFamiliale, Validators.required],
    nombreEnfants: [0, [Validators.required, Validators.min(0), Validators.max(20), integerValidator]],
  });

  private readonly fieldLabels: Record<ClientCreateField, string> = {
    nom: 'Le nom',
    prenom: 'Le prénom',
    ligne1: "L'adresse",
    ligne2: "La deuxième ligne d'adresse",
    codePostal: 'Le code postal',
    ville: 'La ville',
    situationFamiliale: 'La situation familiale',
    nombreEnfants: 'Le nombre d’enfants',
  };

  fieldError(field: ClientCreateField): string | null {
    const control = this.form.controls[field];
    if (!control.touched || control.valid) {
      return null;
    }
    if (control.hasError('required')) {
      return `${this.fieldLabels[field]} est obligatoire.`;
    }
    if (control.hasError('minlength')) {
      return 'Saisissez au moins 2 caractères.';
    }
    if (control.hasError('maxlength')) {
      return 'Saisissez au maximum 50 caractères.';
    }
    if (control.hasError('pattern')) {
      return field === 'codePostal'
        ? 'Le code postal doit contenir 5 caractères majuscules ou chiffres.'
        : 'Le format saisi n’est pas valide.';
    }
    if (control.hasError('min') || control.hasError('max') || control.hasError('integer')) {
      return 'Saisissez un nombre entier compris entre 0 et 20.';
    }
    return 'La valeur saisie n’est pas valide.';
  }

  save(): void {
    if (this.isSubmitting()) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.saveError.set(false);
    this.clientService.createClient(this.form.getRawValue()).subscribe({
      next: () => void this.router.navigateByUrl('/'),
      error: () => {
        this.isSubmitting.set(false);
        this.saveError.set(true);
      },
    });
  }

  cancel(): void {
    void this.router.navigateByUrl('/');
  }
}