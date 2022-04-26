import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './pages/login/login.component';
import { CustomMaterialModule }  from './core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContratoComponent } from './pages/contrato/contrato.component';
import { BoletoComponent } from './pages/boleto/boleto.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    ContratoComponent,
    BoletoComponent
  ],
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,
    MatButtonModule,
    CustomMaterialModule,   
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {  
}
