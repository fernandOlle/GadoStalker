import { Component, OnInit } from '@angular/core';
import { ModalFuncionariosComponent } from '../funcionarios/components/modal-funcionarios/modal-funcionarios.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  funcionarios = [
    {
      nome: 'Alejandro da Silva Pereira',
      email: 'alejandro@hotmail.com',
      cargo: 'Proprietário'
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
    
    openModal() {
      const dialog = this.dialog.open(ModalFuncionariosComponent, {
        data: {  },
        autoFocus: false,
        maxHeight: 1000,
        maxWidth: 1000,
        restoreFocus: false
      });
    }
    
}

