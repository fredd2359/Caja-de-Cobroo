import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';

import {PrincipalComponent} from './principal/principal.component'
import {LoginComponent} from './login/login.component';
import {AsignarCajaComponent} from './supervisor/components/asignar-caja/asignar-caja.component';
import {AsignarFondoComponent} from './supervisor/components/asignar-fondo/asignar-fondo.component';

const appRoutes:Routes=[
    
    {path: '', component: PrincipalComponent},
    {path: 'login', component: LoginComponent},
    {path:'**',component: PrincipalComponent}

];

export const appRoutingProviders: any[]=[];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
