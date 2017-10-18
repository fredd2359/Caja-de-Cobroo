import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import {Caja} from '../../../../models/caja.model';
import {Cajero} from '../../../../models/cajero.model';

import {SupervisorService} from '../../../supervisor.service';

@Component({
  selector: 'app-cajas-pendientes',
  templateUrl: './cajas-pendientes.component.html',
  styleUrls: ['./cajas-pendientes.component.css']
})
export class CajasPendientesComponent implements OnInit {

  public caja:Caja;
  public cajas:Caja[];
  public cajero:Cajero;
  public cajeros:Cajero[];
  

  constructor(
    private _superService: SupervisorService /**Necesitamos el servicio */,
    private _route: ActivatedRoute,
    private _router: Router
  
  ) {
    this.cajas=new Array();
    this.cajeros=new Array();
  }

  ngOnInit() {
    console.log("entro a cajas pendietes");
    this._superService.getCaja("PENDIENTE").subscribe( 
      result =>{
        console.log(result);
        this.cajeros=result;
      },
      error => {
        console.log("Error en Init de cajas-pendientes");
        console.log(error);
      }
    );
  }

}
