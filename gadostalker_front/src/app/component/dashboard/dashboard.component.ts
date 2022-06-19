import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/local-storage.service';
import * as c3 from 'c3';

const ARROW_RIGHT_ICON = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
`;
const ARROW_LEFT_ICON = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
  </svg>
`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalSales: any;
  usuario: any;
  credenciais: any;
  totals: any = {}; //topZter
  salesPercentage: any = [];
  salesPercentageResult: any = [];
  cpf: any;
  constructor(
    private api: ApiService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private localStorage: LocalStorageService
  ) {
    this.usuario = this.localStorage.get('credenciais');

    iconRegistry.addSvgIconLiteral(
      'arrow-right',
      sanitizer.bypassSecurityTrustHtml(ARROW_RIGHT_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'arrow-left',
      sanitizer.bypassSecurityTrustHtml(ARROW_LEFT_ICON)
    );
  }
  year: any = [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ];
  arrayNf = ['Lucro obtido'];
  arrayQtd = ['Número de vendas'];
  arrayLG = [''];

  ngOnInit(): void {
    this.consoleFunc();

    this.credenciais = this.localStorage.get('credenciais');
    if(this.credenciais.tipoUsuario == 'FUNCIONARIO'){
      this.cpf = this.credenciais.cpfPatrao;
    }else{
      this.cpf = this.credenciais.cpf;
    }
    this.getInfosDashboard(this.cpf);
    this.geraGraficoPizza(this.cpf);
    this.montaGraficoNF(this.year, this.arrayNf);
    this.numVendasUltimosMeses(this.cpf, 12);
    this.lucroVendasUltimosMeses(this.cpf, 12);
    this.montaGraficoQuantidadeVendas(this.year, this.arrayQtd);
    this.lucroGeralByCpf(this.cpf);
  }

  getInfosDashboard(cpf: any) {
    this.api.getInfosDashboard(cpf).subscribe((ret) => {
      if (ret) {
        this.totals = ret;
      }
    });
  }

  consoleFunc() {
    const currentMonth = new Date().getMonth();

    for (let i = 0; i <= currentMonth; i++) {
      const lastMonth = this.year.pop(-1);
      this.year = [lastMonth, ...this.year];
    }

    console.log(this.year); // 2019
    this.year = ['x', ...this.year];
  }

  geraGraficoPizza(cpf: any) {
    this.api.geraGraficoPizza(cpf).subscribe((ret) => {
      if (ret) {
        this.salesPercentage = ret;
        this.salesPercentage.forEach((sale: any) => {
          this.salesPercentageResult = [
            ...this.salesPercentageResult,
            [sale.produto, sale.vendas],
          ];
          this.montaGraficoVendasPorProduto();
        });
      }
    });
  }

  numVendasUltimosMeses(numeroMes: any, cpf: any) {
    this.api.numVendasUltimosMeses(numeroMes, cpf).subscribe((ret: any) => {
      if (ret) {
        this.arrayQtd = [...this.arrayQtd, ...ret];
        this.montaGraficoQuantidadeVendas(this.year, this.arrayQtd);
      }
    });
  }

  lucroVendasUltimosMeses(numeroMes: any, cpf: any) {
    this.api.lucroVendasUltimosMeses(numeroMes, cpf).subscribe((ret: any) => {
      if (ret) {
        this.arrayNf = [...this.arrayNf, ...ret];
        this.montaGraficoNF(this.year, this.arrayNf);
      }
    });
  }

  lucroGeralByCpf(cpf: any) {
    this.api.lucroGeralByCpf(cpf).subscribe((ret: any) => {
      if (ret) {
        this.arrayLG = [...this.arrayLG, ret];
        console.log(this.arrayLG);
        this.montaGraficoLucroGeral(this.arrayLG);
      } else{
        this.arrayLG = [];
      }
    });
  }

  montaGraficoNF(col_x: any, arrayNF: any) {
    let tickPC = {
      tick: {
        format: (y: {
          toLocaleString: (
            arg0: string,
            arg1: { style: string; currency: string }
          ) => any;
        }) => {
          return y.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
        },
      },
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
        hide: true,
      },
      color: {
        pattern: ['#3ca63c'],
      },
      axis: {
        x: {
          type: 'category',
          tick: {},
        },
        y: tickPC,
      },
    });
  }

  montaGraficoQuantidadeVendas(col_x: any, arrayNF: any) {
    let tickPC = {
      tick: {
        format: (y: any = {}) => {
          return y;
        },
      },
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
        hide: true,
      },
      color: {
        pattern: ['#594A3C'],
      },
      axis: {
        x: {
          type: 'category',
          tick: {},
        },
        y: tickPC,
      },
    });
  }

  montaGraficoLucroGeral(arrayLG: any) {
    let tickPC = {
      tick: {
        format: (y: {
          toLocaleString: (
            arg0: string,
            arg1: { style: string; currency: string }
          ) => any;
        }) => {
          return y.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
        },
      },
    };

    const xLabel = 'R$ ' + arrayLG[1].toString();

    var chart = c3.generate({
      bindto: '#chart_lucroGeral',
      size: {
        height: 250,
      },
      data: {
        x: 'x',
        columns: [['x', xLabel], arrayLG],
        type: 'bar',
      },
      bar: {
        width: {
          ratio: 0.1, // this makes bar width 50% of length between ticks
        },
        // or
        //width: 100 // this makes bar width 100px
      },
      legend: {
        hide: true,
      },
      color: {
        pattern: ['#D9D48F'],
      },
      axis: {
        x: {
          type: 'category',
          tick: {},
        },
        y: tickPC,
      },
    });
  }

  montaGraficoVendasPorProduto() {
    let tickPC = {
      tick: {
        format: (y: {
          toLocaleString: (
            arg0: string,
            arg1: { style: string; currency: string }
          ) => any;
        }) => {
          return y.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
        },
      },
    };

    var chart = c3.generate({
      bindto: '#chart_vendasProduto',
      size: {
        height: 250,
      },
      data: {
        // iris data from R
        columns: [...this.salesPercentageResult],

        type: 'pie',
      },
    });
  }
}
