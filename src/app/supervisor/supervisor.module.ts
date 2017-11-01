import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {SupervisorService} from './supervisor.service';


import {SupervisorRoutingModule} from './supervisor.routing';
import {MainComponent} from './components/main/main.component';
import {FoliosComponent} from './components/folios/folios.component';
import { AltasBajasFolioValeComponent } from './components/folios/altas-bajas-folio-vale/altas-bajas-folio-vale.component';
import { AltasBajasFolioPagoComponent } from './components/folios/altas-bajas-folio-pago/altas-bajas-folio-pago.component';
 
import { SeriesComponent } from './components/series/series.component';

/**MODULOS CHILD DE SERIES */
import { AltaPagoComponent } from './components/series/altapago/altapago.component';
import { AltaValeComponent } from './components/series/altavale/altavale.component';
import { AsignarFolioPagoComponent } from './components/asignar-folio-pago/asignar-folio-pago.component';
// import { AsignarFolioValeComponent } from './components/asignar-folio-vale/asignar-folio-vale.component';
import { DesasignarFolioValeComponent } from './components/desasignar-folio-vale/desasignar-folio-vale.component';
import { DesasignarFolioPagoComponent } from './components/desasignar-folio-pago/desasignar-folio-pago.component';
import { HistorialValeComponent } from './components/historial-vale/historial-vale.component';
import { DesasignarCajaComponent } from './components/desasignar-caja/desasignar-caja.component';
import { AsignarFondoComponent } from './components/asignar-fondo/asignar-fondo.component';
import { DevolucionFondoComponent } from './components/devolucion-fondo/devolucion-fondo.component';

@NgModule ({
    declarations:[
        MainComponent,
        FoliosComponent,
        SeriesComponent,
        AltaPagoComponent,
        AltaValeComponent,
        AltasBajasFolioPagoComponent,
        AltasBajasFolioValeComponent,
        AsignarFolioPagoComponent,
        HistorialValeComponent,
        DesasignarCajaComponent,
        AsignarFondoComponent,
        DevolucionFondoComponent,
        DesasignarFolioValeComponent,
        DesasignarFolioPagoComponent
],
    imports:[ 
        CommonModule,
        FormsModule,
        HttpModule,
        SupervisorRoutingModule
    ],
    exports:[
        MainComponent,
        FoliosComponent,
        SeriesComponent,
        AltaPagoComponent,
        AltaValeComponent,
        AltasBajasFolioPagoComponent,
        AltasBajasFolioValeComponent,
        AsignarFolioPagoComponent,
        HistorialValeComponent,
        AsignarFondoComponent,
        DevolucionFondoComponent,
        DesasignarFolioValeComponent,
        DesasignarFolioPagoComponent
    ],
    providers:[
        SupervisorService
        // SuperGuard
    ]
})

export class SupervisorModule { }