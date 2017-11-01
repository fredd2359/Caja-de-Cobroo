import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

@Injectable()
export class SupervisorService {
    public url: string;
    data: any = null;
    identity;
    token;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }
    //Codigo 200 exito
    //codigo 400 not found
    //codig 500 error interno (alguna de las razones puede ser por que se envia un dato incorrecto desde front)
      getCaja(status) {
        return this._http.get(this.url + 'cajas/obtener/'+status)
        .map((res: Response) => res.json());
      }

      getCajero() {
        return this._http.get(this.url + 'cajeros/obtenerSinCaja/')
        .map((res: Response) => res.json());
      }

      getCajeroSinFondo() {
        return this._http.get(this.url + 'cajeros/obtenerSinFondo/')
        .map((res: Response) => res.json());
      }

      getCajeroConFondo() {
        return this._http.get(this.url + 'cajeros/obtenerConFondo/')
        .map((res: Response) => res.json());
      }
      getcajasCajeros() {
        return this._http.get(this.url + 'cajascajeros/')
        .map((res: Response) => res.json());
      }
      
      getallCajeros() {
        return this._http.get(this.url + 'cajeros/')
        .map((res: Response) => res.json());
      }
 
      getCajero2() {
        return this._http.get(this.url + 'cajeros')
        .map((res: Response) => res.json());
      }

      asignarCaja(cajero){
        const params = JSON.stringify(cajero);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'cajeros/asignarCaja', params, {headers: headers})
          .map((res: Response) => res.json());
      }

      desasignarCaja(cajero){
        const params = JSON.stringify(cajero);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'cajeros/desasignarCaja', params, {headers: headers})
          .map((res: Response) => res.json());
      }
      
      asignarFondo(cajer,usu,pass){
        const params = JSON.stringify(cajer);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'cajeros/asignarFondo', {cajero: cajer, usuario:usu, password:pass} , {headers: headers})
          .map((res: Response) => res.json());
      }

      devolverFondo(cajer,usu,pass){
        const params = JSON.stringify(cajer);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'cajeros/devolverFondo', {cajero: cajer, usuario:usu, password:pass} , {headers: headers})
          .map((res: Response) => res.json());
      }
      getFolioVale() {
        return this._http.get(this.url + 'folio-vales')
        .map((res: Response) => res.json());
      }
            
      /**23/10/2017 */
      altaFolioPago(folioinicial,cant,serie){
        const params = JSON.stringify(folioinicial);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url+'folio-recibos/agregar', {cantidad:cant,folioInicial:folioinicial,serieRecibo:serie}, {headers: headers})
          .map((res: Response) => res.json());
      }

      asignarFolioPago(foliopago){
        const params = JSON.stringify(foliopago);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'folio-recibos/asignar', params, {headers: headers})
          .map((res: Response) => res.json());
      }

      asignarFolioVales(foliovales){
        const params = JSON.stringify(foliovales);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'folio-vales/asignar', params, {headers: headers})
          .map((res: Response) => res.json());
      }
      
      desasignarFolioVales(foliovales){
        const params = JSON.stringify(foliovales);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'folio-vales/desasignar', params, {headers: headers})
          .map((res: Response) => res.json());
      }

      desasignarFolioPagos(foliopagos){
        const params = JSON.stringify(foliopagos);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'folio-recibos/desasignar', params, {headers: headers})
          .map((res: Response) => res.json());
      }

      altaFolioVale(folioinicial,cant,serie){
        const params = JSON.stringify(folioinicial);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url+'folio-vales/agregar', {cantidad:cant,folioInicial:folioinicial,serieVale:serie}, {headers: headers})
          .map((res: Response) => res.json());
      }
      
      altaSeriePago(serie){
        const params = JSON.stringify(serie);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url+'serie-recibos/agregar', params, {headers: headers})
          .map((res: Response) => res.json());
      }

      altaSerieVale(serie){
        const params = JSON.stringify(serie);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url+'serie-vales/agregar', params, {headers: headers})
          .map((res: Response) => res.json());
      }

      getSeriePago() {
        return this._http.get(this.url + 'serie-recibos/mostrar')
        .map((res: Response) => res.json());
      }

      getSerieVale() {
        return this._http.get(this.url + 'serie-vales/mostrar')
        .map((res: Response) => res.json());
      }

      getFolioPagos() {
        return this._http.get(this.url + 'folio-recibos/mostrar')
        .map((res: Response) => res.json());
      }

      getFolioVales() {
        return this._http.get(this.url + 'folio-vales/mostrar')
        .map((res: Response) => res.json());
      }  
      getFolioReciboporSerie(serie) {
        return this._http.get(this.url + 'serie-recibos/mostrarFolios/'+serie)
        .map((res: Response) => res.json());
      }
      getFolioValeporSerie(serie) {
        return this._http.get(this.url + 'serie-vales/mostrarFolios/'+serie)
        .map((res: Response) => res.json());
      }

      bajaFolioPago(folioPago){
        const params = JSON.stringify(folioPago);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url+'folio-recibo/agregar', params, {headers: headers})
          .map((res: Response) => res.json());
      } 

      eliminarFoliosPagos(folios){
        const params = JSON.stringify(folios);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'folio-recibos/eliminar', params, {headers: headers})
          .map((res: Response) => res.json());
      }
      eliminarFoliosVales(vales){
        const params = JSON.stringify(vales);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.post(this.url+'folio-vales/eliminar', params, {headers: headers})
          .map((res: Response) => res.json());
      }

      /**TERMINAN SERVICIOS DE SERIES */

      //A partir de aqui se tiene que borrar ↓↓↓↓↓↓↓
      
      // getCategorias() {
      //   return this._http.get(this.url + 'categoria/leer/')
      //                    .map((res: Response) => res.json());
      // }

      // getProducto(codigoo){
      //   const params = JSON.stringify(codigoo);
      //   console.log(params);
      //   const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
      //   return this._http.post(this.url + 'producto/buscar/', params, {headers: headers})
      //                    .map(res => res.json());
      // }

      // modificarCategoria(categoriaa) {
      //   const params = JSON.stringify(categoriaa);
      //   console.log(params);
      //   const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
      //   return this._http.put(this.url+'categoria/modificar', params, {headers: headers})
      //     .map((res: Response) => res.json());
      // }

      // eliminarCategoria(categoriaa) {
      //   const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
      //   return this._http.delete('http://192.168.0.29:8080/categoria/eliminar/' + categoriaa, {headers: headers})
      //     .map((res: Response) => res.json());
      // }
      

}