import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalCatalogoComponent } from '../catalogo/components/modal-catalogo/modal-catalogo.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  catalogo = [
    { nome: 'Feijão', enabled: false },
    { nome: 'Alface', enabled: false },
    { nome: 'Soja', enabled: false },
    { nome: 'Mel', enabled: false },
    { nome: 'Vagem', enabled: false },
    { nome: 'Tomate', enabled: false },
    { nome: 'Leite', enabled: false },
  ];

  openModal() {
    const dialog = this.dialog.open(ModalCatalogoComponent, {
      data: {},
      autoFocus: false,
      maxHeight: 300,
      maxWidth: 400,
      restoreFocus: false,
    });
  }
}
