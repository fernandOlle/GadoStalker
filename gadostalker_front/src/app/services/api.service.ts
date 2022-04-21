import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  public async testeApi(){
    let url = "http://localhost:8080/GadoStalker-rest/resources/rest";
    
    return this.http.get(url);
  }

}
