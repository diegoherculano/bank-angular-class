import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICliente } from '../models/ICliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  url = environment.apiUrl + '/clientes/';

  constructor(private http: HttpClient) {}

  cadastrar(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.url, cliente);
  }

  editar(cliente: ICliente): Observable<ICliente> {
    return this.http.put<ICliente>(this.url + cliente.id, cliente);
  }

  listar(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.url);
  }

  listarPaginado(page: number, pageSize: number): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(
      `${this.url}?page=${page}&pageSize=${pageSize}`
    );
  }

  pesquisarPorId(idCliente: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.url}${idCliente}`);
  }

  deletar(idCliente: number): Observable<object> {
    return this.http.delete(`${this.url}${idCliente}`);
  }
}
