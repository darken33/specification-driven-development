import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnaissanceClient } from '../models/connaissance-client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientListApiService {
  private readonly endpoint = '/v1/connaissance-clients';

  constructor(private readonly http: HttpClient) {}

  getClients(): Observable<ConnaissanceClient[]> {
    return this.http.get<ConnaissanceClient[]>(this.endpoint);
  }
}
