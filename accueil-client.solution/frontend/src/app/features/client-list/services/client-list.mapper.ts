import { Injectable } from '@angular/core';
import { ClientListItemVM, ConnaissanceClient } from '../models/connaissance-client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientListMapper {
  toListItem(client: ConnaissanceClient): ClientListItemVM {
    return {
      id: client.id,
      displayName: [client.prenom, client.nom].filter(Boolean).join(' '),
      cityPostal: [client.codePostal, client.ville].filter(Boolean).join(' '),
      statusLabel: client.situationFamiliale
    };
  }

  toListItems(clients: ConnaissanceClient[]): ClientListItemVM[] {
    return clients.map((client) => this.toListItem(client));
  }
}
