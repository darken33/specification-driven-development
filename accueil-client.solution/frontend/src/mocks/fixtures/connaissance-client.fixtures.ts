import { ApiConnaissanceClientDto } from '../../app/features/client-management/models/connaissance-client.model';

export const connaissanceClientFixtures: ApiConnaissanceClientDto[] = [
  {
    id: '8a9204f5-aa42-47bc-9f04-17caab5de111',
    nom: 'Bousquet',
    prenom: 'Philippe',
    ligne1: '48 rue bauducheu',
    ligne2: '',
    codePostal: '33800',
    ville: 'Bordeaux',
    situationFamiliale: 'CELIBATAIRE',
    nombreEnfants: 0
  },
  {
    id: '8a9204f5-aa42-47bc-9f04-17caab5de222',
    nom: 'Bousquet',
    prenom: 'Anne',
    ligne1: '12 avenue de l Ocean',
    ligne2: 'Batiment B',
    codePostal: '33600',
    ville: 'Pessac',
    situationFamiliale: 'MARIE',
    nombreEnfants: 1
  }
];
