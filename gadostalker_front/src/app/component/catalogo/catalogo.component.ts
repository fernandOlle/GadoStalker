import { ListaProdutoComponent } from './components/modal/lista-produto.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  catalogo = [
    { nome: 'Feijão', enabled: true },
    { nome: 'Alface', enabled: false },
    { nome: 'Soja', enabled: false },
    { nome: 'Mel', enabled: false },
    { nome: 'Vagem', enabled: false },
    { nome: 'Tomate', enabled: false },
    { nome: 'Leite', enabled: false },
  ];

  openModal() {
    const dialog = this.dialog.open(ListaProdutoComponent, {
      data: {},
      autoFocus: false,
      maxHeight: 700,
      maxWidth: 800,
      restoreFocus: false,
    });
  }
}
