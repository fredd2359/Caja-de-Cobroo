import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {routing,appRoutingProviders} from './app.routing';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { AsignarCajaComponent } from './supervisor/components/asignar-caja/asignar-caja.component';
import { AsignarFondoComponent } from './supervisor/components/asignar-fondo/asignar-fondo.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AsignarCajaComponent,
    AsignarFondoComponent,
    PrincipalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
