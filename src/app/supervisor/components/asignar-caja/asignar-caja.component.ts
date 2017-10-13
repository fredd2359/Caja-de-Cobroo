import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import {Caja} from '../../../models/caja.model';
import {Cajero} from '../../../models/cajero.model';

import {SupervisorService} from '../../supervisor.service';

@Component({
  selector: 'asignar-caja',
  templateUrl: './asignar-caja.component.html',
  styleUrls: ['./asignar-caja.component.css']
})
export class AsignarCajaComponent implements OnInit {

  public caja:Caja;
  public cajas;
  public cajero:Cajero;
  public cajeros;

  constructor(
    private _superService: SupervisorService /**Necesitamos el servicio */,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.caja=new Caja();
    this.cajas=new Array();

    this.cajero=new Cajero();
    this.cajeros=new Array();
  }

  ngOnInit() {
    //Se hace la petición de las cajas que están libres
    this._superService.getCaja("Libre").subscribe(
      result => {
        console.log(JSON.stringify(result));
        this.cajas=result;
      },
      error => {
        console.log("Error en Init de asignar caja, getCaja");
        console.log(error);
      }
    );

    //Se hace la peticion para los cajeros que estan libres
    this._superService.getCajero().subscribe(
      result => {
        console.log(JSON.stringify(result));
        this.cajeros=result;
      },
      error => {
        console.log("Error en Init de asignar caja, getCajero");
        console.log(error);
      }
    );
  }

  onSubmit(){
    this.caja.estatus="PENDIENTE";
    this.cajero.caja.push(this.caja);
    console.log(JSON.stringify(this.cajero));
    this._superService.asignarCaja(this.cajero).subscribe(
      result =>{
        console.log("Se envio con éxito");
      },
      error =>{
        console.log("Error en Submit de asignar caja, asignarCaja");
        console.log(error);
      }
    );
  }

}
