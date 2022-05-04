import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-funcionarios',
  templateUrl: './modal-funcionarios.component.html',
  styleUrls: ['./modal-funcionarios.component.scss']
})
export class ModalFuncionariosComponent implements OnInit {
  cepInformado: any;
  constructor(
    public dialogRef: MatDialogRef<ModalFuncionariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    
  }

  ngOnInit(): void {
  }
  closeModal(): void {
    this.dialogRef.close();
  }
}

