import { ListaProdutoComponent } from './components/modal/lista-produto.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../../services/local-storage.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  credenciais: any;
  cpf: any;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.getCatalogo();
    this.credenciais = this.localStorage.get('credenciais');
    if(this.credenciais.tipoUsuario == 'FUNCIONARIO'){
      this.cpf = this.credenciais.cpfPatrao;
    }else{
      this.cpf = this.credenciais.cpf;
    }
    this.getAllFazendas(this.cpf);

  }

  catalogo: any = [];
  fazendas: any = [];
  produtosFazenda: any;

  openModal(produto: any, fazendas:any) {
    const dialog = this.dialog.open(ListaProdutoComponent, {
      data: { produto, fazendas},
      autoFocus: false,
      maxHeight: 700,
      maxWidth: 800,
      restoreFocus: false,
    });
    dialog.afterClosed().subscribe(ret => {
      if(ret){
        if(typeof(ret) != 'string')
          this.catalogo.find((produto: { nome: any; }) => produto.nome === ret[0]).enabled = false;
        else
          this.catalogo.find((produto: { nome: any; }) => produto.nome === ret).enabled = true;
      }
    });
  }

  getCatalogo() {
    this.api.getAllTiposProdutos().subscribe(
      ret => {
        let values = Object.values(ret);
        values.forEach(produto => { this.catalogo.push({ nome: produto, enabled: false }) });
      }
    );
  }

  getAllFazendas(cpf: String) {
    this.api.getAllFazendasByProprietarioCpf(cpf).subscribe(
      ret => {
        this.fazendas = ret;
        this.fazendas.forEach((fazenda: any) => {
          this.getAllProdutosByFazendaSNCR(fazenda.SNCR);
        })
      }
    )
  }

  getAllProdutosByFazendaSNCR(sncr: String) {
    this.api.getAllProdutosByFazendaSNCR(sncr).subscribe(
      ret => {
        if(ret)
          this.produtosFazenda = ret;
        this.setProdutosEnable();
      }
    )
  }

  setProdutosEnable() {
    let produtosFazendaRecived = Object.values(this.produtosFazenda);
    produtosFazendaRecived.forEach((produto: any) => {
      this.catalogo
        .find((produtoAComparar: { nome: String, enabled: Boolean }) => { 
          produtoAComparar.nome === produto ? produtoAComparar.enabled = true : null
        });
    });
  }
}
