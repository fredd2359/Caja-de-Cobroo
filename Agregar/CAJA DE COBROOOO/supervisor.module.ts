import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SupervisorService } from './supervisor.service';


import { CajasPendientesComponent } from './components/asignar-caja/cajas-pendientes/cajas-pendientes.component';
import { CajasAsignadasComponent } from './components/asignar-caja/cajas-asignadas/cajas-asignadas.component';
import { SupervisorRoutingModule } from './supervisor.routing';
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


@NgModule ({
    declarations:[
        CajasPendientesComponent,
        CajasAsignadasComponent,
        MainComponent,
        FoliosComponent,
        SeriesComponent,
        AltaPagoComponent,
        AltaValeComponent,
        AltaFolioComponent,
        BajaFolioComponent,
        AltaFolioValeComponent,
        BajaFolioValesComponent
],
    imports:[
        CommonModule,
        FormsModule,
        HttpModule,
        SupervisorRoutingModule
    ],
    exports:[
        CajasPendientesComponent,
        CajasAsignadasComponent,
        MainComponent,
        FoliosComponent,
        SeriesComponent,
        AltaPagoComponent,
        AltaValeComponent,
        AltaFolioComponent,
        BajaFolioComponent,
        AltaFolioValeComponent,
        BajaFolioValesComponent
    ],
    providers:[
        SupervisorService
        // SuperGuard
    ]
})

export class SupervisorModule { }