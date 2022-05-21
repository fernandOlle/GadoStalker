import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { ModalCriarAnuncioComponent } from '../gerenciar-anuncios/components/modal-criar-anuncio/modal-criar-anuncio.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { EditarUsuarioComponent } from '../../component/home/components/editar-usuario/editar-usuario.component';
const MENU_ICON =
  `
  <svg style="width:36px;height:36px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
</svg>
`;

const DASHBOARD_ICON =
  `
  <svg style="width:28px;height:28px;margin-bottom: 5px;" viewBox="0 0 24 24">
  <path fill="currentColor" d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
</svg>
`;

const ANUNCIO_ICON =
  `
  <svg style="width:28px;height:28px;margin-bottom: 5px;" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M15,15.6L13,14H4V10H13L15,8.4V15.6M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z" />
</svg>
`;

const CATALOGO_ICON =
  `
  <svg style="width:28px;height:28px;margin-bottom: 5px;" viewBox="0 0 24 24">
  <path fill="currentColor" d="M21,4H3A2,2 0 0,0 1,6V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V6A2,2 0 0,0 21,4M3,19V6H11V19H3M21,19H13V6H21V19M14,9.5H20V11H14V9.5M14,12H20V13.5H14V12M14,14.5H20V16H14V14.5Z" />
</svg>
`;

const FAZENDA_ICON =
  `
  <svg style="width:28px;height:28px;margin-bottom: 5px;" viewBox="0 0 24 24">
  <path fill="currentColor" d="M6 19H8V21H6V19M12 3L2 8V21H4V13H20V21H22V8L12 3M8 11H4V9H8V11M14 11H10V9H14V11M20 11H16V9H20V11M6 15H8V17H6V15M10 15H12V17H10V15M10 19H12V21H10V19M14 19H16V21H14V19Z" />
</svg>
`;

const FUNCIONARIO_ICON =
  `
  <svg style="width:28px;height:28px;margin-bottom: 5px;" viewBox="0 0 24 24">
  <path fill="currentColor" d="M16 9C16 14.33 8 14.33 8 9H10C10 11.67 14 11.67 14 9M20 18V21H4V18C4 15.33 9.33 14 12 14C14.67 14 20 15.33 20 18M18.1 18C18.1 17.36 14.97 15.9 12 15.9C9.03 15.9 5.9 17.36 5.9 18V19.1H18.1M12.5 2C12.78 2 13 2.22 13 2.5V5.5H14V3C15.45 3.67 16.34 5.16 16.25 6.75C16.25 6.75 16.95 6.89 17 8H7C7 6.89 7.75 6.75 7.75 6.75C7.66 5.16 8.55 3.67 10 3V5.5H11V2.5C11 2.22 11.22 2 11.5 2" />
</svg>
`;


const DOWNLOAD_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M19.92,12.08L12,20L4.08,12.08L5.5,10.67L11,16.17V2H13V16.17L18.5,10.66L19.92,12.08M12,20H2V22H22V20H12Z" />
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
  selector: 'app-area-produtor',
  templateUrl: './area-produtor.component.html',
  styleUrls: ['./area-produtor.component.scss']
})
export class AreaProdutorComponent implements OnInit {

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private router: Router,
    private localStorage: LocalStorageService,
  ) { 
    iconRegistry.addSvgIconLiteral('menu', sanitizer.bypassSecurityTrustHtml(MENU_ICON));
    iconRegistry.addSvgIconLiteral('Dashboard', sanitizer.bypassSecurityTrustHtml(DASHBOARD_ICON));
    iconRegistry.addSvgIconLiteral('Anúncios', sanitizer.bypassSecurityTrustHtml(ANUNCIO_ICON));
    iconRegistry.addSvgIconLiteral('Catálogo de Produtos', sanitizer.bypassSecurityTrustHtml(CATALOGO_ICON));
    iconRegistry.addSvgIconLiteral('Fazendas', sanitizer.bypassSecurityTrustHtml(FAZENDA_ICON));
    iconRegistry.addSvgIconLiteral('Funcionários', sanitizer.bypassSecurityTrustHtml(FUNCIONARIO_ICON));
    iconRegistry.addSvgIconLiteral('download', sanitizer.bypassSecurityTrustHtml(DOWNLOAD_ICON));
    iconRegistry.addSvgIconLiteral('user',sanitizer.bypassSecurityTrustHtml(USER_ICON));
    iconRegistry.addSvgIconLiteral('edit',sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
    iconRegistry.addSvgIconLiteral('out',sanitizer.bypassSecurityTrustHtml(OUT_ICON));
  }
  Options: string[] = ['Dashboard', 'Anúncios', 'Catálogo de Produtos', 'Fazendas', 'Funcionários'];
  pageAtual: string = 'Dashboard';
  usuario: any;
  ngOnInit(): void {
    this.usuario = this.localStorage.get('credenciais');
  }

  openModal() {
    const dialog = this.dialog.open(ModalCriarAnuncioComponent, {
      data: {  },
      autoFocus: false,
      restoreFocus: false
    });
  }
  
  voltarHome(){
    this.router.navigate(['/home'])
  }

  changePageSelected(pageSelected: any){
    this.pageAtual = pageSelected;
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

}
