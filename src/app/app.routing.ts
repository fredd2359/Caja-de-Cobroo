import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';

import {PrincipalComponent} from './principal/principal.component'
import {LoginComponent} from './login/login.component';
import {CajeroComponent} from './cajero/components/cajero.component';
import {ReciboComponent} from './cajero/components/recibo/recibo.component'

const appRoutes:Routes=[
    
    {path: '', component: PrincipalComponent},
    {path: 'login', component: LoginComponent},
    {path:'**',component: PrincipalComponent}

];

export const appRoutingProviders: any[]=[];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
