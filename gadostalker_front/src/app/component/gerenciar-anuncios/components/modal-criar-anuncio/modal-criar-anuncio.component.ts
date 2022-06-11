import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../../../services/api.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
const ANEXO_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
  </svg>
`;
@Component({
  selector: 'app-modal-criar-anuncio',
  templateUrl: './modal-criar-anuncio.component.html',
  styleUrls: ['./modal-criar-anuncio.component.scss']
})
export class ModalCriarAnuncioComponent implements OnInit {
  credenciais: any;
  fazendas: any;
  produtosFazenda: any;
  formAnuncio: any;
  anuncioCadastrado: any;
  imageBase64: any;
  constructor(
    public dialogRef: MatDialogRef<ModalCriarAnuncioComponent>,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private api: ApiService,
    private localStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ) {
    iconRegistry.addSvgIconLiteral('anexo', sanitizer.bypassSecurityTrustHtml(ANEXO_ICON));
    this.formAnuncio = this.formBuilder.group({
      titulo: new FormControl('', Validators.required),
      produto: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.required),
      desconto: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    });
  }
  file?: File;
  localUrl = '../../../assets/upload.png';
  ngOnInit(): void {
    this.credenciais = this.localStorage.get('credenciais');
    this.getAllFazendas(this.credenciais.cpf);
    this.getAllProdutosByCpf(this.credenciais.cpf);
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

  closeModal(): void {
    this.dialogRef.close();
  }

  getAllFazendas(cpf: String) {
    this.api.getAllFazendasByProprietarioCpf(cpf).subscribe(
      ret => {
        if(ret)
         this.fazendas = ret;
        else
          this.fazendas = [];
      }
    )
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

  salvarAnuncio(){
    let produtoIdSelected = this.formAnuncio.controls.produto.value;
    let json = this.formAnuncio.value;
    delete json.produto;
    json.produtos = [{id: produtoIdSelected}];
    this.api.adicionarAnuncio(json).subscribe(
      async ret => {
        if(ret){
          this.anuncioCadastrado = ret;
          this.uploadImage();
        } else
          this.openSnackBar('Erro ao criar anúncio.', 'Fechar');
      }
    )
  }

  async uploadImage(){
    if (this.file != undefined) {
      this.api.uploadFile(this.imageBase64, this.file.name).subscribe((data: any) => {
        if (data == 0){
          this.openSnackBar('Erro com ao fazer upload da imagem.', 'Fechar');
          this.dialogRef.close();
        }else{
          this.anuncioCadastrado.imagemId = data;
          this.vincularAnuncioImagem(this.anuncioCadastrado.id, this.anuncioCadastrado.imagemId);
        }
      });
    } else {
      this.openSnackBar("Selecione um arquivo!", 'Fechar');
    }
  }

  vincularAnuncioImagem(idAnuncio: any, Idimagem: any){
    this.api.setImagemToAnuncio(idAnuncio, Idimagem).subscribe((ret: any) => {
      debugger
      if (ret == 0){
        this.openSnackBar('Erro com vincular anuncio e imagem.', 'Fechar');
        this.dialogRef.close();
      }else{
        this.dialogRef.close(this.anuncioCadastrado);
      }
    });
  }
  
   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
