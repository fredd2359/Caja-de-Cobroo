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
    this.cajas=new Array();
    this.cajeros=new Array();
  }

  ngOnInit() {
    console.log("Entro a cajas asignadas");
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
