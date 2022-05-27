import { Component, OnInit } from '@angular/core';
import { ModalFuncionariosComponent } from '../funcionarios/components/modal-funcionarios/modal-funcionarios.component';
import { ModalFuncionariosEditarComponent } from '../funcionarios/components/modal-funcionarios-editar/modal-funcionarios-editar.component';
import { ModalDesignarFuncionarioComponent } from '../funcionarios/components/modal-designar-funcionario/modal-designar-funcionario.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../../services/local-storage.service';
import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const ARROW_RIGHT_ICON = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
`;
const ARROW_LEFT_ICON = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
  </svg>
`;

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {
  cpf: any
  fazendas: any
  funcionarios: any
  pageIndex = 0;
  constructor(
    public dialog: MatDialog,
    private localStorage: LocalStorageService,
    private api: ApiService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIconLiteral('arrow-right', sanitizer.bypassSecurityTrustHtml(ARROW_RIGHT_ICON));
    iconRegistry.addSvgIconLiteral('arrow-left', sanitizer.bypassSecurityTrustHtml(ARROW_LEFT_ICON));
  }

  ngOnInit(): void {
    this.cpf = this.localStorage.get('credenciais').cpf;
    this.getAllFazendas(this.cpf);
    this.getFuncionarios(this.cpf)
  }

  openModal(cpf: any) {
    const dialog = this.dialog.open(ModalFuncionariosComponent, {
      data: { cpf },
      autoFocus: false,
      restoreFocus: false
    });
    dialog.afterClosed().subscribe(ret => {
      this.getAllFazendas(this.cpf);
      this.getFuncionarios(this.cpf)
  });
  }

  openModalEditar(funcionario: any) {
    const dialog = this.dialog.open(ModalFuncionariosEditarComponent, {
      data: {funcionario},
      autoFocus: false,
      restoreFocus: false
    });
    dialog.afterClosed().subscribe(ret => {
        this.getAllFazendas(this.cpf);
        this.getFuncionarios(this.cpf)
    });
  }

  getAllFazendas(cpf: String) {
    this.api.getAllFazendasByProprietarioCpf(cpf).subscribe(
      ret => {
        this.fazendas = ret;
      }
    )
  }

  getFuncionarios(cpf: String){
    this.api.getListaFuncionariosByCpf(cpf).subscribe(
      ret => {
        this.funcionarios = ret;
      }
    )
  }

  changePage(acao: any) {
    if (acao == 'proxima' && this.pageIndex < this.fazendas.length - 1)
      this.pageIndex += 1;
    else if (acao == 'anterior' && this.pageIndex > 0)
      this.pageIndex -= 1;
  }

  openModalDesignar(fazendas: any, funcionarios: any) {
    const dialog = this.dialog.open(ModalDesignarFuncionarioComponent, {
      data: { fazendas, funcionarios },
      autoFocus: false,
      restoreFocus: false
    });
    dialog.afterClosed().subscribe(ret => {
      if(ret){
        this.getAllFazendas(this.cpf);
        this.getFuncionarios(this.cpf)
      }
    });
  }

}

