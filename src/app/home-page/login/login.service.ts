import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//models
import { API_URL } from '@root/api-urls';
import { User } from './login.model';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  login(params: { email: string }): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users`, {
      params,
    });
  }
}
