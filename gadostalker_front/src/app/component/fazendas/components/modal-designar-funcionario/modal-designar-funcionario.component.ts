import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-designar-funcionario',
  templateUrl: './modal-designar-funcionario.component.html',
  styleUrls: ['./modal-designar-funcionario.component.scss']
})
export class ModalDesignarFuncionarioComponent implements OnInit {
  funcionario: any;
  fazenda: any;
  constructor() { }

  ngOnInit(): void {
  }

}
