import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-excluir-fazenda',
  templateUrl: './modal-excluir-fazenda.component.html',
  styleUrls: ['./modal-excluir-fazenda.component.scss']
})
export class ModalExcluirFazendaComponent implements OnInit {
  sncr: any;
  constructor(
    public dialogRef: MatDialogRef<ModalExcluirFazendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) { 
    this.sncr = data.sncr;
  }

  ngOnInit(): void {}

  excluir(){
    this.api.deletarFazenda(this.sncr).subscribe((resposta) => {
      resposta == 0 ? (this.openSnackBar('Erro ao excluir fazenda','Fechar'), this.dialogRef.close(resposta)) : this.dialogRef.close(this.sncr);
    });
  }

  cancelar(){
    this.dialogRef.close(null);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
