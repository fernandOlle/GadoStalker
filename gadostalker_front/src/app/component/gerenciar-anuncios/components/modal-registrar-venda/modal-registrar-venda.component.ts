import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-registrar-venda',
  templateUrl: './modal-registrar-venda.component.html',
  styleUrls: ['./modal-registrar-venda.component.scss']
})
export class ModalRegistrarVendaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalRegistrarVendaComponent>,) { }

  ngOnInit(): void {
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
}
