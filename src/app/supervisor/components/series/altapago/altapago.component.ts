import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

/**SERVICIO PRINCIPAL */
import {SupervisorService} from '../../../supervisor.service';
import {Serie} from '../../../../models/serie.model';

/**CARGAMOS EL MODELO */  
/**TERMINA CARGA DE MODELOS */

declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'alta-pago',
    templateUrl: './altapago.component.html',
    styleUrls: ['./altapago.component.css']
})
export class AltaPagoComponent implements OnInit
{
    public altaserie: Serie; //Instanciamos el modelo para alta de serie en PAGOS
    //public altaserieVale: Series; //Instanciamos el modelo para alta de serie en VALES
    title :string;
    title2:string;
    public altaseries:Serie[];
    constructor(
        public _superService: SupervisorService /**Necesitamos el servicio */,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        /**Inicializamos el modelo SERIE */
        this.title = "Alta de Series en Pago";
        this.title2 = "Alta de Series en Vales";
        this.altaserie = new Serie(0,"","","","");
        //this.altaserieVale = new Series("","");
        this.altaseries = new Array();
    }
    ngOnInit(){
      }
      onSubmit(){
          console.log("DATOS A CARGAR....");
          this.altaserie.estatus="ACTIVO";
          this.altaserie.fechaAlta="";
          this.altaseries.push(this.altaserie);
          console.log(JSON.stringify(this.altaseries));
          /**COMPROBACIÓN DE RECIBIDO */
          this._superService.altaSeriePago(this.altaseries).subscribe(
            result =>{
              console.log("SE HA REGISTRADO CON ÉXITO");
              console.log(result);
              /**MODAL DE ÉXITO */
              $('#modalConfirmaRe').modal('show');
              //$("#example").dataTable().fnDestroy();
              //this.obtenerdatos();
              //this.LoadTableData();
            },
            error =>{
              if (error.status=="400"){
                  console.log("ERROR: NO SE ENCUENTRA FUENTE.");
                  console.log(error);
                //$("#example").dataTable().fnDestroy();
                //This.status="error";
            $('#modalConfirmaReERR').modal('show');
                //this.obtenerdatos();
                //this.LoadTableData();
            this.altaseries=new Array();
            this.altaserie=new Serie(0,"","","","");
              }
              else if (error.status=="500"){
                console.log("No se agregó");
                $('#modalConfirmaReERR').modal('show');
              }
              else {
                //$("#example").dataTable().fnDestroy();
                //this.status="success";
                //this.obtenerdatos();
                //this.LoadTableData();
                console.log(error);
                console.log("TODO VA BIEN ...... ");
                $('#modalConfirmaRe').modal('show');
                this.altaseries=new Array();
                this.altaserie=new Serie(0,"","","","");
              }
              //console.log(error.status);
            }
          );
    }
}