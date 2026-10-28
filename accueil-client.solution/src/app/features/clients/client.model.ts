export type SituationFamiliale = 'CELIBATAIRE' | 'MARIE' | 'DIVORCE' | 'VEUF' | 'PACSE';

export interface Client {
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
