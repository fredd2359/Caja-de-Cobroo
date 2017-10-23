import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

/**SERVICIO PRINCIPAL */
import {SupervisorService} from '../../../supervisor.service';
/**CARGAMOS EL MODELO */
import { SeriesVale } from '../models/seriesVale'
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'alta-pago',
    templateUrl: './altavale.component.html',
    styleUrls: ['./altavale.component.css']
})
export class AltaValeComponent implements OnInit
{
    public altaserie: SeriesVale; //Instanciamos el modelo para alta de serie en PAGOS
    //public altaserieVale: Series; //Instanciamos el modelo para alta de serie en VALES
    title :string;
    
    constructor(
        public _superService: SupervisorService /**Necesitamos el servicio */,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        /**Inicializamos el modelo SERIE */
        this.title = "Alta de Series en Vales";
        this.altaserie = new SeriesVale("","");
        //this.altaserieVale = new Series("","");
    }
    ngOnInit(){
       
      }
      onSubmit(){
        console.log("DATOS A CARGAR....");
        console.log(this.altaserie);
        /**COMPROBACIÓN DE RECIBIDO */
        this._superService.altadeSerie(this.altaserie).subscribe(
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
              //this.obtenerdatos();
              //this.LoadTableData();
            }
            else{
              //$("#example").dataTable().fnDestroy();
              //this.status="success";
              //this.obtenerdatos();
              //this.LoadTableData();
              console.log("TODO VA BIEN ...... ");
            }
            console.log("Error: EN SUBMIT DE ALTA DE SERIE...");
            $('#modalConfirmaReERR').modal('show');
            //console.log(error.status);
          }
        );
  }
      
}