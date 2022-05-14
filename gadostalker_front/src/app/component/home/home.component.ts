import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  catalogo = ['Leite', 'Mel', 'Milho', 'Alface', 'Feijão', 'Soja', 'Vagem', 'Tomate'];
  usuario :any;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.usuario = this.localStorage.get('credenciais');
  }
  
  redirecionar(){
    this.router.navigate(['/area-produtor'])
  }

}
