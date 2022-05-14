import { ListaProdutoComponent } from './components/modal/lista-produto.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {

  }

  catalogo = [
    { nome: 'Feijão', enabled: false },
    { nome: 'Alface', enabled: false },
    { nome: 'Soja', enabled: false },
    { nome: 'Mel', enabled: false },
    { nome: 'Vagem', enabled: false },
    { nome: 'Tomate', enabled: false },
    { nome: 'Leite', enabled: false },
  ];

  openModal(produto: any) {
    produto.enabled = true;
    const dialog = this.dialog.open(ListaProdutoComponent, {
      data: {produto},
      autoFocus: false,
      maxHeight: 700,
      maxWidth: 800,
      restoreFocus: false,
    });
  }
}
