import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  catalogo = [
    { nome: 'Leite', enabled: false },
    { nome: 'Alface', enabled: true },
    { nome: 'Feijão', enabled: true },
    { nome: 'Soja', enabled: true },
    { nome: 'Mel', enabled: true },
    { nome: 'Vagem', enabled: true },
    { nome: 'Tomate', enabled: false },
    { nome: 'Leite', enabled: true },
    { nome: 'Leite', enabled: false },
    { nome: 'Leite', enabled: true },
    { nome: 'Alface', enabled: true },
    { nome: 'Feijão', enabled: true },
    { nome: 'Soja', enabled: true },
    { nome: 'Mel', enabled: false },
    { nome: 'Vagem', enabled: true },
    { nome: 'Tomate', enabled: true },
    { nome: 'Leite', enabled: true },
    { nome: 'Leite', enabled: true },
  ];

  constructor() {}

  ngOnInit(): void {}
}
