import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
/**para formularios, importamos ... */
import { FormsModule } from '@angular/forms';
/**IMPORTAMOS EL ARCHIVO DE CONFIGURACIÓN DE RUTAS DE ESTE COMPONENTE... 
 * Es decir, el mismo archivo que se encuentra en este directorio que contiene las,
 * configuraciones de rutas...
*/
import { CajerosRoutingModule } from './cajero.routing';     //PENDIENTE DE ASIGNAR CLASE...
/**IMPORTACIÓN DE COMPONENTES... */
/**COMPONENTE DE USUARIO 
 * Es decir el nombre de la CLASE EXPORTADA en el COMPONENTE principal de este directorio.
*/
import { CajerosComponent } from './components/cajero.component'; 
/**COMPONENTE LOGIN y registro DE USUARIOS */
//import { LoginUserComponent } from './login/login-user.component';
//import { RegistroUserComponent } from './register/registro-user.component';

/**SERVICES */
//import { AdminGuard } from '../services/admin.guards';
@NgModule({
  declarations: [
    CajerosComponent, //ESTE ES EL COMPONENTE PRINCIPAL DE LOS USUARIOS
    //LoginUserComponent, //COMPONENTE DE LOGIN PARA USUARIOS NORMALES...
    //RegistroUserComponent //EL COMPONENTE DE REGISTRO PARA USUARIOS
  ],
  imports: [
      //routing, /**CARGAMOS EL FICHERO DE CONFIGURACIÓN DE RUTAS */
      BrowserModule,
      FormsModule,
      CajerosRoutingModule, //RUTAS DE ESTE COMPONENTE
      CommonModule,
      HttpModule
  ],
  providers: [
    //appRoutingProviders
    //AdminGuard
], /**appRoutingProviders..  para que funcionen las rutas especificadas en admin.routing*/

})
export class CajerosModule { } /**ESTE ES EL MÓDULO PRINCIPAL DE ESTE COMPONENTE, DEBEMOS EXPORTARLO A ..
APP.MODULE.TS, QUE REPRESENTA EL MODULO PRINCIPAL DE ESTA APP */
