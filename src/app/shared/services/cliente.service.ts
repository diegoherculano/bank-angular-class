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

  listarPaginado(page: number, pageSize: number): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(
      `${this.url}?page=${page}&pageSize=${pageSize}`
    );
  }

  deletar(idCliente: number): Observable<object> {
    return this.http.delete(`${this.url}${idCliente}`);
  }
}
