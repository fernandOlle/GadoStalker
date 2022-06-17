import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { ApiService } from '../../services/api.service';
import { FormControl } from '@angular/forms';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  catalogo: any = [];
  catalogoFiltrado: any = [];
  usuario :any;
  filtroSelecionado: any = 'Todas';
  categorias: string[] = ['Todas', 'Animal', 'Embalados', 'Frutas', 'Grãos', 'Vegetal'];
  textoPesquisa: any;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private api: ApiService,
  ) {
    iconRegistry.addSvgIconLiteral(
      'user',
      sanitizer.bypassSecurityTrustHtml(USER_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'edit',
      sanitizer.bypassSecurityTrustHtml(EDIT_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'out',
      sanitizer.bypassSecurityTrustHtml(OUT_ICON)
    );
    this.textoPesquisa = new FormControl('', );
   }

  ngOnInit(): void {
    this.usuario = this.localStorage.get('credenciais');
    this.getCatalogo();
  }
  
  redirecionar(){
    this.router.navigate(['/area-produtor'])
  }

  logout(){
    this.localStorage.remove('credenciais');
    this.router.navigate(['/login'])
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

  getCatalogo() {
    this.api.getAllTiposProdutos().subscribe(
      ret => {
        let values = Object.values(ret);
        let keys = Object.keys(ret);
        values.forEach(produto => { this.catalogo.push({ nome: produto, enabled: false}) });
        for(let i = 0; i < this.catalogo.length; i++)
          this.catalogo[i].tipo = keys[i];
        this.catalogoFiltrado = this.catalogo;
      }
    );
  }

  filter(value: any){
    this.catalogoFiltrado = this.catalogo;
    if(value == 'Animal'){
      this.catalogoFiltrado = this.catalogoFiltrado.filter((produto: { nome: string; }) => produto.nome == 'Leite' || produto.nome == 'Ovo' || produto.nome == 'Mel' ||produto.nome == 'Queijo');
    } else if(value == 'Vegetal'){
      this.catalogoFiltrado = this.catalogoFiltrado.filter((produto: { nome: string; }) => produto.nome == 'Alface' || produto.nome == 'Milho' || produto.nome == 'Tomate');
    } else if(value == 'Grãos'){
      this.catalogoFiltrado = this.catalogoFiltrado.filter((produto: { nome: string; }) => produto.nome == 'Vagem' || produto.nome == 'Soja' || produto.nome == 'Feijão' || produto.nome == 'Milho' || produto.nome == 'Arroz');
    } else if(value == 'Frutas'){
      this.catalogoFiltrado = this.catalogoFiltrado.filter((produto: { nome: string; }) => produto.nome == 'Tomate' || produto.nome == 'Laranja' || produto.nome == 'Uva' || produto.nome == 'Banana');
    } else if(value == 'Embalados'){
      this.catalogoFiltrado = this.catalogoFiltrado.filter((produto: { nome: string; }) => produto.nome == 'Mel' || produto.nome == 'Geleia');
    }
  }

  openAnuncios(produto: any){
    this.router.navigate(['/anuncios', { tipo: produto.tipo, nome: produto.nome }]);
  }

  pesquisar(){
    if(this.textoPesquisa.value.length > 0)
      this.router.navigate(['/anuncios', { search: this.textoPesquisa.value}]);
  }

}
