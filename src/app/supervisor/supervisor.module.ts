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
import { HistorialPagoComponent } from './components/historial-pago/historial-pago.component';
import { HistorialValeComponent } from './components/historial-vale/historial-vale.component';

@NgModule ({
    declarations:[
        MainComponent,
        FoliosComponent,
        SeriesComponent,
        AltaPagoComponent,
        AltaValeComponent,
        AltasBajasFolioPagoComponent,
        AltasBajasFolioValeComponent,
        HistorialPagoComponent,
        HistorialValeComponent,
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
        HistorialPagoComponent,
        HistorialValeComponent
    ],
    providers:[
        SupervisorService
        // SuperGuard
    ]
})

export class SupervisorModule { }