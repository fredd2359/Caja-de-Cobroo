import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AsignarCajaComponent } from './components/asignar-caja/asignar-caja.component';
import { DesasignarCajaComponent } from './components/desasignar-caja/desasignar-caja.component';
import { MainComponent } from './components/main/main.component';
import { FoliosComponent } from './components/folios/folios.component';
import { SeriesComponent } from './components/series/series.component';

/**MODULOS CHILD DE SERIES */
import { AltaPagoComponent } from './components/series/altapago/altapago.component';
import { AltaValeComponent } from './components/series/altavale/altavale.component';

/**MODULOS CHILD DE FOLIO */
import { AltasBajasFolioPagoComponent } from './components/folios/altas-bajas-folio-pago/altas-bajas-folio-pago.component';
import { AltasBajasFolioValeComponent } from './components/folios/altas-bajas-folio-vale/altas-bajas-folio-vale.component';
  
import { AsignarFolioPagoComponent } from './components/asignar-folio-pago/asignar-folio-pago.component';
// import { AsignarFolioValeComponent } from './components/asignar-folio-vale/asignar-folio-vale.component';
import { DesasignarFolioValeComponent } from './components/desasignar-folio-vale/desasignar-folio-vale.component';
import { DesasignarFolioPagoComponent } from './components/desasignar-folio-pago/desasignar-folio-pago.component';
import { HistorialValeComponent } from './components/historial-vale/historial-vale.component';
import {AsignarFondoComponent} from './components/asignar-fondo/asignar-fondo.component';
import {DevolucionFondoComponent} from './components/devolucion-fondo/devolucion-fondo.component';
// import {AdminGuard} from '../services/admin.guard'
  
const adminRoutes: Routes=[
    {
        path: 'supervisor',
        component: MainComponent,
        // canActivate:[SupervisorGuard],
        children: [
            {path: '', component:MainComponent},
            {path: 'asignar-caja', component:AsignarCajaComponent},
            {path: 'asignar-fondo', component:AsignarFondoComponent},
            {path: 'devolucion-fondo', component:DevolucionFondoComponent},
            {path: 'desasignar-caja', component:DesasignarCajaComponent},
            {path: 'folios', component:FoliosComponent},
            
            {path: 'series', component:SeriesComponent},
            {path: 'alta-pago', component:AltaPagoComponent},
            {path: 'alta-vale', component:AltaValeComponent},

            {path: 'asignar-folio-pago', component:AsignarFolioPagoComponent},
            // {path: 'asignar-folio-vale', component:AsignarFolioValeComponent},
            {path: 'desasignar-folio-pago', component:DesasignarFolioPagoComponent},
            {path: 'desasignar-folio-vale', component:DesasignarFolioValeComponent},
            {path: 'historial-vale', component:HistorialValeComponent},
            {path: 'altas-bajas-folio-pago', component:AltasBajasFolioPagoComponent},
            {path: 'altas-bajas-folio-vale', component:AltasBajasFolioValeComponent},
            {path: '**', component:MainComponent}
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