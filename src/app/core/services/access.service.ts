import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';
import { Observable } from 'rxjs';
import { AccessResponse } from '../../interfaces/AccessResponse';
import { NewUser } from '../../interfaces/NewUser';

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  constructor(private http: HttpClient) {}

  private baseURL = 'http://localhost:3000/users';

  register(obj: NewUser): Observable<AccessResponse> {
    return this.http.post<AccessResponse>(`${this.baseURL}user/register`, obj);
  }
  login(obj: User): Observable<AccessResponse> {
    return this.http.post<AccessResponse>(`${this.baseURL}user/token`, obj);
  }
}
