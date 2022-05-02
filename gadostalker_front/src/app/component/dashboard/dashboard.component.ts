import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import * as c3 from 'c3';
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
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIconLiteral('arrow-right', sanitizer.bypassSecurityTrustHtml(ARROW_RIGHT_ICON));
    iconRegistry.addSvgIconLiteral('arrow-left', sanitizer.bypassSecurityTrustHtml(ARROW_LEFT_ICON));
   }
   sem1: any = ['x', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun'];
   arrayNf = [
    "Lucro obtido",
    0,
    1883.48,
    1200,
    1122.22,
    0,
    0
];
arrayQtd = [
  "Número de vendas",
  0,
  12,
  15,
  26,
  22,
  0
]
  ngOnInit(): void {
    this.montaGraficoNF(this.sem1, this.arrayNf);
    this.montaGraficoQuantidadeVendas(this.sem1, this.arrayQtd);
    
  }
  montaGraficoNF(col_x: any, arrayNF: any) {
    let tickPC =
    {
      tick: {
        format: (y: { toLocaleString: (arg0: string, arg1: { style: string; currency: string; }) => any; }) => {
          return y.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
      }
    };

    var chart = c3.generate({
      bindto: '#chart_negociosF',
      size: {
        height: 250,
      },
      data: {
        x: 'x',
        columns: [col_x, arrayNF],
        types: {
          'Lucro obtido': 'area-spline',
        },
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#3ca63c']
      },
      axis: {
        x: {
          type: 'category',
          tick: {},
        },
        y: tickPC,
      }
    });
  }

  montaGraficoQuantidadeVendas(col_x: any, arrayNF: any) {
    let tickPC =
    {
      tick: {
        format: (y: any) => {
          return y
        }
      }
    };

    var chart = c3.generate({
      bindto: '#chart_quantidadeVendas',
      size: {
        height: 250,
      },
      data: {
        x: 'x',
        columns: [col_x, arrayNF],
        types: {
          'Número de vendas': 'area-spline',
        },
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#594A3C']
      },
      axis: {
        x: {
          type: 'category',
          tick: {},
        },
        y: tickPC,
      }
    });
  }

  montaGraficoLucroGeral(col_x: any, arrayNF: any) {
    let tickPC =
    {
      tick: {
        format: (y: any) => {
          return y
        }
      }
    };

    var chart = c3.generate({
      data: {
          columns: [
              ['data1', 5870.55],
          ],
          type: 'bar'
      },
      bar: {
          width: {
              ratio: 0.5 // this makes bar width 50% of length between ticks
          }
          // or
          //width: 100 // this makes bar width 100px
      }
  });
  }

}
