import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {SupervisorService} from './supervisor.service';


import { CajasPendientesComponent } from './components/asignar-caja/cajas-pendientes/cajas-pendientes.component';
import { CajasAsignadasComponent } from './components/asignar-caja/cajas-asignadas/cajas-asignadas.component';
import {SupervisorRoutingModule} from './supervisor.routing';
 
@NgModule ({
    declarations:[
        CajasPendientesComponent,
        CajasAsignadasComponent
],
    imports:[
        CommonModule,
        FormsModule,
        HttpModule,
        SupervisorRoutingModule
    ],
    exports:[
        CajasPendientesComponent,
        CajasAsignadasComponent
    ],
    providers:[
        SupervisorService
        // SuperGuard
    ]
})

export class SupervisorModule { }