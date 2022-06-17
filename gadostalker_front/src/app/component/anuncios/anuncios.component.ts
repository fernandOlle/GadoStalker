import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../services/local-storage.service';
@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {
  catalogo: any = [];
  order: any = 'precoasc';
  tipoAnuncio: any;
  nomeCategoria: any;
  usuario: any;
  search: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private _snackBar: MatSnackBar,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.usuario = this.localStorage.get('credenciais');
    this.tipoAnuncio = this.route.snapshot.paramMap.get('tipo');
    this.nomeCategoria = this.route.snapshot.paramMap.get('nome');
    this.search = this.route.snapshot.paramMap.get('search');
    if(this.search)
      this.getAnunciosBySearchText();
    else
      this.getAnunciosByTipo();
  }

  getAnunciosByTipo() {
    this.catalogo = [];
    this.api.getAnuncios(this.tipoAnuncio, 1, this.order, 8).subscribe(
      ret => {
        if (ret) {
          let array: any = ret;
          array.forEach((a: any) => {
            this.api.getImagemById(a.imagemId).subscribe(
              retImagem => {
                if (retImagem) {
                  a.imagem = retImagem;
                  this.catalogo.push(a);
                } else {
                  this.catalogo.push(a);
                }
              });
          });
        }
      }
    );
  }

  getAnunciosBySearchText() {
    this.catalogo = [];
    this.api.getAnunciosBySearchText(1, this.order, 8, this.search).subscribe(
      ret => {
        if (ret) {
          let array: any = ret;
          array.forEach((a: any) => {
            this.api.getImagemById(a.imagemId).subscribe(
              retImagem => {
                if (retImagem) {
                  a.imagem = retImagem;
                  this.catalogo.push(a);
                } else {
                  this.catalogo.push(a);
                }
              });
          });
        }
      }
    );
  }

  redirecionar(){
    this.router.navigate(['/area-produtor'])
  }

  abrirAnuncio(anuncio: any){
    this.router.navigate(['/anuncio', { id: anuncio.id}]);
  }

  mudaOrdem(){
    this.getAnunciosByTipo();
  }

}
