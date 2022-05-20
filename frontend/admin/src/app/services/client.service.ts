import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './GLOBAL';
import { ResponseClient } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public url: string = '';

  constructor(private _httpClient: HttpClient) {
    this.url = GLOBAL.url;
  }

  getClients(type: string | null, filter: string| null): Observable<ResponseClient> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._httpClient.get<ResponseClient>(
      `${this.url}client-list-admin/${type}/${filter}`,
      {
        headers,
      }
    );
  }
}
