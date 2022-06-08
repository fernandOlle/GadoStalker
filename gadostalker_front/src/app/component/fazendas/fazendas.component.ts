import { Component, OnInit } from '@angular/core';
import { ModalCadastrarFazendaComponent } from '../fazendas/components/modal-cadastrar-fazenda/modal-cadastrar-fazenda.component';
import { ModalExcluirFazendaComponent } from '../fazendas/components/modal-excluir-fazenda/modal-excluir-fazenda.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-fazendas',
  templateUrl: './fazendas.component.html',
  styleUrls: ['./fazendas.component.scss']
})
export class FazendasComponent implements OnInit {
  fazendasArray: any;
  panelOpenState = false;
  fazenda: any;
  cpf: any;
  formFazenda: any;
  haveChange = true;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private localStorage: LocalStorageService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cpf = this.localStorage.get('credenciais').cpf;
    this.getAllFazendas(this.cpf);
  }

  openModal(cpf: any) {
    const dialog = this.dialog.open(ModalCadastrarFazendaComponent, {
      data: { cpf },
      autoFocus: false,
      restoreFocus: false
    });
    dialog.afterClosed().subscribe(ret => {
      if (ret) {
        this.fazendasArray.push(ret);
      }
    });
  }

  openModalConfirmar(sncr: any) {
    const dialog = this.dialog.open(ModalExcluirFazendaComponent, {
      data: { sncr },
      autoFocus: false,
      restoreFocus: false
    });
    dialog.afterClosed().subscribe(fazendaExcluida => {
      if (fazendaExcluida) {
        let indexAExcluir = this.fazendasArray.findIndex((fazenda: { SNCR: string; }) => fazenda.SNCR === fazendaExcluida);
        this.fazendasArray.splice(indexAExcluir, 1);
      }
    });
  }

  getAllFazendas(cpf: String) {
    this.api.getAllFazendasByProprietarioCpf(cpf).subscribe(
      ret => {
        this.fazendasArray = ret;
      }
    )
  }

  editarFazenda(fazenda: any) {
    let sncr = fazenda.SNCR;
    this.api.editarFazendaBySncr(sncr, fazenda).subscribe(
      ret => {
        ret != 0 ?
          this.openSnackBar('Edições salvas com sucesso!', 'Fechar')
          :
          this.openSnackBar('Erro ao editar fazenda!', 'Fechar')
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  change(){
    this.haveChange = false;
  }

}
