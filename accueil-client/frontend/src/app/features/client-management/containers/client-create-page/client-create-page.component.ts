import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ConnaissanceClientInput, SituationFamiliale } from '../../models/connaissance-client.model';
import { ClientCreateFacade } from '../../services/client-create.facade';

const NAME_PATTERN = /^[a-zA-Z ,.'-]+$/;
const ADDRESS_PATTERN = /^[a-zA-Z0-9 ,.'-]+$/;
const POSTAL_PATTERN = /^[A-Z0-9]{5}$/;

function optionalPattern(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value as string | null | undefined;
    if (!value || value.length === 0) {
      return null;
    }

    return pattern.test(value) ? null : { pattern: true };
  };
}

@Component({
  selector: 'app-client-create-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-create-page.component.html',
  styleUrl: './client-create-page.component.scss'
})
export class ClientCreatePageComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly facade = inject(ClientCreateFacade);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly situations: SituationFamiliale[] = [
    'CELIBATAIRE',
    'MARIE',
    'DIVORCE',
    'VEUF',
    'PACSE'
  ];

  readonly form = this.formBuilder.nonNullable.group({
    nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(NAME_PATTERN)]],
    prenom: ['', [optionalPattern(NAME_PATTERN), Validators.minLength(2), Validators.maxLength(50)]],
    ligne1: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(ADDRESS_PATTERN)]
    ],
    ligne2: ['', [Validators.maxLength(50), optionalPattern(ADDRESS_PATTERN)]],
    codePostal: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern(POSTAL_PATTERN)]
    ],
    ville: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(NAME_PATTERN)]],
    situationFamiliale: ['CELIBATAIRE' as SituationFamiliale, [Validators.required]],
    nombreEnfants: [0, [Validators.required, Validators.min(0), Validators.max(20)]]
  });

  readonly state$ = this.facade.state$;
  readonly isSubmitting$ = this.state$.pipe(map((state) => state.isSubmitting));

  ngOnInit(): void {
    this.state$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((state) => {
      if (state.status === 'success' && state.createdClientId) {
        this.router.navigate(['/clients', state.createdClientId]);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload: ConnaissanceClientInput = {
      nom: value.nom.trim(),
      prenom: value.prenom.trim(),
      adresse: {
        ligne1: value.ligne1.trim(),
        ligne2: value.ligne2.trim(),
        codePostal: value.codePostal.trim(),
        ville: value.ville.trim()
      },
      situation: {
        situationFamiliale: value.situationFamiliale,
        nombreEnfants: value.nombreEnfants
      }
    };

    this.facade.createClient(payload);
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.touched && control?.hasError(errorCode));
  }
}
