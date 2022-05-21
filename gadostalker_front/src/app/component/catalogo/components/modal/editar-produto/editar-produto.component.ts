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
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {
  formProduto: any;
  produto: any;
  id: any;
  fazendas: any;
  constructor(
    public dialogRef: MatDialogRef<EditarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.formProduto = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      fazenda: new FormControl('', Validators.required),
      quantidade: new FormControl('', [Validators.required, Validators.min(1)])
    });
    this.fazendas = this.data.fazendas;
    this.id = this.data.id;
  }

  ngOnInit(): void {
    this.loadProduto(this.id);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  editarProduto(){
    let json = this.formProduto.value;
    this.api.editarProdutoById(this.id, json).subscribe((resposta) => {
      (resposta != 0)
        ? (
          this.produto = resposta
          )
        : (this.openSnackBar('Erro ao editar o produto','Fechar'))
        this.dialogRef.close(this.produto);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  loadProduto(id: any){
    this.api.consultarProdutoById(id).subscribe((resposta) => {
      (resposta != 0)
        ? this.copyObject(resposta) : this.openSnackBar('Erro ao buscar o produto','Fechar')
    });
  }

  copyObject(obj: any){
    this.formProduto.controls.nome.setValue(obj.nome);
    this.formProduto.controls.fazenda.setValue(obj.fazenda);
    this.formProduto.controls.tipo.setValue(obj.tipo);
    this.formProduto.controls.quantidade.setValue(obj.quantidade);
  }
}

