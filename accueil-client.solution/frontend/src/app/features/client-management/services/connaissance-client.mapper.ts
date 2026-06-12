import { Injectable } from '@angular/core';
import {
  Adresse,
  ApiConnaissanceClientCreateDto,
  ApiConnaissanceClientDto,
  ConnaissanceClient,
  ConnaissanceClientInput,
  Situation
} from '../models/connaissance-client.model';

@Injectable({
  providedIn: 'root'
})
export class ConnaissanceClientMapper {
  fromApi(dto: ApiConnaissanceClientDto): ConnaissanceClient {
    return {
      id: dto.id,
      nom: dto.nom,
      prenom: dto.prenom,
      adresse: {
        ligne1: dto.ligne1,
        ligne2: dto.ligne2,
        codePostal: dto.codePostal,
        ville: dto.ville
      },
      situation: {
        situationFamiliale: dto.situationFamiliale,
        nombreEnfants: dto.nombreEnfants
      }
    };
  }

  toCreatePayload(input: ConnaissanceClientInput): ApiConnaissanceClientCreateDto {
    return {
      nom: input.nom,
      prenom: input.prenom,
      ligne1: input.adresse.ligne1,
      ligne2: input.adresse.ligne2,
      codePostal: input.adresse.codePostal,
      ville: input.adresse.ville,
      situationFamiliale: input.situation.situationFamiliale,
      nombreEnfants: input.situation.nombreEnfants
    };
  }

  toAdressePayload(adresse: Adresse): Adresse {
    return {
      ligne1: adresse.ligne1,
      ligne2: adresse.ligne2,
      codePostal: adresse.codePostal,
      ville: adresse.ville
    };
  }

  toSituationPayload(situation: Situation): Situation {
    return {
      situationFamiliale: situation.situationFamiliale,
      nombreEnfants: situation.nombreEnfants
    };
  }
}
