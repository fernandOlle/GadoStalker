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

  cadastroFuncionario(body: any) {
    let url =
      'http://localhost:8080/GadoStalker-rest/resources/usuario/cadastro/func';
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
    return this.http.put(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  getAllTiposProdutos() {
    let url = 'http://localhost:8080/GadoStalker-rest/resources/produto/getAllTiposProdutos';
    return this.http.get(url);
  }

  getAllFazendasByProprietarioCpf(cpf: String) {
    let url = `http://localhost:8080/GadoStalker-rest/resources/usuario/getAllFazendasByProprietarioCpf/${cpf}`;
    return this.http.get(url);
  }

  getAllProdutosByFazendaSNCR(sncr: String) {
    let url = `http://localhost:8080/GadoStalker-rest/resources/produto/getAllProdutosByFazendaSNCR/${sncr}`;
    return this.http.get(url);
  }

  getAllProdutosByCPF(cpf: String) {
    let url = `http://localhost:8080/GadoStalker-rest/resources/produto/getAllProdutosByProprietarioCpf/${cpf}`;
    return this.http.get(url).pipe(take(1), catchError(error => {
      return of(0);
    }));;
  }

  getAllProdutosByTypeAndSncr(type: String, sncr: String) {
    let url = `http://localhost:8080/GadoStalker-rest/resources/produto/getAllProdutosByTypeAndSncr/${type}/${sncr}`;
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
    let url = ` http://localhost:8080/GadoStalker-rest/resources/usuario/cadastro/validaSncr/${sncr}`;
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

  adicionarFazenda(cpf: any, body: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/fazenda/cadastro/${cpf}`;
    return this.http.post(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  deletarFazenda(sncr: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/fazenda/remover/${sncr}`;
    return this.http.delete(url).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  getQuestions() {
    let url = 'http://localhost:8080/GadoStalker-rest/resources/usuario/getAllPerguntas';
    return this.http.get(url);
  }

  getListaFuncionariosByCpf(cpf: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/usuario/getListaFuncionariosByProprietarioCpf/${cpf}`;
    return this.http.get(url).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  trocaFuncionarioFazenda(body: any){
    let url = 'http://localhost:8080/GadoStalker-rest/resources/usuario/funcionario/trocaFazenda';
    return this.http.put(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }
  
  excluirUsuarioByCpf(cpf: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/usuario/remover/${cpf}`;
    return this.http.delete(url).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  editarFazendaBySncr(sncr: any, body: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/fazenda/modificar/${sncr}`;
    return this.http.post(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  adicionarAnuncio(body: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/anuncio/cadastrar`;
    return this.http.post(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  uploadFile(image: any, fileName: any) { 
    let url = 'http://localhost:8080/GadoStalker-rest/resources/upload/create';     
    const formData: FormData = new FormData();
    formData.append('imagem', image);
    formData.append('fileName', fileName);
    return this.http.post(url, formData).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  getImagemById(id: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/upload/get/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.get(url,  { headers, responseType: 'text'}).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  getAllAnunciosByCPF(cpf: String) {
    let url = `http://localhost:8080/GadoStalker-rest/resources/anuncio/getAllAnunciosByProprietarioCPF/${cpf}`;
    return this.http.get(url).pipe(take(1), catchError(error => {
      return of(error);
    }));
  }

  setImagemToAnuncio(idAnuncio: any, Idimagem: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/anuncio/setImagemToAnuncio/${idAnuncio}/${Idimagem}`;
    return this.http.get(url).pipe(take(1), catchError(error => {
      return of(error);
    }));
  }

  editarAnuncioById(id: any, body: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/anuncio/editar/${id}`;
    return this.http.put(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  
  deletarAnuncioById(id: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/anuncio/deleta/${id}`;
    return this.http.delete(url).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  encerrarAnuncioById(id: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/anuncio/encerra/${id}`;
    return this.http.put(url, {}).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  reabrirAnuncioById(id: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/anuncio/reabre/${id}`;
    return this.http.put(url, {}).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  registrarTransacao(id: any, body: any){
    let url = `http://localhost:8080/GadoStalker-rest/resources/transacao/registrar/${id}`;
    return this.http.post(url, body).pipe(take(1), catchError(error => {
      return of(0);
    }));
  }

  
}
