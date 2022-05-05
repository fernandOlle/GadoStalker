import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  catalogo = [
    { nome: 'Feijão-3', enabled: false },
    { nome: 'Alface', enabled: true },
    { nome: 'Feijão', enabled: true },
    { nome: 'Soja', enabled: true },
    { nome: 'Feijão-0', enabled: false },
    { nome: 'Mel', enabled: true },
    { nome: 'Vagem', enabled: true },
    { nome: 'Tomate', enabled: false },
    { nome: 'Leite', enabled: true },
    { nome: 'Feijão-1', enabled: true },
    { nome: 'Alface', enabled: true },
    { nome: 'Feijão', enabled: true },
    { nome: 'Soja', enabled: true },
    { nome: 'Mel', enabled: false },
    { nome: 'Vagem', enabled: true },
    { nome: 'Tomate', enabled: true },
    { nome: 'Feijão-2', enabled: true },
    { nome: 'Leite', enabled: true },
  ];

  constructor() {}

  ngOnInit(): void {}
}
