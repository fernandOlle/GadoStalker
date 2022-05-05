import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-catalogo',
  templateUrl: './modal-catalogo.component.html',
  styleUrls: ['./modal-catalogo.component.scss'],
})
export class ModalCatalogoComponent implements OnInit {
  cepInformado: any;
  checked = false;

  constructor(
    public dialogRef: MatDialogRef<ModalCatalogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
