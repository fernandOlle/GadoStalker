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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { CriarContaComponent } from './component/criar-conta/criar-conta.component';
import { RecuperarSenhaComponent } from './component/recuperar-senha/recuperar-senha.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCurrencyModule } from "ngx-currency";
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AnunciosComponent } from './component/anuncios/anuncios.component';
import { AnuncioComponent } from './component/anuncio/anuncio.component';
import { AreaProdutorComponent } from './component/area-produtor/area-produtor.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FuncionariosComponent } from './component/funcionarios/funcionarios.component';
import { ModalFuncionariosComponent } from './component/funcionarios/components/modal-funcionarios/modal-funcionarios.component';
import { ModalFuncionariosEditarComponent } from './component/funcionarios/components/modal-funcionarios-editar/modal-funcionarios-editar.component';
import { ModalConfirmacao } from './component/funcionarios/components/modal-funcionarios-editar/modal-funcionarios-editar.component';
import { FazendasComponent } from './component/fazendas/fazendas.component';
import { ModalCadastrarFazendaComponent } from './component/fazendas/components/modal-cadastrar-fazenda/modal-cadastrar-fazenda.component';
import { ModalDesignarFuncionarioComponent } from './component/funcionarios/components/modal-designar-funcionario/modal-designar-funcionario.component';
import { GerenciarAnunciosComponent } from './component/gerenciar-anuncios/gerenciar-anuncios.component';
import { ModalCriarAnuncioComponent } from './component/gerenciar-anuncios/components/modal-criar-anuncio/modal-criar-anuncio.component';
import { ModalEditarAnuncioComponent } from './component/gerenciar-anuncios/components/modal-editar-anuncio/modal-editar-anuncio.component';
import { ModalRegistrarVendaComponent } from './component/gerenciar-anuncios/components/modal-registrar-venda/modal-registrar-venda.component';
import { CatalogoComponent } from './component/catalogo/catalogo.component';
import { ListaProdutoComponent } from './component/catalogo/components/modal/lista-produto.component';
import { NovoProdutoComponent } from './component/catalogo/components/modal/novo-produto/novo-produto.component';
import { EditarProdutoComponent } from './component/catalogo/components/modal/editar-produto/editar-produto.component';
import { EditarUsuarioComponent } from './component/home/components/editar-usuario/editar-usuario.component';
import { ModalExcluirFazendaComponent } from './component/fazendas/components/modal-excluir-fazenda/modal-excluir-fazenda.component';
import {LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt, 'pt');
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
    ModalFuncionariosEditarComponent,
    ModalConfirmacao,
    FazendasComponent,
    ModalCadastrarFazendaComponent,
    ModalDesignarFuncionarioComponent,
    GerenciarAnunciosComponent,
    ModalCriarAnuncioComponent,
    ModalEditarAnuncioComponent,
    ModalRegistrarVendaComponent,
    CatalogoComponent,
    ListaProdutoComponent,
    NovoProdutoComponent,
    EditarProdutoComponent,
    EditarUsuarioComponent,
    ModalExcluirFazendaComponent
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
    MatDatepickerModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [
    {
        provide: LOCALE_ID,
        useValue: 'pt'
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
