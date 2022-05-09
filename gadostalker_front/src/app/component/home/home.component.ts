import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  catalogo = ['Leite', 'Mel', 'Milho', 'Alface', 'Feijão', 'Soja', 'Vagem', 'Tomate'];
  constructor() { }

  ngOnInit(): void {
  }

}
