import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from '../app/component/login/login.component';
import { CriarContaComponent} from '../app/component/criar-conta/criar-conta.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'criar-conta', component: CriarContaComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
