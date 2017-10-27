import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

@Injectable()
export class AdminService {
    public url: string;
    data: any = null;
    identity;
    token;
    constructor(private _http: Http) {
        this.url = 'http://192.168.0.32:8080/api/';
    }
    //Codigo 200 exito
    //codigo 400 not found
    //codig 500 error interno (alguna de las razones puede ser por que se envia un dato incorrecto desde front)
    /**
     * -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
      /**EXTRAER SISTEMAS */
      getSistemas() {
        return this._http.get(this.url + 'sistemas/mostrar')
        .map((res: Response) => res.json());
      }
      /**TERMINA EXTRAER SISTEMAS */
      /**CARGAR SISTEMAS */
      altaSistemas(sistema){
        const params = JSON.stringify(sistema);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url+'sistemas/agregar', params, {headers: headers})
          .map((res: Response) => res.json());
      }
      /**TERMINA CARGAR SISTEMAS */
      /**BAJA DE SISTEMAS: sólo un sistema... */
      bajaSistema(sistemaa){
          const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
          return this._http.delete('http://192.168.0.32:8080/api/sistemas/eliminar/' + sistemaa.id, {headers: headers})
               .map((res: Response) => res.json());
           }
      /**TERMINA BAJA DE SISTEMAS */
      /**MODIFICACIÓN DE SISTEMAS */
      modificarSistema(sistemaMod){
        const params = JSON.stringify(sistemaMod);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put('http://192.168.0.32:8080/api/sistemas/editar/',params,{headers:headers})
          .map((res:Response) => res.json());
      }
      /**termina MODIFICACIÓN DE SISTEMAS */
      /**
       * ----------------------------------------------------------------TERMINAN LOS SERVICIOS DE SISTEMAS---------------------------------------------------------------------
       * 
       * ----------------------------------------------------------------INICIAN LOS SERVICIOS DE ROLES-------------------------------------------------------------------------
       */
      /**EXTRAER SISTEMAS */
      getRoles() {
        return this._http.get(this.url + '/rols/mostrar')
        .map((res: Response) => res.json());
      }
      /**TERMINA EXTRAER SISTEMAS */
      /**ALTA DE ROLES */
      altaRoles(roles){
        const params = JSON.stringify(roles);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url+'/rols/agregar/', params, {headers: headers})
          .map((res: Response) => res.json());
      }
      /**TERMINA ALTA DE ROLES */
      /**BAJA DE ROLES */
      bajaRoles(elrol){
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.delete('http://192.168.0.32:8080/api/rols/eliminar/' + elrol.id, {headers: headers})
             .map((res: Response) => res.json());
         }
      /**TERMINA BAJA DE ROLES */
      /**MODIFICAR EL ROL */
      modificarRoles(elrol){
        const params = JSON.stringify(elrol);
        console.log(params);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put('http://192.168.0.32:8080/api/rols/editar/',params,{headers:headers})
          .map((res:Response) => res.json());
      }
      /**TERMINA MODIFICAR EL ROL */
    

      /**
       * -----------------------------------------------------------------TERMINAN LOS SERVICIOS DE ROLES-----------------------------------------------------------------------
       */
}