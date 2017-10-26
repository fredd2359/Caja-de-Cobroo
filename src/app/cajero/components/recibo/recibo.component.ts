import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

//Se importan los models para su utilización
import {Folio} from '../../../models/folio.model';
import {Recibo} from '../../../models/Recibo.model';
import {Serie} from '../../../models/serie.model';

/**ESTE MISMO SERVICIO PARA DATATABLES... */
import { CajerosService } from '../../cajeros.service';

declare var jquery: any;
declare var $;

@Component({
  selector: 'asignar-caja',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
}) 
export class ReciboComponent implements OnInit {
  /**PROPIEDAD DONDE SE GUARDARÁN LOS DATOS OBTENIDOS CON GET */
  public recibo:Recibo;
  public recibos:Recibo[];
  public folio:Folio;
  public folios:Folio[];
  public serie:Serie;
  public series:Serie[]
  public title:string;

  constructor(
    public _cajeroService: CajerosService /**Necesitamos el servicio */,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.recibo=new Recibo(0,0,"","",null);
    this.recibos=new Array();
    this.folios=new Array();
    this.serie=new Serie(0,"","","","");
    this.recibos=new Array();
    }


  ngOnInit() {

    //Se cargan todo lo necesario para la vista
    this.cargarTodo();
  }
  onSubmit(){
  }

  cargarTodo() {
    //Se carga los recibos
    this._cajeroService.getRecibos().subscribe(
      result => {
        console.log("Recibos");
        this.recibos=result.respuesta;
        console.log(this.recibos);

        this.loadTable();
      },
      error => {
        console.log(error);
      }
    );


  }
  /**MÉTODO PARA RECARGAR/ALMACENAR LOS DATOS (JSON) EN LA TABLA */
  loadTable(): void {
    setTimeout(function () {
      $(function () {
        $('#tablaRecibos').DataTable();
      });
    }, 1000);
  }


}
