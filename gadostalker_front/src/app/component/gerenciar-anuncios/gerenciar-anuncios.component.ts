import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistrarVendaComponent } from './components/modal-registrar-venda/modal-registrar-venda.component';
import { ModalEditarAnuncioComponent } from './components/modal-editar-anuncio/modal-editar-anuncio.component';
interface Anuncio {
  dataInicial: any;
  desconto: any,
  descricao: any,
  id: any,
  produtos:any,
  preco: any,
  titulo: any,
  imagem: any
}
@Component({
  selector: 'app-gerenciar-anuncios',
  templateUrl: './gerenciar-anuncios.component.html',
  styleUrls: ['./gerenciar-anuncios.component.scss']
})

export class GerenciarAnunciosComponent implements OnInit {
  @Input() anuncios: Anuncio[] = [];
  constructor(
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    
  }
  openModalRegistrarVenda() {
    const dialog = this.dialog.open(ModalRegistrarVendaComponent, {
      data: {  },
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
  }



}
