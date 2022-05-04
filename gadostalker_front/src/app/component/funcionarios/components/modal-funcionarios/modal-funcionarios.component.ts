import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
const EYE_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
</svg>
`;
@Component({
  selector: 'app-modal-funcionarios',
  templateUrl: './modal-funcionarios.component.html',
  styleUrls: ['./modal-funcionarios.component.scss']
})
export class ModalFuncionariosComponent implements OnInit {
  cepInformado: any;
  fazenda: any;
  pergunta: any;
  constructor(
    public dialogRef: MatDialogRef<ModalFuncionariosComponent>,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    iconRegistry.addSvgIconLiteral('eye', sanitizer.bypassSecurityTrustHtml(EYE_ICON));
  }

  ngOnInit(): void {
  }
  closeModal(): void {
    this.dialogRef.close();
  }
}

