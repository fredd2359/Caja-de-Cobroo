import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {AsignarCajaComponent} from './components/asignar-caja/asignar-caja.component';
import {CajasAsignadasComponent} from './components/asignar-caja/cajas-asignadas/cajas-asignadas.component';
import {CajasPendientesComponent} from './components/asignar-caja/cajas-pendientes/cajas-pendientes.component';

// import {AdminGuard} from '../services/admin.guard'
 
const adminRoutes: Routes=[
    {
        path: 'supervisor/asignar-caja',
        component: AsignarCajaComponent,
        // canActivate:[SupervisorGuard],
        children: [
            {path: '', component:CajasAsignadasComponent},
            {path: 'cajas-asignadas', component:CajasAsignadasComponent},
            {path: 'cajas-pendientes', component:CajasPendientesComponent},
            {path: '**', component:CajasAsignadasComponent}
        ]
    }
]; 

@NgModule({
    imports:[
        RouterModule.forChild(adminRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class SupervisorRoutingModule{}