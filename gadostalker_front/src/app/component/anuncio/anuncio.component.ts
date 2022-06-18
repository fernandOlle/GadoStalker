import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioComponent } from '../home/components/editar-usuario/editar-usuario.component';

const CELL_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
</svg>
`;

const EMAIL_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
</svg>
`;

const WHATS_ICON = 
`
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
</svg>
` 

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
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss']
})
export class AnuncioComponent implements OnInit {
  idAnuncio: any;
  anuncio: any;
  usuario: any;
  fazenda: any;
  textoPesquisa: any;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private api: ApiService,
    private localStorage: LocalStorageService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    iconRegistry.addSvgIconLiteral('cell', sanitizer.bypassSecurityTrustHtml(CELL_ICON));
    iconRegistry.addSvgIconLiteral('email', sanitizer.bypassSecurityTrustHtml(EMAIL_ICON));
    iconRegistry.addSvgIconLiteral('whats', sanitizer.bypassSecurityTrustHtml(WHATS_ICON));
    iconRegistry.addSvgIconLiteral('user', sanitizer.bypassSecurityTrustHtml(USER_ICON));
    iconRegistry.addSvgIconLiteral('edit', sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
    iconRegistry.addSvgIconLiteral('out', sanitizer.bypassSecurityTrustHtml(OUT_ICON));
    this.textoPesquisa = new FormControl('', );
  }
  panelOpenState = false;

  ngOnInit(): void {
    this.idAnuncio = Number(this.route.snapshot.paramMap.get('id'));
    this.usuario = this.localStorage.get('credenciais');
    this.getAnuncioById(this.idAnuncio);
  }

  getAnuncioById(id: any) {
    this.api.getAnuncioById(id).subscribe(
      ret => {
        if (ret) {
          this.anuncio = ret;
          if (this.anuncio?.imagemId) {
            this.api.getImagemById(this.anuncio.imagemId).subscribe(
              retImagem => {
                if (retImagem) {
                  this.anuncio.imagem = retImagem;
                }
            });
          }
          this.getFazenda();
          this.formatData();
        }
      }
    );
  }

  formatData(){
    let data = new Date(this.anuncio.dataInicial.split('[')[0]);
    let dia = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    let mes =  data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1;
    let ano = data.getFullYear();
    this.anuncio.dataFormatada = dia + '/' + mes + '/' + ano;
  }

  getFazenda(){
    this.api.getFazendaBySncr(this.anuncio.produto.fazenda).subscribe(
      ret => {
        if (ret) {
          this.fazenda = ret;
        }
      }
    );
  }

  pesquisar(){
    if(this.textoPesquisa.value.length > 0)
      this.router.navigate(['/anuncios', { search: this.textoPesquisa.value}]);
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
