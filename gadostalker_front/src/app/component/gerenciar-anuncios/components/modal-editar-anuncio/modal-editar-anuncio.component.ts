import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
const ANEXO_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
  </svg>
`;
@Component({
  selector: 'app-modal-editar-anuncio',
  templateUrl: './modal-editar-anuncio.component.html',
  styleUrls: ['./modal-editar-anuncio.component.scss']
})
export class ModalEditarAnuncioComponent implements OnInit {
  formAnuncio: any;
  produtosFazenda: any;
  credenciais: any;
  file?: File;
  localUrl: any;
  imageBase64: any;
  constructor(
    public dialogRef: MatDialogRef<ModalEditarAnuncioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private localStorage: LocalStorageService,
    ) {
      iconRegistry.addSvgIconLiteral('anexo', sanitizer.bypassSecurityTrustHtml(ANEXO_ICON));
      this.localUrl = data.anuncio.imagem;
      this.formAnuncio = this.formBuilder.group({
        titulo: new FormControl('', Validators.required),
        produto: new FormControl('', Validators.required),
        preco: new FormControl('', Validators.required),
        desconto: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),
      });
    }

  ngOnInit(): void {
    this.credenciais = this.localStorage.get('credenciais');
    this.getAllProdutosByCpf(this.credenciais.cpf);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getAllProdutosByCpf(cpf: String) {
    this.api.getAllProdutosByCPF(cpf).subscribe(
      ret => {
        if(ret)
          this.produtosFazenda = ret;
        else
          this.produtosFazenda = [];
      }
    )
  }

  selectFile(event: any) {
    this.file = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.imageBase64 = this.localUrl.split(',')[1];
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
