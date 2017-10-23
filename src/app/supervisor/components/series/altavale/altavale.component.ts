import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

/**SERVICIO PRINCIPAL */
import {SupervisorService} from '../../../supervisor.service';
import {Serie} from '../../../../models/serie.model';
/**CARGAMOS EL MODELO */
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'alta-pago', 
    templateUrl: './altavale.component.html',
    styleUrls: ['./altavale.component.css']
})
export class AltaValeComponent implements OnInit
{
    public altaserie: Serie; //Instanciamos el modelo para alta de serie en PAGOS
    //public altaserieVale: Series; //Instanciamos el modelo para alta de serie en VALES
    title :string;
    public altaseries:Serie[];
    
    constructor(
        public _superService: SupervisorService /**Necesitamos el servicio */,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        /**Inicializamos el modelo SERIE */
        this.altaserie = new Serie(0,"","","","");
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
        /**COMPROBACIÓN DE RECIBDO */
        this._superService.altaSerieVale(this.altaseries).subscribe(
          result =>{
            console.log("SE HA REGISTRADO CON ÉXITO");
            console.log(result);
            /**MODAL DE ÉXITO */
            $('#modalConfirmaRe').modal('show');
            //$("#example").dataTable().fnDestroy();  
            //this.obtenerdatos();
            //this.LoadTableData();
            this.altaseries=new Array();
            this.altaserie=new Serie(0,"","","","");
          },
          error =>{
            console.log(error);
            if (error.status=="400"){
                console.log("ERROR: NO SE ENCUENTRA FUENTE.");
                console.log(error);
              //$("#example").dataTable().fnDestroy();
              //This.status="error";
              //this.obtenerdatos();
            $('#modalConfirmaReERR').modal('show');
              //this.LoadTableData();
            this.altaseries=new Array();
            this.altaserie=new Serie(0,"","","","");
            }
            else if (error.status=="500"){
              console.log("No se agregó");
              $('#modalConfirmaReERR').modal('show');
            }
            else{
              //$("#example").dataTable().fnDestroy();
              //this.status="success";
              //this.obtenerdatos();
              //this.LoadTableData();
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