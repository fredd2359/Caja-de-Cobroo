import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

@Injectable()
export class CajerosService {
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
      getRecibos() {
        return this._http.get(this.url + 'recibos')
        .map((res: Response) => res.json());
      }

      eliminarRecibo(recibo){
        const params = JSON.stringify(recibo);
        const headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        return this._http.put(this.url+'recibos/cancelar', params, {headers: headers})
          .map((res: Response) => res.json());
      }


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