import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  formUsuario: any;
  usuario: any;
  constructor(
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.usuario = this.data.usuario;
    this.formUsuario = this.formBuilder.group({
      nome: new FormControl(this.usuario.nome, [Validators.required, Validators.pattern(
        '[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.-/&_-]+\\s+[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.-/&\\s]{3,}'
      ),]),
      email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      telefone: new FormControl(this.usuario.telefone, Validators.required),
    });

  }

  ngOnInit(): void { };

  closeModal(): void {
    this.dialogRef.close();
  }

  editarPerfil() {
    let json = this.formUsuario.value;
    this.api.editarPerfilByCpf(this.usuario.cpf, json).subscribe((resposta) => {
      (resposta != 0)
        ? (
          this.usuario= resposta
        )
        : (this.openSnackBar('Erro ao editar o perfil do usuário', 'Fechar'))
      this.dialogRef.close(this.usuario);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

