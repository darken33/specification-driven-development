import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Client, SituationFamiliale } from './client.model';
import { ClientAddress, ClientFamily, ClientListService } from './client-list.service';

type DetailState = 'loading' | 'loaded' | 'not-found' | 'error';
type AddressField = 'ligne1' | 'ligne2' | 'codePostal' | 'ville';
type FamilyField = 'situationFamiliale' | 'nombreEnfants';

const integerValidator: ValidatorFn = ({ value }) =>
  Number.isInteger(value) ? null : { integer: true };

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-client-detail-page',
  templateUrl: './client-detail-page.component.html',
  styleUrl: './client-detail-page.component.css',
})
export class ClientDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clientService = inject(ClientListService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly formBuilder = inject(FormBuilder);
  private clientId = '';
  private focusReturnTarget: HTMLElement | null = null;

  readonly client = signal<Client | null>(null);
  readonly state = signal<DetailState>('loading');
  readonly addressDialogOpen = signal(false);
  readonly isAddressSaving = signal(false);
  readonly addressError = signal(false);
  readonly familyDialogOpen = signal(false);
  readonly isFamilySaving = signal(false);
  readonly familyError = signal(false);
  readonly deleteDialogOpen = signal(false);
  readonly isDeleting = signal(false);
  readonly deleteError = signal(false);
  readonly situations: readonly SituationFamiliale[] = [
    'CELIBATAIRE',
    'MARIE',
    'DIVORCE',
    'VEUF',
    'PACSE',
  ];
  readonly addressForm = this.formBuilder.nonNullable.group({
    ligne1: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 ,.'-]+$")]],
    ligne2: ['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 ,.'-]+$")]],
    codePostal: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{5}$')]],
    ville: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Z ,.'-]+$")]],
  });
  readonly familyForm = this.formBuilder.nonNullable.group({
    situationFamiliale: ['CELIBATAIRE' as SituationFamiliale, Validators.required],
    nombreEnfants: [0, [Validators.required, Validators.min(0), Validators.max(20), integerValidator]],
  });

  private readonly situationLabels: Record<SituationFamiliale, string> = {
    CELIBATAIRE: 'Célibataire',
    MARIE: 'Marié(e)',
    DIVORCE: 'Divorcé(e)',
    VEUF: 'Veuf / veuve',
    PACSE: 'Pacsé(e)',
  };

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.clientId = params.get('id') ?? '';
      this.loadClient();
    });
  }

  situationLabel(situation: SituationFamiliale): string {
    return this.situationLabels[situation];
  }

  retry(): void {
    this.loadClient();
  }

  @HostListener('document:keydown', ['$event'])
  handleDialogKeydown(event: KeyboardEvent): void {
    const hostElement = this.host.nativeElement as HTMLElement;
    const dialog = hostElement.querySelector('[role="dialog"]') as HTMLElement | null;
    if (!dialog) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      if (this.addressDialogOpen()) {
        this.cancelAddressDialog();
      } else if (this.familyDialogOpen()) {
        this.cancelFamilyDialog();
      } else if (this.deleteDialogOpen()) {
        this.cancelDeleteDialog();
      }
      return;
    }
    if (event.key !== 'Tab') {
      return;
    }

    const focusable = Array.from(
      dialog.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]',
      ),
    ) as HTMLElement[];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) {
      return;
    }

    const activeElement = this.host.nativeElement.ownerDocument.activeElement;
    if (event.shiftKey && (activeElement === first || !dialog.contains(activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (activeElement === last || !dialog.contains(activeElement))) {
      event.preventDefault();
      first.focus();
    }
  }

  openAddressDialog(): void {
    const client = this.client();
    if (!client) {
      return;
    }
    this.addressForm.setValue({
      ligne1: client.ligne1,
      ligne2: client.ligne2 ?? '',
      codePostal: client.codePostal,
      ville: client.ville,
    });
    this.addressForm.markAsPristine();
    this.addressForm.markAsUntouched();
    this.addressError.set(false);
    this.rememberFocus();
    this.addressDialogOpen.set(true);
    this.focusDialog();
  }

  cancelAddressDialog(): void {
    this.addressDialogOpen.set(false);
    this.addressError.set(false);
    this.restoreFocus();
  }

  saveAddress(): void {
    if (this.isAddressSaving()) {
      return;
    }
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this.isAddressSaving.set(true);
    this.addressError.set(false);
    const { ligne2, ...requiredAddress } = this.addressForm.getRawValue();
    const address: ClientAddress = ligne2 ? { ...requiredAddress, ligne2 } : requiredAddress;
    this.clientService.updateAddress(this.clientId, address).subscribe({
      next: (updatedClient) => {
        this.isAddressSaving.set(false);
        if (updatedClient) {
          this.client.set(updatedClient);
          this.addressDialogOpen.set(false);
          this.restoreFocus();
          return;
        }
        this.addressError.set(true);
      },
      error: () => {
        this.isAddressSaving.set(false);
        this.addressError.set(true);
      },
    });
  }

  addressFieldError(field: AddressField): string | null {
    const control = this.addressForm.controls[field];
    if (!control.touched || control.valid) {
      return null;
    }
    if (control.hasError('required')) {
      return 'Ce champ est obligatoire.';
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
    return 'La valeur saisie n’est pas valide.';
  }

  openFamilyDialog(): void {
    const client = this.client();
    if (!client) {
      return;
    }
    this.familyForm.setValue({
      situationFamiliale: client.situationFamiliale,
      nombreEnfants: client.nombreEnfants,
    });
    this.familyForm.markAsPristine();
    this.familyForm.markAsUntouched();
    this.familyError.set(false);
    this.rememberFocus();
    this.familyDialogOpen.set(true);
    this.focusDialog();
  }

  cancelFamilyDialog(): void {
    this.familyDialogOpen.set(false);
    this.familyError.set(false);
    this.restoreFocus();
  }

  saveFamily(): void {
    if (this.isFamilySaving()) {
      return;
    }
    if (this.familyForm.invalid) {
      this.familyForm.markAllAsTouched();
      return;
    }

    this.isFamilySaving.set(true);
    this.familyError.set(false);
    const family: ClientFamily = this.familyForm.getRawValue();
    this.clientService.updateFamily(this.clientId, family).subscribe({
      next: (updatedClient) => {
        this.isFamilySaving.set(false);
        if (updatedClient) {
          this.client.set(updatedClient);
          this.familyDialogOpen.set(false);
          this.restoreFocus();
          return;
        }
        this.familyError.set(true);
      },
      error: () => {
        this.isFamilySaving.set(false);
        this.familyError.set(true);
      },
    });
  }

  familyFieldError(field: FamilyField): string | null {
    const control = this.familyForm.controls[field];
    if (!control.touched || control.valid) {
      return null;
    }
    if (control.hasError('required')) {
      return 'Ce champ est obligatoire.';
    }
    if (control.hasError('min') || control.hasError('max') || control.hasError('integer')) {
      return 'Saisissez un nombre entier compris entre 0 et 20.';
    }
    return 'La valeur saisie n’est pas valide.';
  }

  openDeleteDialog(): void {
    this.deleteError.set(false);
    this.rememberFocus();
    this.deleteDialogOpen.set(true);
    this.focusDialog();
  }

  cancelDeleteDialog(): void {
    this.deleteDialogOpen.set(false);
    this.deleteError.set(false);
    this.restoreFocus();
  }

  confirmDelete(): void {
    if (this.isDeleting()) {
      return;
    }
    this.isDeleting.set(true);
    this.deleteError.set(false);
    this.clientService.deleteClient(this.clientId).subscribe({
      next: (deleted) => {
        this.isDeleting.set(false);
        if (deleted) {
          void this.router.navigateByUrl('/');
          return;
        }
        this.deleteError.set(true);
      },
      error: () => {
        this.isDeleting.set(false);
        this.deleteError.set(true);
      },
    });
  }

  private loadClient(): void {
    this.state.set('loading');
    this.client.set(null);
    this.clientService.getClientById(this.clientId).subscribe({
      next: (client) => {
        this.client.set(client ?? null);
        this.state.set(client ? 'loaded' : 'not-found');
      },
      error: () => this.state.set('error'),
    });
  }

  private rememberFocus(): void {
    this.focusReturnTarget = this.host.nativeElement.ownerDocument.activeElement as HTMLElement;
  }

  private focusDialog(): void {
    this.changeDetector.detectChanges();
    const hostElement = this.host.nativeElement as HTMLElement;
    (hostElement.querySelector('[role="dialog"] [autofocus]') as HTMLElement | null)?.focus();
  }

  private restoreFocus(): void {
    const target = this.focusReturnTarget;
    this.focusReturnTarget = null;
    this.changeDetector.detectChanges();
    target?.focus();
  }
}