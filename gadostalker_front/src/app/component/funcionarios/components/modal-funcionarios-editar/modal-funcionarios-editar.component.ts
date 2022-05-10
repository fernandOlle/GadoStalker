import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import  {MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-funcionarios-editar',
  templateUrl: './modal-funcionarios-editar.component.html',
  styleUrls: ['./modal-funcionarios-editar.component.scss']
})
export class ModalFuncionariosEditarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalFuncionariosEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalConfirmacao);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  closeModal(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'modal-confirmacao',
  templateUrl: 'modal-confirmacao.html',
  styleUrls: ['./modal-funcionarios-editar.component.scss']
})
export class ModalConfirmacao {}
