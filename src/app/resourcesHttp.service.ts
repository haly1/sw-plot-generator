import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class ResourcesHttpService {

  constructor(private httpClient: HttpClient) {}

  getResources(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  findResource(url: string, value: string): Observable<any> {
    return this.httpClient.get(url + '?search=' + value);
  }
}



