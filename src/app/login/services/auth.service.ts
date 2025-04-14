import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl = 'https://dummyjson.com/auth/login';
  private getUserUrl = 'https://dummyjson.com/auth/me';
  private refresehUserUrl = 'https://dummyjson.com/auth/refresh';

  login(username: string, password: string): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(this.apiUrl, {
      username,
      password,
    });
  }

  getUser(accessToken: string): Observable<UserResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.httpClient.get<UserResponse>(this.getUserUrl, { headers });
  }

  refresUser(accessToken: string): Observable<UserResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.httpClient.post<UserResponse>(
      this.refresehUserUrl,
      {},
      { headers }
    );
  }
}
