import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { CajasPendientesComponent } from './components/asignar-caja/cajas-pendientes/cajas-pendientes.component';
import { CajasAsignadasComponent } from './components/asignar-caja/cajas-asignadas/cajas-asignadas.component';
import {SupervisorRoutingModule} from './supervisor.routing';
import { FondoAsignadoComponent } from './components/asignar-fondo/fondo-asignado/fondo-asignado.component';

@NgModule ({
    declarations:[
        CajasPendientesComponent,
        CajasAsignadasComponent,
        FondoAsignadoComponent
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
        // SuperGuard
    ]
})

export class SupervisorModule { }