import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ConfirmDeleteModalComponent } from '../../components/confirm-delete-modal/confirm-delete-modal.component';
import { EditAddressModalComponent } from '../../components/edit-address-modal/edit-address-modal.component';
import { EditSituationModalComponent } from '../../components/edit-situation-modal/edit-situation-modal.component';
import { Adresse, Situation } from '../../models/connaissance-client.model';
import { ClientDetailFacade } from '../../services/client-detail.facade';

@Component({
  selector: 'app-client-detail-page',
  imports: [
    AsyncPipe,
    EditAddressModalComponent,
    EditSituationModalComponent,
    ConfirmDeleteModalComponent
  ],
  templateUrl: './client-detail-page.component.html',
  styleUrl: './client-detail-page.component.scss'
})
export class ClientDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly facade = inject(ClientDetailFacade);

  readonly state$ = this.facade.state$;
  readonly client$ = this.state$.pipe(map((state) => state.client));
  readonly clientFullName$ = this.client$.pipe(
    map((client) => `${client?.prenom ?? ''} ${client?.nom ?? ''}`.trim())
  );

  isAddressModalOpen = false;
  isSituationModalOpen = false;
  isDeleteModalOpen = false;
  private clientId = '';

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.clientId) {
      this.router.navigate(['/clients']);
      return;
    }

    this.facade.loadClient(this.clientId);

    this.state$.subscribe((state) => {
      if (state.deletedClientId) {
        this.router.navigate(['/clients']);
      }
    });
  }

  onRetry(): void {
    if (!this.clientId) {
      return;
    }

    this.facade.retry(this.clientId);
  }

  onBack(): void {
    this.router.navigate(['/clients']);
  }

  openAddressModal(): void {
    this.isAddressModalOpen = true;
  }

  closeAddressModal(): void {
    this.isAddressModalOpen = false;
  }

  openSituationModal(): void {
    this.isSituationModalOpen = true;
  }

  closeSituationModal(): void {
    this.isSituationModalOpen = false;
  }

  openDeleteModal(): void {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  saveAddress(adresse: Adresse): void {
    if (!this.clientId) {
      return;
    }

    this.facade.updateAdresse(this.clientId, adresse);
    this.closeAddressModal();
  }

  saveSituation(situation: Situation): void {
    if (!this.clientId) {
      return;
    }

    this.facade.updateSituation(this.clientId, situation);
    this.closeSituationModal();
  }

  confirmDelete(): void {
    if (!this.clientId) {
      return;
    }

    this.facade.deleteClient(this.clientId);
    this.closeDeleteModal();
  }
}
