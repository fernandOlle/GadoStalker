import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, take, lastValueFrom, catchError, of } from 'rxjs';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient, private BS: BaseService) { }

  cadastroUsuarioComum(body: any) {
    let url =
      'http://localhost:8080/GadoStalker-rest/resources/usuario/cadastro/uc';
    return this.http.post(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  cadastroProprietario(body: any) {
    let url =
      'http://localhost:8080/GadoStalker-rest/resources/usuario/cadastro/prop';
    return this.http.post(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  login(body: any) {
    let url = 'http://localhost:8080/GadoStalker-rest/resources/usuario/login';
    return this.http.post(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  recuperarSenha(body: any) {
    let url =
      'http://localhost:8080/GadoStalker-rest/resources/usuario/recuperarSenha';
    return this.http.post(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  getAllTiposProdutos() {
    let url = 'http://localhost:8080/GadoStalker-rest/resources/produto/getAllTiposProdutos';
    return this.http.get(url);
  }

  getAllFazendasByProprietarioCpf(cpf: String) {
    let url = `http://localhost:8080/GadoStalker-rest/resources/usuario/getFazendasProprietario/${cpf}`;
    return this.http.get(url);
  }

  getAllProdutosByFazendaSNCR(sncr: String) {
    let url = `http://localhost:8080/GadoStalker-rest/resources/produto/getAllProdutosFazenda/${sncr}`;
    return this.http.get(url);
  }

  getAllProdutosByTypeAndSncr(type: String, sncr: String) {
    let url = `http://localhost:8080/GadoStalker-rest/resources/produto/consultarPorTipo/${type}/${sncr}`;
    return this.http.get(url);
  }

  adicionarProduto(body: any) {
    let url = 'http://localhost:8080/GadoStalker-rest/resources/produto/adicionar';
    return this.http.post(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  excluirProdutoById(id: any) {
    let url = `http://localhost:8080/GadoStalker-rest/resources/produto/remover/${id}`;
    return this.http.get(url).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  editarProdutoById(id: any, body: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/produto/editar/${id}`;
    return this.http.put(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  consultarProdutoById(id: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/produto/consultar/${id}`;
    return this.http.get(url).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  validaSncr(sncr: any){
    let url = ` http://localhost:8080/GadoStalker-rest/resources/usuario/cadastro/valida/${sncr}`;
    return this.http.get(url).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  editarPerfilByCpf(cpf: any, body: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/usuario/cadastro/editar/${cpf}`;
    return this.http.put(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

}
