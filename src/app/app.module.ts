import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {routing,appRoutingProviders} from './app.routing';
import {HttpModule} from '@angular/http';

import {SupervisorModule} from './supervisor/supervisor.module';
import {CajerosModule} from './cajero/cajero.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { AsignarCajaComponent } from './supervisor/components/asignar-caja/asignar-caja.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    AsignarCajaComponent,
    PrincipalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    SupervisorModule,
    CajerosModule,
    DataTablesModule,
    AdminModule /**Modulo admin 26/10/2017 */
    
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
