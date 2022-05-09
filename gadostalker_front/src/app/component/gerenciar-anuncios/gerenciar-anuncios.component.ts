import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistrarVendaComponent } from './components/modal-registrar-venda/modal-registrar-venda.component';
import { ModalEditarAnuncioComponent } from './components/modal-editar-anuncio/modal-editar-anuncio.component';
@Component({
  selector: 'app-gerenciar-anuncios',
  templateUrl: './gerenciar-anuncios.component.html',
  styleUrls: ['./gerenciar-anuncios.component.scss']
})
export class GerenciarAnunciosComponent implements OnInit {
  anuncios =  [
    {image: 'Feijão-anuncio2',
     title: 'Feijão Carioca',
     preco: 'R$ 3,99/KG'},
     {image: 'Feijão-anuncio2',
     title: 'Feijão Branco',
     preco: 'R$ 4,00/KG'},
     {image: 'Feijão-anuncio2',
     title: 'Feijão Preto',
     preco: 'R$ 4,05/KG'},
     {image: 'Feijão-anuncio2',
     title: 'Feijão Vermelho',
     preco: 'R$ 4,55/KG'},
     {image: 'Feijão-anuncio2',
     title: 'Feijão Branco',
     preco: 'R$ 4,65/KG'},
     {image: 'Feijão-anuncio2',
     title: 'Feijão Carioca',
     preco: 'R$ 4,70/KG'},
     {image: 'Feijão-anuncio2',
     title: 'Feijão Vermelho',
     preco: 'R$ 5,00/KG'},
     {image: 'Feijão-anuncio2',
     title: 'Feijão Preto',
     preco: 'R$ 5,20/KG'},

  ]
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
  openModalEditarAnuncio() {
    const dialog = this.dialog.open(ModalEditarAnuncioComponent, {
      data: {  },
      autoFocus: false,
      restoreFocus: false
    });
  }
}
