import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import {Caja} from '../../../../models/caja.model';
import {Cajero} from '../../../../models/cajero.model';

import {SupervisorService} from '../../../supervisor.service';

@Component({
  selector: 'cajas-asignadas',
  templateUrl: './cajas-asignadas.component.html',
  styleUrls: ['./cajas-asignadas.component.css']
})
export class CajasAsignadasComponent implements OnInit {

  public caja:Caja;
  public cajas:Caja[];
  public cajero:Cajero;
  public cajeros:Cajero[];

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
    this._superService.getCaja("OCUPADA").subscribe( 
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
