import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, take, lastValueFrom } from 'rxjs';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private BS: BaseService,
  ) { }

  cadastroUsuarioComum(body: any){
    let url = 'http://localhost:8080/GadoStalker-rest/resources/usuario/cadastro/uc';
    return this.http.post(url, body).pipe(take(1));
  }

  cadastroProprietario(body: any){
    let url = 'http://localhost:8080/GadoStalker-rest/resources/usuario/cadastro/prop';
    return this.http.post(url, body).pipe(take(1));
  }

}
