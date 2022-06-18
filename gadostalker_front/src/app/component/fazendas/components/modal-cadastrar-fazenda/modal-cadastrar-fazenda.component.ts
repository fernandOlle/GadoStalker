import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { ApiService } from '../../../../services/api.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { UtilsService } from '../../../../services/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const EYE_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
</svg>
`;
@Component({
  selector: 'app-modal-cadastrar-fazenda',
  templateUrl: './modal-cadastrar-fazenda.component.html',
  styleUrls: ['./modal-cadastrar-fazenda.component.scss']
})
export class ModalCadastrarFazendaComponent implements OnInit {
  cepInformado: any;
  fazendaCadastrada: any;
  pergunta: any;
  cpf: any;
  formFazenda: any;
  sncrValid: any;
  ultimoSncrBuscado: any;

  constructor(
    public dialogRef: MatDialogRef<ModalCadastrarFazendaComponent>,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) { 
    iconRegistry.addSvgIconLiteral('eye', sanitizer.bypassSecurityTrustHtml(EYE_ICON));
    this.cpf = this.data.cpf;
    this.formFazenda = this.formBuilder.group({
      SNCR: new FormControl('', [Validators.required]),
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(60),
        Validators.pattern(
          '[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.-/&_-]+\\s+[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.-/&\\s]{3,}'
        ),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      isZapZap: new FormControl(false, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  adicionarFazenda(){
    let json = this.formFazenda.value;
    this.api.adicionarFazenda(this.cpf, json).subscribe((resposta) => {
      (resposta != 0)
        ? (
          this.fazendaCadastrada = this.formFazenda.value,
          this.fazendaCadastrada.funcionarios = []
          )
        : (this.openSnackBar('Erro ao cadastrar a fazenda, SNCR já cadastrado','Fechar'))
        this.dialogRef.close(this.fazendaCadastrada);
    });
  }

  addValidacaoSncr(){
    if(this.ultimoSncrBuscado != this.formFazenda.controls.SNCR.value && this.formFazenda.controls.SNCR.value.length == 12){
      this.ultimoSncrBuscado = this.formFazenda.controls.SNCR.value;
      this.api.validaSncr(this.ultimoSncrBuscado).subscribe((resposta) => {
      resposta ? this.sncrValid = true : this.sncrValid = false;
      this.formFazenda.controls.SNCR.setValidators([Validators.required, this.utilsService.formBuilderSNCR(this.sncrValid)]);
      this.formFazenda.controls.SNCR.updateValueAndValidity();
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
