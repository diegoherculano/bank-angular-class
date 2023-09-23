import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IContas } from '../models/contas';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  url = environment.apiUrl + '/contas/';

  constructor(private http: HttpClient) {}

  listar(): Observable<IContas[]> {
    return this.http.get<IContas[]>(this.url);
  }

  listarPaginado(page: number, pageSize: number): Observable<IContas[]> {
    return this.http.get<IContas[]>(
      `${this.url}?page=${page}&pageSize=${pageSize}`
    );
  }

  deletar(idConta: number): Observable<object> {
    return this.http.delete(`${this.url}${idConta}`);
  }
}
