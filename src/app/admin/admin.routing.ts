
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

/**LOS MCOMPONENTES */
import { SistemasComponent } from './components/sistemas/sistemas.component';
import { RolesComponent } from './components/roles/roles.component';
import { PersonalComponent } from './components/personal/personal.component';

/**COMPONENTES CHILD DE ... */


/**COMPONENTES CHILD DE ... */


// import {AdminGuard} from '../services/admin.guard'
  
const adminRoutes: Routes=[
    {
        path: 'administradores',
        component: MainComponent,
        // canActivate:[SupervisorGuard],
        children: [
            {path: '', component:MainComponent},
            {path: 'sistemas', component:SistemasComponent},
            {path: 'roles', component:RolesComponent},
            {path: 'personal', component:PersonalComponent},
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

export class AdminRoutingModule{}