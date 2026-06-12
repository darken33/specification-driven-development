import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Adresse,
  ApiConnaissanceClientDto,
  ConnaissanceClient,
  ConnaissanceClientInput,
  Situation
} from '../models/connaissance-client.model';
import { ConnaissanceClientMapper } from './connaissance-client.mapper';

@Injectable({
  providedIn: 'root'
})
export class ConnaissanceClientApiService {
  private readonly endpoint = '/v1/connaissance-clients';

  constructor(
    private readonly http: HttpClient,
    private readonly mapper: ConnaissanceClientMapper
  ) {}

  createClient(payload: ConnaissanceClientInput): Observable<ConnaissanceClient> {
    return this.http
      .post<ApiConnaissanceClientDto>(this.endpoint, this.mapper.toCreatePayload(payload))
      .pipe(map((dto) => this.mapper.fromApi(dto)));
  }

  getClient(id: string): Observable<ConnaissanceClient> {
    return this.http
      .get<ApiConnaissanceClientDto>(`${this.endpoint}/${id}`)
      .pipe(map((dto) => this.mapper.fromApi(dto)));
  }

  updateAdresse(id: string, adresse: Adresse): Observable<ConnaissanceClient> {
    return this.http
      .put<ApiConnaissanceClientDto>(`${this.endpoint}/${id}/adresse`, this.mapper.toAdressePayload(adresse))
      .pipe(map((dto) => this.mapper.fromApi(dto)));
  }

  updateSituation(id: string, situation: Situation): Observable<ConnaissanceClient> {
    return this.http
      .put<ApiConnaissanceClientDto>(
        `${this.endpoint}/${id}/situation`,
        this.mapper.toSituationPayload(situation)
      )
      .pipe(map((dto) => this.mapper.fromApi(dto)));
  }

  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
