import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

/**SERVICIO */
import { AdminService } from './admin.service';

/**IMPORTAMOS LAS RUTAS */
import { AdminRoutingModule } from './admin.routing';

import { MainComponent } from './components/main/main.component';
import { SistemasComponent } from './components/sistemas/sistemas.component';
import { RolesComponent } from './components/roles/roles.component';
import { PersonalComponent } from './components/personal/personal.component';
 

/**MODULOS CHILD DE SERIES */

//import { EqualValidatorDirective } from '../directives/equal-validator.directive'; /**ESTA DIRECIVA ES PARA VALIDAD UNA CONTRASEÑA */

@NgModule ({
    declarations:[
        MainComponent,
        SistemasComponent,
        RolesComponent,
        PersonalComponent
        //EqualValidatorDirective
],
    imports:[
        CommonModule,
        FormsModule,
        HttpModule,
        AdminRoutingModule
    ],
    exports:[
        MainComponent,
        SistemasComponent,
        RolesComponent
    ],
    providers:[
        AdminService

        // SuperGuard
    ]
})

export class AdminModule { }