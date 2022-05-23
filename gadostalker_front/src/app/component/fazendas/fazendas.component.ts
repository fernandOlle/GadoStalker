import { Component, OnInit } from '@angular/core';
import { ModalCadastrarFazendaComponent } from '../fazendas/components/modal-cadastrar-fazenda/modal-cadastrar-fazenda.component';
import { ModalDesignarFuncionarioComponent } from '../fazendas/components/modal-designar-funcionario/modal-designar-funcionario.component';
import { ModalConfirmacao } from '../funcionarios/components/modal-funcionarios-editar/modal-funcionarios-editar.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/local-storage.service';
@Component({
  selector: 'app-fazendas',
  templateUrl: './fazendas.component.html',
  styleUrls: ['./fazendas.component.scss']
})
export class FazendasComponent implements OnInit {
  fazendasArray: any;
    funcionarios = [
      {
        nome: 'Alejandro da Silva Pereira',
        email: 'alejandro@hotmail.com',
        cargo: 'Funcionário'
      },
      {
        nome: 'Fernando Ribeiro Ollé',
        email: 'fernando@hotmail.com',
        cargo: 'Funcionário'
      },
      {
        nome: 'Kevin Pereira',
        email: 'kevin@hotmail.com',
        cargo: 'Funcionário'
      },
      {
        nome: 'Gustavo Peres',
        email: 'gustavo@hotmail.com',
        cargo: 'Funcionário'
      },
      {
        nome: 'Thomazio Giacobb',
        email: 'thomazio@hotmail.com',
        cargo: 'Funcionário'
      },
      {
        nome: 'João Rezende Ladeira',
        email: 'joao@hotmail.com',
        cargo: 'Funcionário'
      }];
      
    panelOpenState = false;
    fazenda: any;
    cpf: any;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.cpf = this.localStorage.get('credenciais').cpf;
    this.getAllFazendas(this.cpf);
  }
  openModal() {
    const dialog = this.dialog.open(ModalCadastrarFazendaComponent, {
      data: {  },
      autoFocus: false,
      restoreFocus: false
    });
  }
  openModalConfirmar() {
    const dialog = this.dialog.open(ModalConfirmacao, {
      data: {  },
      autoFocus: false,
      restoreFocus: false
    });
  }

  openModalDesignar() {
    const dialog = this.dialog.open(ModalDesignarFuncionarioComponent, {
      data: {  },
      autoFocus: false,
      restoreFocus: false
    });
  }

  getAllFazendas(cpf: String) {
    this.api.getAllFazendasByProprietarioCpf(cpf).subscribe(
      ret => {
        this.fazendasArray = ret;
      }
    )
  }

}
