import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.scss'],
})
export class ListaProdutoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListaProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  produto = {
    nome: '',
    especializado: false,
    quantidade: 5,
    fazenda: '',
  };
  ngOnInit(): void {}

  produtos = [
    {
      nome: 'Feijão preto',
      especializado: false,
      quantidade: 5,
      fazenda: 'Olieveiras',
    },
    {
      nome: 'Feijão carioca',
      especializado: true,
      quantidade: 4,
      fazenda: 'Canguçu',
    },
    {
      nome: 'Feijão branco',
      especializado: true,
      quantidade: 3,
      fazenda: 'Cruz Alta',
    },
    {
      nome: 'Feijão vermelho',
      especializado: true,
      quantidade: 2,
      fazenda: 'São Lourenço',
    },
  ];

  openModal() {
    const dialog = this.dialog.open(NovoProdutoComponent, {
      data: {},
      autoFocus: false,
      maxHeight: 300,
      maxWidth: 400,
      restoreFocus: false,
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
