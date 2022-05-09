import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss'],
})
export class NovoProdutoComponent implements OnInit {
  checked = false;

  constructor(
    public dialogRef: MatDialogRef<NovoProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
