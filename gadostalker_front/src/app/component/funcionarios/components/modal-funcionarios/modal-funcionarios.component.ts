import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { UtilsService } from '../../../../services/utils.service';
import { ApiService } from '../../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const EYE_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
</svg>
`;
interface Question {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-modal-funcionarios',
  templateUrl: './modal-funcionarios.component.html',
  styleUrls: ['./modal-funcionarios.component.scss']
})
export class ModalFuncionariosComponent implements OnInit {
  fazendas: any;
  perguntas: Question[] = [
    { value: 'PROFESSORA', viewValue: 'Nome primeira professora?' },
    { value: 'COMIDA', viewValue: 'Qual é a sua comida favorita?' },
    { value: 'ANIMAL', viewValue: 'Nome do seu primeiro animal de estimação?' },
    { value: 'AMIGO', viewValue: 'Nome do seu melhor amigo de infância?' },
  ];
  formUsuario: any;
  cpfProdutor: any;
  constructor(
    public dialogRef: MatDialogRef<ModalFuncionariosComponent>,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    public api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) { 
    iconRegistry.addSvgIconLiteral('eye', sanitizer.bypassSecurityTrustHtml(EYE_ICON));
    let senha = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    let confirmaSenha = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      utilsService.validaRepitaSenha(senha),
    ]);
    this.formUsuario = this.formBuilder.group({
      fazenda: new FormControl('', Validators.required),
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(60),
        Validators.pattern(
          '[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.-/&_-]+\\s+[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.-/&\\s]{3,}'
        ),
      ]),
      telefone: new FormControl('', [Validators.required]),
      senha,
      confirmaSenha,
      pergunta: new FormControl('', Validators.required),
      resposta: new FormControl('', Validators.required),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}|\\d{2}.\\d{3}.\\d{3}\\/\\d{4}\\-\\d{2}'
        ),
        utilsService.formBuilderCpfCnpj(),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.cpfProdutor = this.data.cpf;
  }

  ngOnInit(): void {
    this.getFazendas();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getFazendas(){
    this.api.getAllFazendasByProprietarioCpf(this.cpfProdutor).subscribe((resposta) => {
      resposta != 0 ? this.fazendas = resposta : null
    });
  }

  adicionar(){
    let json = this.formUsuario.value;
    delete json.confirmaSenha;
    json.cpf = json.cpf.replaceAll('.', '').replaceAll('-', '');
    let fazendaSelect = json.fazenda;
    delete json.fazenda;
    json.fazendas = [{SNCR: fazendaSelect}];
    this.api.cadastroFuncionario(json).subscribe((resposta) => {
      resposta ? this.dialogRef.close(resposta) : this.openSnackBar('Erro ao cadastrar funcionário','Fechar')
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

