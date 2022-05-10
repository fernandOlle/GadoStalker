import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {
  catalogo = [
    {image: 'Feijão-0',
     title: 'Feijão Carioca',
     preco: 'R$ 3,99/KG'},
     {image: 'Feijão-1',
     title: 'Feijão Branco',
     preco: 'R$ 4,00/KG'},
     {image: 'Feijão-2',
     title: 'Feijão Preto',
     preco: 'R$ 4,05/KG'},
     {image: 'Feijão-3',
     title: 'Feijão Vermelho',
     preco: 'R$ 4,55/KG'},
     {image: 'Feijão-1',
     title: 'Feijão Branco',
     preco: 'R$ 4,65/KG'},
     {image: 'Feijão-0',
     title: 'Feijão Carioca',
     preco: 'R$ 4,70/KG'},
     {image: 'Feijão-3',
     title: 'Feijão Vermelho',
     preco: 'R$ 5,00/KG'},
     {image: 'Feijão-2',
     title: 'Feijão Preto',
     preco: 'R$ 5,20/KG'},

  ];
  selectedValue = '0';
  constructor() { }

  ngOnInit(): void {
  }

}
