import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../../services/api.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss'],
})
export class NovoProdutoComponent implements OnInit {
  checked = false;
  tipo: any;
  fazendas: any;
  formProduto: any;
  produto: any;
  constructor(
    public dialogRef: MatDialogRef<NovoProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.tipo = this.data.tipo;
    this.fazendas = this.data.fazendas;
    this.formProduto = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      tipo: new FormControl(this.tipo, Validators.required),
      fazenda: new FormControl('', Validators.required),
      quantidade: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }

  adicionarProduto(){
    let json = this.formProduto.value;
    this.api.adicionarProduto(json).subscribe((resposta) => {
      (resposta != 0)
        ? (
          this.produto = resposta
          )
        : (this.openSnackBar('Erro ao cadastrar o produto','Fechar'))
        this.dialogRef.close(this.produto);
    });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
