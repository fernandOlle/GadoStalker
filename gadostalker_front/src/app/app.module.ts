import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CriarContaComponent } from './component/criar-conta/criar-conta.component';
import { RecuperarSenhaComponent } from './component/recuperar-senha/recuperar-senha.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AnunciosComponent } from './component/anuncios/anuncios.component';
import { AnuncioComponent } from './component/anuncio/anuncio.component';
import { AreaProdutorComponent } from './component/area-produtor/area-produtor.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FuncionariosComponent } from './component/funcionarios/funcionarios.component';
import { ModalFuncionariosComponent } from './component/funcionarios/components/modal-funcionarios/modal-funcionarios.component';
import { CatalogoComponent } from './component/catalogo/catalogo.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ListaProdutoComponent } from './component/catalogo/components/modal/lista-produto.component';
import { NovoProdutoComponent } from './component/catalogo/components/modal/novo-produto/novo-produto.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CriarContaComponent,
    RecuperarSenhaComponent,
    HomeComponent,
    AnunciosComponent,
    AnuncioComponent,
    AreaProdutorComponent,
    DashboardComponent,
    FuncionariosComponent,
    ModalFuncionariosComponent,
    CatalogoComponent,
    ListaProdutoComponent,
    NovoProdutoComponent,
    NovoProdutoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatToolbarModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
