import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { UtilsService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

const CHECK_ICON = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
  </svg>
`;

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

interface Question {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss'],
})
export class CriarContaComponent implements OnInit {
  step = [true, false, false];
  hide = true;
  formUsuario: any;
  formFazenda: any;
  questions: Question[] = [
    { value: 'PROFESSORA', viewValue: 'Nome primeira professora?' },
    { value: 'COMIDA', viewValue: 'Qual é a sua comida favorita?' },
    { value: 'ANIMAL', viewValue: 'Nome do seu primeiro animal de estimação?' },
    { value: 'AMIGO', viewValue: 'Nome do seu melhor amigo de infância?' },
  ];
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private api: ApiService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    iconRegistry.addSvgIconLiteral(
      'arrow-right',
      sanitizer.bypassSecurityTrustHtml(ARROW_RIGHT_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'arrow-left',
      sanitizer.bypassSecurityTrustHtml(ARROW_LEFT_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'check',
      sanitizer.bypassSecurityTrustHtml(CHECK_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'eye',
      sanitizer.bypassSecurityTrustHtml(EYE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'eye-off',
      sanitizer.bypassSecurityTrustHtml(EYE_OFF_ICON)
    );
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
      cargo: new FormControl('0', Validators.required),
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
    this.formFazenda = this.formBuilder.group({
      SNCR: new FormControl('', Validators.required),
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
    });
  }

  ngOnInit(): void {}

  proximo() {
    if (this.step[0]) {
      this.step[0] = false;
      this.step[1] = true;
    } else if (this.step[1]) {
      this.step[1] = false;
      this.step[2] = true;
    }
  }

  anterior() {
    if (this.step[1]) {
      this.step[0] = true;
      this.step[1] = false;
    } else if (this.step[2]) {
      this.step[2] = false;
      this.step[1] = true;
    }
  }

  async criarConta(tipo: String) {
    let json = this.formUsuario.value;
    delete json.cargo;
    delete json.confirmaSenha;
    json.cpf = json.cpf.replaceAll('.', '').replaceAll('-', '');
    if (tipo == 'usuarioComum') {
      this.api.cadastroUsuarioComum(json).subscribe((resposta) => {
        resposta
          ? this.router.navigate(['/home'])
          : this.openSnackBar('Falha ao criar conta', 'Fechar');
      });
    } else if (tipo == 'proprietario') {
      json.fazendas = [this.formFazenda.value];
      this.api.cadastroProprietario(json).subscribe((resposta) => {
        resposta
          ? this.router.navigate(['/home'])
          : this.openSnackBar('Falha ao criar conta', 'Fechar');
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
