import { Component, OnInit } from '@angular/core';
import { ModalCadastrarFazendaComponent } from '../fazendas/components/modal-cadastrar-fazenda/modal-cadastrar-fazenda.component';
import { ModalDesignarFuncionarioComponent } from '../fazendas/components/modal-designar-funcionario/modal-designar-funcionario.component';
import { ModalConfirmacao } from '../funcionarios/components/modal-funcionarios-editar/modal-funcionarios-editar.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-fazendas',
  templateUrl: './fazendas.component.html',
  styleUrls: ['./fazendas.component.scss']
})
export class FazendasComponent implements OnInit {
  fazendasArray = [
    {
      nome: 'Fazenda Feliz',
      email: 'fazendafeliz@hotmail.com',
      sncr: '75.041.040.170-0',
      telefone: '(51) 99999-60293'
    },
    {
      nome: 'Fezenda Feliz II',
      email: 'fazendafelizii@hotmail.com',
      sncr: '14.000.040.000-8',
      telefone: '(51) 98999-60293'
    },
    {
      nome: 'Fazenda Campo Bom',
      email: 'campobom@hotmail.com',
      sncr: '20.000.520.000-0',
      telefone: '(51) 87999-60293'
    },
    {
      nome: 'Fazenda Pereira',
      email: 'fazendapereira@hotmail.com',
      sncr: '10.020.540.600-9',
      telefone: '(51) 12999-60293'
    }];
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
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
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

}
