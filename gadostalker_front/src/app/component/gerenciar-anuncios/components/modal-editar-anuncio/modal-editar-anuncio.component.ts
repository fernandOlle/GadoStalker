import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  anuncio: any;
  cpf: any;
  constructor(
    public dialogRef: MatDialogRef<ModalEditarAnuncioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private localStorage: LocalStorageService,
    private _snackBar: MatSnackBar,
    ) {
      iconRegistry.addSvgIconLiteral('anexo', sanitizer.bypassSecurityTrustHtml(ANEXO_ICON));
      this.anuncio = data.anuncio;
      this.localUrl = this.anuncio.imagem;
      this.formAnuncio = this.formBuilder.group({
        titulo: new FormControl(this.anuncio.titulo, Validators.required),
        produto: new FormControl(this.anuncio.produto.id, Validators.required),
        preco: new FormControl(this.anuncio.preco, Validators.required),
        desconto: new FormControl(this.anuncio.desconto, Validators.required),
        descricao: new FormControl(this.anuncio.descricao, Validators.required),
      });
    }

  ngOnInit(): void {
    this.credenciais = this.localStorage.get('credenciais');
    if(this.credenciais.tipoUsuario == 'FUNCIONARIO'){
      this.cpf = this.credenciais.cpfPatrao;
    }else{
      this.cpf = this.credenciais.cpf;
    }
    this.getAllProdutosByCpf(this.cpf);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getAllProdutosByCpf(cpf: String) {
    this.api.getAllProdutosByCPF(cpf).subscribe(
      ret => {
        if(ret){
          this.produtosFazenda = ret;
          this.produtosFazenda = this.produtosFazenda.filter((produto: { tipo: string; }) => produto.tipo == this.anuncio.produto.tipo);
        }
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

  editarAnuncio(idAnuncio: any){
    let json = this.formAnuncio.value;
    json.produto = {id: json.produto};
    this.api.editarAnuncioById(idAnuncio, json).subscribe(
      ret => {
        if(ret){
          this.anuncio = ret;
          if(this.file)
            this.uploadImage();
          else
            this.dialogRef.close(this.anuncio);
        }
        else
          this.openSnackBar('Erro ao editar anúncio', 'Fechar');
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
          this.anuncio.imagemId = data;
          this.vincularAnuncioImagem(this.anuncio.id, this.anuncio.imagemId);
        }
      });
    } else {
      this.openSnackBar("Selecione um arquivo!", 'Fechar');
    }
  }

  vincularAnuncioImagem(idAnuncio: any, Idimagem: any){
    this.api.setImagemToAnuncio(idAnuncio, Idimagem).subscribe((ret: any) => {
      if (ret == 0){
        this.openSnackBar('Erro com vincular anuncio e imagem.', 'Fechar');
        this.dialogRef.close();
      }else{
        this.dialogRef.close(this.anuncio);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  excluirAnuncio(id: any){
    this.api.deletarAnuncioById(id).subscribe((ret: any) => {
      if (ret == 0){
        this.openSnackBar('Erro ao excluir o anúncio.', 'Fechar');
        this.dialogRef.close();
      }else{
        this.dialogRef.close([id, 'excluir']);
      }
    });
  }

  fecharAbrirAnuncio(fechar: any, id: any){
    if(fechar){
      this.api.encerrarAnuncioById(id).subscribe((ret: any) => {
        if (ret == 0){
          this.openSnackBar('Erro ao encerrar o anúncio.', 'Fechar');
          this.dialogRef.close();
        }else{
          this.dialogRef.close(ret);
        }
      });
    } else{
      this.api.reabrirAnuncioById(id).subscribe((ret: any) => {
        if (ret == 0){
          this.openSnackBar('Erro ao reabrir o anúncio.', 'Fechar');
          this.dialogRef.close();
        }else{
          this.dialogRef.close(ret);
        }
      });
    }
  }


}
