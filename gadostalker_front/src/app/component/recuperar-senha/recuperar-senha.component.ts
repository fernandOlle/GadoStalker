import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { UtilsService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Question {
  value: string;
  viewValue: string;
}
const EYE_ICON = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
</svg>
`;

const EYE_OFF_ICON = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
</svg>
`;

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss'],
})
export class RecuperarSenhaComponent implements OnInit {
  hide = true;
  formRecuperarSenha: any;
  questions: Question[] = [
    { value: 'PROFESSORA', viewValue: 'Nome primeira professora?' },
    { value: 'COMIDA', viewValue: 'Qual é a sua comida favorita?' },
    { value: 'ANIMAL', viewValue: 'Nome do seu primeiro animal de estimação?' },
    { value: 'AMIGO', viewValue: 'Nome do seu melhor amigo de infância?' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private utilsService: UtilsService,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {
    let senha = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    let confirmaSenha = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      utilsService.validaRepitaSenha(senha),
    ]);
    this.formRecuperarSenha = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha,
      confirmaSenha,
      pergunta: new FormControl('', Validators.required),
      resposta: new FormControl('', Validators.required),
    });
    iconRegistry.addSvgIconLiteral(
      'eye',
      sanitizer.bypassSecurityTrustHtml(EYE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'eye-off',
      sanitizer.bypassSecurityTrustHtml(EYE_OFF_ICON)
    );
  }

  ngOnInit(): void {}

  recuperarSenha() {
    let json = this.formRecuperarSenha.value;
    delete json.confirmaSenha;
    this.api.recuperarSenha(json).subscribe((resposta) => {
      (resposta != 0)
        ? this.openSnackBar('Senha alterada com sucesso', 'Fechar')
        : this.openSnackBar(
            'Erro ao alterar a senha, confira os dados informados',
            'Fechar'
          );
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
