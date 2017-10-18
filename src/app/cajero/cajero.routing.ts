import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**IMPORTACIÓN DE COMPONENTES... */
/**COMPONENTE DE CAJEROS */
import { CajerosComponent } from './components/cajero.component';
/**COMPONENTE DE LOGIN Y REGISTRO DE ADMINISTRADOR... */
//import { LoginUserComponent } from './login/login-user.component';
//import { RegistroUserComponent } from './register/registro-user.component';

/**Guard */
//import { AdminGuard } from '../services/admin.guards';


/**Las variables o propiedades constantes, siempre tienen el mismo valor... */
const usersRoutes: Routes = [
    {
        path: 'cajas', 
        component: CajerosComponent,
        //canActivate: [AdminGuard],
        children:[ //Aquí se pueden crear más rutas para los componentes que dependen de CAJAS.
            { path: '', redirectTo: 'Index-Caja', pathMatch: 'full'},
            { path: 'Index-Caja', component: CajerosComponent} 
            //{ path: 'registro', component: RegistroUserComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(usersRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CajerosRoutingModule { }