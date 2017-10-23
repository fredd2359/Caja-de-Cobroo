import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**IMPORTACIÓN DE COMPONENTES... */
/**COMPONENTE DE CAJEROS */
import { CajeroComponent } from './components/cajero.component';
/**COMPONENTE DE LOGIN Y REGISTRO DE ADMINISTRADOR... */
//import { LoginUserComponent } from './login/login-user.component';
//import { RegistroUserComponent } from './register/registro-user.component';
/**COMPONENTE DE PRUEBA */
import { ReciboComponent } from './components/recibo/recibo.component';

/**Guard */
//import { AdminGuard } from '../services/admin.guards';


/**Las variables o propiedades constantes, siempre tienen el mismo valor... */
const usersRoutes: Routes = [
    // {
    //     path: 'cajero', 
    //     component: CajeroComponent,
    //     //canActivate: [AdminGuard],
    //     children:[ //Aquí se pueden crear más rutas para los componentes que dependen de CAJAS.
    //         { path: '', component: CajeroComponent},
    //         { path: 'apertura-caja', component: CajeroComponent}, 
    //         { path: 'recibos', component: ReciboComponent}
    //     ]
    // },
    {
        path: 'cajero/recibos', 
        component: ReciboComponent,
        //canActivate: [AdminGuard],
        children:[ //Aquí se pueden crear más rutas para l
            { path: '', component: ReciboComponent},
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