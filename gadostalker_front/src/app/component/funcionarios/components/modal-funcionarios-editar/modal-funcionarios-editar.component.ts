import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import  {MatDialog } from '@angular/material/dialog';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-funcionarios-editar',
  templateUrl: './modal-funcionarios-editar.component.html',
  styleUrls: ['./modal-funcionarios-editar.component.scss']
})
export class ModalFuncionariosEditarComponent implements OnInit {
  funcionario: any
  formFuncionario: any
  constructor(
    public dialogRef: MatDialogRef<ModalFuncionariosEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar
    ) {
      this.funcionario = data.funcionario;
      this.formFuncionario = this.formBuilder.group({
        nome: new FormControl(this.funcionario.nome, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(60),
          Validators.pattern(
            '[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.-/&_-]+\\s+[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.-/&\\s]{3,}'
          ),
        ]),
        email: new FormControl(this.funcionario.email, [Validators.required, Validators.email]),
        telefone: new FormControl(this.funcionario.telefone, Validators.required),
      });
     }

  ngOnInit(): void {}

  openDialog(cpf: any) {
    const dialogRef = this.dialog.open(ModalConfirmacao, {
      data: {cpf},
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != 0)
        this.dialog.closeAll();
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  editarFuncionario(){
    let json = this.formFuncionario.value;
    this.api.editarPerfilByCpf(this.funcionario.cpf, json).subscribe((resposta) => {
      (resposta != 0)
        ? this.dialogRef.close(resposta)
        : this.openSnackBar('Erro ao editar o funcionário', 'Fechar')
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}

@Component({
  selector: 'modal-confirmacao',
  templateUrl: 'modal-confirmacao.html',
  styleUrls: ['./modal-funcionarios-editar.component.scss']
})
export class ModalConfirmacao {
  cpf : any
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacao>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private _snackBar: MatSnackBar
    ){
    this.cpf = data.cpf;
  }

  excluir(cpf: any){
    this.api.excluirUsuarioByCpf(cpf).subscribe((resposta) => {
      resposta == 0 ? this.openSnackBar('Erro ao excluir funcionário','Fechar') : this.dialogRef.close(resposta);
    });
  }

  closeModal(){
    this.dialogRef.close(0);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
