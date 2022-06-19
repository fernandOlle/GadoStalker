import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../services/local-storage.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioComponent } from '../home/components/editar-usuario/editar-usuario.component';

const SEM_DADOS_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M19.07 15.87C19.66 15.31 20 14.68 20 14V16.8L19.07 15.87M20 9C20 10.54 18.27 11.86 15.73 12.53L17.89 14.69C19.19 14 20 13.04 20 12V9M20 7C20 4.79 16.42 3 12 3C10.13 3 8.42 3.33 7.06 3.86L14.06 10.86C17.5 10.41 20 8.85 20 7M2.39 1.73L1.11 3L4.21 6.1C4.08 6.39 4 6.69 4 7C4 8.63 5.96 10.04 8.77 10.66L11.08 12.97C7.1 12.74 4 11.06 4 9V12C4 14.21 7.58 16 12 16C12.69 16 13.35 15.95 14 15.87L15.66 17.55C14.57 17.84 13.32 18 12 18C7.58 18 4 16.21 4 14V17C4 19.21 7.58 21 12 21C14.31 21 16.38 20.5 17.84 19.73L20.84 22.73L22.11 21.46L2.39 1.73Z" />
</svg>
`;

const USER_ICON = `
<svg style="width:36px;height:36px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
</svg>
`;

const EDIT_ICON = `
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
</svg>
`;

const OUT_ICON = `
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z" />
</svg>
`
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
  textoPesquisa: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private _snackBar: MatSnackBar,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private localStorage: LocalStorageService,
    public dialog: MatDialog,
  ) { 
    iconRegistry.addSvgIconLiteral('no-database', sanitizer.bypassSecurityTrustHtml(SEM_DADOS_ICON));
    iconRegistry.addSvgIconLiteral('user', sanitizer.bypassSecurityTrustHtml(USER_ICON));
    iconRegistry.addSvgIconLiteral('edit', sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
    iconRegistry.addSvgIconLiteral('out', sanitizer.bypassSecurityTrustHtml(OUT_ICON));
    this.textoPesquisa = new FormControl('', );
  }

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
    this.api.getAnuncios(this.tipoAnuncio, 1, this.order, 0, this.search).subscribe(
      ret => {
        if (ret) {
          this.catalogo = ret;
          this.catalogo.forEach((a: any) => {
            this.api.getImagemById(a.imagemId).subscribe(
              retImagem => {
                if (retImagem) {
                  a.imagem = retImagem;
                }
              });
          });
        }
      }
    );
  }

  getAnunciosBySearchText() {
    this.catalogo = [];
    this.api.getAnunciosBySearchText(1, this.order, 0, this.search).subscribe(
      ret => {
        if (ret) {
          this.catalogo = ret;
          this.catalogo.forEach((a: any) => {
            this.api.getImagemById(a.imagemId).subscribe(
              retImagem => {
                if (retImagem) {
                  a.imagem = retImagem;
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
    if(this.tipoAnuncio)
      this.getAnunciosByTipo();
    else
      this.getAnunciosBySearchText();
  }

  pesquisar(){
    this.search = this.textoPesquisa.value;
    if(this.tipoAnuncio)
      this.getAnunciosByTipo();
    else
      this.getAnunciosBySearchText();
  }

  openModalEditarUser(usuario: any){
    const dialog = this.dialog.open(EditarUsuarioComponent, {
      data: {usuario},
      autoFocus: false,
      maxHeight: 700,
      maxWidth: 800,
      restoreFocus: false,
    });
    dialog.afterClosed().subscribe(ret => {
      if(ret){
       this.usuario.nome = ret.nome;
       this.usuario.email = ret.email;
       this.usuario.telefone = ret.telefone;
       this.localStorage.set('credenciais', this.usuario)
      }
    });
  }

  
  logout(){
    this.localStorage.remove('credenciais');
    this.router.navigate(['/login'])
  }

}
