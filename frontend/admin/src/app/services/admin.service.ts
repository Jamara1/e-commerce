import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './GLOBAL';
import { Credential } from '../interfaces/credentials.interface';
import { User } from '../interfaces/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public url: string = '';

  constructor(private _httpClient: HttpClient) {
    this.url = GLOBAL.url;
  }

  loginAdmin(data: Credential): Observable<User> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._httpClient.post<User>(`${this.url}admin-login`, data, {
      headers,
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  public isAuthenticated(allowRoles: string[]): boolean {
    const token = localStorage.getItem('token');
    let decodedToken: Data;

    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      decodedToken = helper.decodeToken(token);

      if (!decodedToken) {
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }

    return allowRoles.includes(decodedToken['role']);
  }
}
