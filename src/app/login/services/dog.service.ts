import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Dog {
  url: string;
}

@Injectable({ providedIn: 'root' })
export class DogService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl = 'https://dog.ceo/api/breeds/image/random';

  getRandom(): Observable<Dog> {
    return this.httpClient.get<Dog>(this.apiUrl);
  }
}
