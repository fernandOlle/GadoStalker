import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ApiService } from '../../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

interface Produto {
  id: String;
  nome: String,
  fazenda: String,
  quantidade: Number,
}

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.scss'],
})
export class ListaProdutoComponent implements OnInit {
  produtoSelected: any;
  productKey: any;
  produtos: Produto[] | any = [];
  fazendas: any;
  produtoCadastrado: any;
  constructor(
    public dialogRef: MatDialogRef<ListaProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private api: ApiService,
    private _snackBar: MatSnackBar
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
    this.fazendas = this.data.fazendas;
  }

  ngOnInit(): void {
    this.api.getAllTiposProdutos().subscribe(
      ret => {
        this.setValue(ret);
        this.api.getAllProdutosByTypeAndSncr(this.productKey, this.fazendas[0].SNCR)
        .subscribe(ret => {
          this.produtos = ret;
        });
      }
    );
  }

  setValue(ret: any){
    let values = Object.keys(ret);
    values.find(produtoKey => {
      ret[produtoKey] === this.produtoSelected ? this.productKey = produtoKey : null;
    });
  }

  openModal(tipo: any, fazendas: any) {
    const dialog = this.dialog.open(NovoProdutoComponent, {
      data: {tipo, fazendas},
      autoFocus: false,
      maxHeight: 1000,
      maxWidth: 1200,
      restoreFocus: false,
    });
    dialog.afterClosed().subscribe(ret => {
      if(ret){
        this.produtoCadastrado = ret;
        this.produtos.push(ret);
      }
    });
 
  }

  closeModal(): void {
    if(this.produtoCadastrado && this.produtos.length !== 0)
      this.dialogRef.close(this.produtoSelected);
    else if(this.produtos.length === 0)
      this.dialogRef.close([this.produtoSelected, 'vazio']);
    else
      this.dialogRef.close();
  }

  openModalEditar() {

  }

  excluirProduto(id : any){
    this.api.excluirProdutoById(id).subscribe((resposta) => {
      (resposta != 0)
        ? this.produtos.splice(this.produtos.findIndex((produto: { id: number; }) => produto.id === id), 1)
        : this.openSnackBar(
            'Erro ao excluir produto',
            'Fechar'
          );
    });
  }

  searchFazendaName(produto: any){
    return this.fazendas.find((a: { SNCR: any; nome:any }) => a.SNCR === produto.fazenda).nome;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
