import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  url = environment.apiUrl + '/clientes/';

  constructor(private http: HttpClient) {}

  listar(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.url);
  }
}
