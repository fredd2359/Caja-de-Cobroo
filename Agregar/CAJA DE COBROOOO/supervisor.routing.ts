import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AsignarCajaComponent } from './components/asignar-caja/asignar-caja.component';
import { CajasAsignadasComponent } from './components/asignar-caja/cajas-asignadas/cajas-asignadas.component';
import { CajasPendientesComponent } from './components/asignar-caja/cajas-pendientes/cajas-pendientes.component';
import { MainComponent } from './components/main/main.component';
import { FoliosComponent } from './components/folios/folios.component';
import { SeriesComponent } from './components/series/series.component';

/**MODULOS CHILD DE SERIES */
import { AltaPagoComponent } from './components/series/altapago/altapago.component';
import { AltaValeComponent } from './components/series/altavale/altavale.component';

/**MODULOS CHILD DE FOLIO */
import { AltaFolioComponent } from './components/folios/altapago/alta-folio-pago.component';
import { BajaFolioComponent } from './components/folios/bajafoliopago/baja-folio-pago.component';
import { AltaFolioValeComponent } from './components/folios/altafoliovale/alta-folio-vale.component';
import { BajaFolioValesComponent } from './components/folios/bajafoliovale/baja-folio-vale.component';

// import {AdminGuard} from '../services/admin.guard'
 
const adminRoutes: Routes=[
    {
        path: 'supervisor',
        component: MainComponent,
        // canActivate:[SupervisorGuard],
        children: [
            {path: '', redirectTo:'asignar-caja', pathMatch:'full'},
            {path: 'asignar-caja', component:AsignarCajaComponent},
            {path: 'folios', component:FoliosComponent},
            
            {path: 'series', component:SeriesComponent},
            {path: 'alta-pago', component:AltaPagoComponent},
            {path: 'alta-vale', component:AltaValeComponent},

            {path: 'alta-folio-pago', component:AltaFolioComponent},
            {path: 'baja-folio-pago', component:BajaFolioComponent},
            {path: 'alta-folio-vale', component:AltaFolioValeComponent},
            {path: 'baja-folio-vale', component:BajaFolioValesComponent},
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