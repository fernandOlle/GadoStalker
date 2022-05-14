import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const EDIT_ICON = `
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
</svg>
`;

const DELETE_ICON = `
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
</svg>
`;

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.scss'],
})
export class ListaProdutoComponent implements OnInit {
  produtoSelected: any;
  constructor(
    public dialogRef: MatDialogRef<ListaProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIconLiteral(
      'edit',
      sanitizer.bypassSecurityTrustHtml(EDIT_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'delete',
      sanitizer.bypassSecurityTrustHtml(DELETE_ICON)
    );
    this.produtoSelected = this.data.produto.nome;
  }

  ngOnInit(): void {
  }

  produtos = [
    {
      id: 1,
      nome: 'Feijão preto',
      quantidade: 5,
      fazenda: 'Fazenda Olieveiras',
    },
    {
      id: 2,
      nome: 'Feijão carioca',
      quantidade: 4,
      fazenda: 'Fazenda Canguçu',
    },
    {
      id: 3,
      nome: 'Feijão branco',
      quantidade: 3,
      fazenda: 'Fazenda Cruz Alta',
    },
    {
      id: 4,
      nome: 'Feijão vermelho',
      quantidade: 2,
      fazenda: 'Fazenda São Lourenço',
    },
    
  ];

  openModal() {
    const dialog = this.dialog.open(NovoProdutoComponent, {
      data: {},
      autoFocus: false,
      maxHeight: 1000,
      maxWidth: 1200,
      restoreFocus: false,
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  openModalEditar(){

  }
}
