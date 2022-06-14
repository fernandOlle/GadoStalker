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
  medida: any;
  function: any;
  constructor(
    public dialogRef: MatDialogRef<ModalRegistrarVendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { 
      this.anuncio = data.anuncio;
      this.tipoProduto = this.anuncio.produto.tipo;
    }

  ngOnInit(): void {
    this.returnMedida(this.tipoProduto);
  }

  closeModal(): void {
    this.dialogRef.close();
  }
  
  returnMedida(tipo: any){
    switch (tipo) {
      case 'LEITE':
        this.function = this.formatLabelL;
      break;
      case 'OVO':
        this.function = this.formatLabelDZ;
      break;
      case 'ALFACE':
      case 'MILHO':
        this.function = this.formatLabelUN;
      break;
      default:
        this.function = this.formatLabelKG;
      break;
    }
  }

  formatLabelL(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'L';
    }

    return value;
  }

  formatLabelDZ(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'DZ';
    }

    return value;
  }

  formatLabelUN(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'UN';
    }

    return value;
  }

  formatLabelKG(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'KG';
    }

    return value;
  }

}
