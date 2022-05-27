import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { ApiService} from '../../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-designar-funcionario',
  templateUrl: './modal-designar-funcionario.component.html',
  styleUrls: ['./modal-designar-funcionario.component.scss']
})
export class ModalDesignarFuncionarioComponent implements OnInit {
  fazendas: any;
  funcionarios: any;
  formDesignar: any;
  cpf: any;
  constructor(
    public dialogRef: MatDialogRef<ModalDesignarFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {
    this.fazendas = data.fazendas;
    this.funcionarios = data.funcionarios;
    this.formDesignar = this.formBuilder.group({
      funcionario: new FormControl('', Validators.required),
      fazenda: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  designar(){
    let json = {
      "cpf": this.formDesignar.controls.funcionario.value, 
      "fazendas": [
        {"SNCR": this.formDesignar.controls.fazenda.value}
      ]
    };

    this.api.trocaFuncionarioFazenda(json).subscribe(
      ret => {
        (ret != 0)
        ? (
          this.dialogRef.close(ret)
          )
        : (this.openSnackBar('Erro ao designar funcionário','Fechar'))
        
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
