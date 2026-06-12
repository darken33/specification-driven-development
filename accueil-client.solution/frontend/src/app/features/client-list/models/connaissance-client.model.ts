export type SituationFamiliale = 'CELIBATAIRE' | 'MARIE' | 'DIVORCE' | 'VEUF' | 'PACSE';

export interface ConnaissanceClient {
  id: string;
  nom: string;
  prenom: string;
  ligne1: string;
  ligne2?: string;
  codePostal: string;
  ville: string;
  situationFamiliale: SituationFamiliale;
  nombreEnfants: number;
}

export interface ClientListItemVM {
  id: string;
  displayName: string;
  cityPostal: string;
  statusLabel?: string;
}

export type ClientListStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export interface ClientListState {
  status: ClientListStatus;
  items: ClientListItemVM[];
  errorMessage?: string;
}
