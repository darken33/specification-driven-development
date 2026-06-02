export type SituationFamiliale = 'CELIBATAIRE' | 'MARIE' | 'DIVORCE' | 'VEUF' | 'PACSE';

export interface Adresse {
  ligne1: string;
  ligne2?: string;
  codePostal: string;
  ville: string;
}

export interface Situation {
  situationFamiliale: SituationFamiliale;
  nombreEnfants: number;
}

export interface ConnaissanceClient {
  id: string;
  nom: string;
  prenom: string;
  adresse: Adresse;
  situation: Situation;
}

export interface ConnaissanceClientInput {
  nom: string;
  prenom: string;
  adresse: Adresse;
  situation: Situation;
}

export interface ApiConnaissanceClientDto {
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

export interface ApiConnaissanceClientCreateDto {
  nom: string;
  prenom: string;
  ligne1: string;
  ligne2?: string;
  codePostal: string;
  ville: string;
  situationFamiliale: SituationFamiliale;
  nombreEnfants: number;
}
