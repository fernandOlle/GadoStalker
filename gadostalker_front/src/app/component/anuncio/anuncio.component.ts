import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/local-storage.service';

const CELL_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
</svg>
`;

const EMAIL_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
</svg>
`;
@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss']
})
export class AnuncioComponent implements OnInit {
  idAnuncio: any;
  anuncio: any;
  usuario: any;
  fazenda: any;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private api: ApiService,
    private localStorage: LocalStorageService,
  ) {
    iconRegistry.addSvgIconLiteral('cell', sanitizer.bypassSecurityTrustHtml(CELL_ICON));
    iconRegistry.addSvgIconLiteral('email', sanitizer.bypassSecurityTrustHtml(EMAIL_ICON));
  }
  panelOpenState = false;

  ngOnInit(): void {
    this.idAnuncio = Number(this.route.snapshot.paramMap.get('id'));
    this.usuario = this.localStorage.get('credenciais');
    this.getAnuncioById(this.idAnuncio);
  }

  getAnuncioById(id: any) {
    this.api.getAnuncioById(id).subscribe(
      ret => {
        if (ret) {
          this.anuncio = ret;
          if (this.anuncio?.imagemId) {
            this.api.getImagemById(this.anuncio.imagemId).subscribe(
              retImagem => {
                if (retImagem) {
                  this.anuncio.imagem = retImagem;
                }
            });
          }
          this.getFazenda();
          this.formatData();
        }
      }
    );
  }

  formatData(){
    let data = new Date(this.anuncio.dataInicial.split('[')[0]);
    let dia = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    let mes =  data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1;
    let ano = data.getFullYear();
    this.anuncio.dataFormatada = dia + '/' + mes + '/' + ano;
  }

  getFazenda(){
    this.api.getFazendaBySncr(this.anuncio.produto.fazenda).subscribe(
      ret => {
        if (ret) {
          this.fazenda = ret;
          debugger
        }
      }
    );
  }
}
