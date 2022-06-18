import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistrarVendaComponent } from './components/modal-registrar-venda/modal-registrar-venda.component';
import { ModalEditarAnuncioComponent } from './components/modal-editar-anuncio/modal-editar-anuncio.component';
import { ApiService } from '../../services/api.service'; 
import { LocalStorageService } from '../../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
const SEM_DADOS_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M19.07 15.87C19.66 15.31 20 14.68 20 14V16.8L19.07 15.87M20 9C20 10.54 18.27 11.86 15.73 12.53L17.89 14.69C19.19 14 20 13.04 20 12V9M20 7C20 4.79 16.42 3 12 3C10.13 3 8.42 3.33 7.06 3.86L14.06 10.86C17.5 10.41 20 8.85 20 7M2.39 1.73L1.11 3L4.21 6.1C4.08 6.39 4 6.69 4 7C4 8.63 5.96 10.04 8.77 10.66L11.08 12.97C7.1 12.74 4 11.06 4 9V12C4 14.21 7.58 16 12 16C12.69 16 13.35 15.95 14 15.87L15.66 17.55C14.57 17.84 13.32 18 12 18C7.58 18 4 16.21 4 14V17C4 19.21 7.58 21 12 21C14.31 21 16.38 20.5 17.84 19.73L20.84 22.73L22.11 21.46L2.39 1.73Z" />
</svg>
`;

interface Anuncio {
  dataInicial: any;
  desconto: any,
  descricao: any,
  id: any,
  produtos:any,
  preco: any,
  titulo: any,
  imagem: any,
  imagemId: any
}
@Component({
  selector: 'app-gerenciar-anuncios',
  templateUrl: './gerenciar-anuncios.component.html',
  styleUrls: ['./gerenciar-anuncios.component.scss']
})

export class GerenciarAnunciosComponent implements OnInit {
  @Input() anuncios: any = [];
  anunciosFiltrados: any = [];
  cpf: any;
  fazendas: any;
  tiposDeProdutos: any = [];
  fazendaSelected: any;
  categoriaSelected: any;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private localStorage: LocalStorageService,
    private _snackBar: MatSnackBar,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIconLiteral('no-database', sanitizer.bypassSecurityTrustHtml(SEM_DADOS_ICON));
    this.cpf = this.localStorage.get('credenciais').cpf;
    this.getFazendas();
    this.getTiposDeProdutos();
    this.fazendaSelected = new FormControl('00000000000');
    this.categoriaSelected = new FormControl('TODOS');
   }

  ngOnInit(): void {
    this.anunciosFiltrados = this.anuncios;
  }
  openModalRegistrarVenda(anuncio: any) {
    const dialog = this.dialog.open(ModalRegistrarVendaComponent, {
      data: { anuncio },
      autoFocus: false,
      restoreFocus: false
    });
  }
  openModalEditarAnuncio(anuncio: any) {
    const dialog = this.dialog.open(ModalEditarAnuncioComponent, {
      data: { anuncio },
      autoFocus: false,
      restoreFocus: false
    });
    dialog.afterClosed().subscribe(anuncioEditado => {
      if(anuncioEditado?.lenght > 0){ //remover anuncio
        this.anuncios.splice(this.anuncios.findIndex((anuncio: { id: number; }) => anuncio.id === anuncioEditado[0]), 1);
      }else{
      if(anuncioEditado){
        if(anuncioEditado.imagemId){
        this.api.getImagemById(anuncioEditado.imagemId).subscribe(
          retImagem => {
            if(retImagem){
              anuncioEditado.imagem = retImagem;
              this.anuncios[this.anuncios.findIndex((anuncio: { id: any; }) => anuncio.id == anuncioEditado.id)] = anuncioEditado;
            } else{
              //this.openSnackBar('Erro ao buscar imagem.', 'Fechar');
            }
          });}else{
            this.anuncios[this.anuncios.findIndex((anuncio: { id: any; }) => anuncio.id == anuncioEditado.id)] = anuncioEditado;
          }
      }
    }
    });
  }

  getFazendas(){
    this.api.getAllFazendasByProprietarioCpf(this.cpf).subscribe((resposta) => {
      resposta != 0 ? (this.fazendas = resposta, this.fazendas.push({SNCR: "00000000000", nome: 'Todas'})) : null
      
    });
  }

  getTiposDeProdutos() {
    this.api.getAllTiposProdutos().subscribe(
      ret => {
        let values = Object.values(ret);
        let keys = Object.keys(ret);
        values.forEach(produto => { this.tiposDeProdutos.push({ nome: produto}) });
        for(let i = 0; i < this.tiposDeProdutos.length; i++)
          this.tiposDeProdutos[i].tipo = keys[i];
         this.tiposDeProdutos.push({nome: 'Todos', tipo: 'TODOS'});
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  filtrar(){
    if(this.fazendaSelected.value != '00000000000'){
      this.anunciosFiltrados = this.anuncios.filter((anuncio: { produto: { fazenda: any; }; }) => anuncio.produto.fazenda == this.fazendaSelected.value);
      if(this.categoriaSelected.value != 'TODOS'){
        this.anunciosFiltrados = this.anunciosFiltrados.filter((anuncio: { produto: { tipo: any; }; }) => anuncio.produto.tipo == this.categoriaSelected.value);
      }
    }else{
      if(this.categoriaSelected.value != 'TODOS'){
        this.anunciosFiltrados = this.anuncios.filter((anuncio: { produto: { tipo: any; }; }) => anuncio.produto.tipo == this.categoriaSelected.value);
      }else{
        this.anunciosFiltrados = this.anuncios;
      }
    }
  }

}
