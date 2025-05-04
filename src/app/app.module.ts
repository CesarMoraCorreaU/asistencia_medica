import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';

import { routes } from './app.routes';  // Importación de las rutas definidas
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    CardComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,           // Proporciona CommonModule de forma implícita
    HttpClientModule,        // Para hacer peticiones HTTP
    FormsModule,             // Soporte para formularios basados en plantilla
    ReactiveFormsModule,     // Soporte para formularios reactivos
    RouterModule.forRoot(routes)  // Configura las rutas para el enrutamiento
  ],
  providers: [
    AuthService,  // Servicio de autenticación
    ApiService,   // Servicio para realizar peticiones API
    AuthGuard     // Guard de autenticación para proteger rutas
  ],
  bootstrap: [AppComponent]  // Componente de arranque de la aplicación
})
export class AppModule { }