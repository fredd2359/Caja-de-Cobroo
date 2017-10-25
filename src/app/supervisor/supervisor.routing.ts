import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AsignarCajaComponent } from './components/asignar-caja/asignar-caja.component';
import { MainComponent } from './components/main/main.component';
import { FoliosComponent } from './components/folios/folios.component';
import { SeriesComponent } from './components/series/series.component';

/**MODULOS CHILD DE SERIES */
import { AltaPagoComponent } from './components/series/altapago/altapago.component';
import { AltaValeComponent } from './components/series/altavale/altavale.component';

/**MODULOS CHILD DE FOLIO */
import { AltasBajasFolioPagoComponent } from './components/folios/altas-bajas-folio-pago/altas-bajas-folio-pago.component';
import { AltasBajasFolioValeComponent } from './components/folios/altas-bajas-folio-vale/altas-bajas-folio-vale.component';
  
import { HistorialPagoComponent } from './components/historial-pago/historial-pago.component';
// import {AdminGuard} from '../services/admin.guard'
  
const adminRoutes: Routes=[
    {
        path: 'supervisor',
        component: MainComponent,
        // canActivate:[SupervisorGuard],
        children: [
            {path: '', component:MainComponent},
            {path: 'asignar-caja', component:AsignarCajaComponent},
            {path: 'folios', component:FoliosComponent},
            
            {path: 'series', component:SeriesComponent},
            {path: 'alta-pago', component:AltaPagoComponent},
            {path: 'alta-vale', component:AltaValeComponent},

            {path: 'historial-pago', component:HistorialPagoComponent},
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