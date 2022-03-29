import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { array } from 'yargs';

const ARROW_RIGHT_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
`;
const ARROW_LEFT_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
  </svg>
`;

const CHECK_ICON =
  `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
  </svg>
`;



@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss']
})
export class CriarContaComponent implements OnInit {
  step = [true, false, false];
  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
  ) { 
    iconRegistry.addSvgIconLiteral('arrow-right', sanitizer.bypassSecurityTrustHtml(ARROW_RIGHT_ICON));
    iconRegistry.addSvgIconLiteral('arrow-left', sanitizer.bypassSecurityTrustHtml(ARROW_LEFT_ICON));
    iconRegistry.addSvgIconLiteral('check', sanitizer.bypassSecurityTrustHtml(CHECK_ICON));
  }

  ngOnInit(): void {
  }

  proximo(){
    if(this.step[0]){
      this.step[0] = false;
      this.step[1] = true;
    } else if(this.step[1]){
      this.step[1] = false;
      this.step[2] = true;
    }
  }

  anterior(){
    if(this.step[1]){
      this.step[0] = true;
      this.step[1] = false;
    } else if(this.step[2]){
      this.step[2] = false;
      this.step[1] = true;
    }
  }

  criarConta(){
    console.log('Criei a conta');
  }

}
