import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-registrar-venda',
  templateUrl: './modal-registrar-venda.component.html',
  styleUrls: ['./modal-registrar-venda.component.scss']
})
export class ModalRegistrarVendaComponent implements OnInit {
  anuncio: any;
  tipoProduto: any;
  medida: String;
  constructor(
    public dialogRef: MatDialogRef<ModalRegistrarVendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { 
      this.anuncio = data.anuncio;
      this.tipoProduto = this.anuncio.produtos[0].tipo;
      this.medida = this.returnMedida(this.tipoProduto);
    }

  ngOnInit(): void {
    debugger
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'kg';
    }

    return value;
  }

  returnMedida(tipo: any){
    switch (tipo) {
      case 'LEITE':
        return 'l';
      case 'OVO':
        return 'dz'
      case 'ALFACE':
      case 'MILHO':
        return 'un';
      default:
        return 'kg'
    }
  }


}
