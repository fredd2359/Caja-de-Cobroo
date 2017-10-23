import { Component, OnInit, ViewChild, AfterViewInit   } from '@angular/core';

import { DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs/Rx';

import{Serie} from '../../../../models/serie.model';
import{Folio} from '../../../../models/folio.model';

import {SupervisorService} from '../../../supervisor.service';
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'alta-folio-pago',
    templateUrl: './altas-bajas-folio-pago.component.html',
    styleUrls: ['./altas-bajas-folio-pago.component.css']
})

export class AltasBajasFolioPagoComponent implements OnInit
{
    title :string;
    DataArray : any = [];
    public serieid:number;
    public serie:Serie;
    public series:Serie[];
    public folio:Folio;
    public folios:Folio[];
    public cantfolios:number;
    public cantidades:number;
    public folfinal:number;
    public numerofol:any;
  //Directivas y declaracion de variables para el uso de la tabla !important
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
dtTrigger: Subject<string> = new Subject();
    constructor(
        public _superService: SupervisorService /**Necesitamos el servicio */
    ){
        
        this.serie = new Serie(0,"","","","");
        this.series = new Array();
        this.folio = new Folio(0,0,"","",null);
        this.folios = new Array();
        this.numerofol=new Array();
    }
    ngOnInit(){
        this.LoadTableData();

        this._superService.getSeriePago().subscribe(
            result => {
              this.series = result.respuesta;
              console.log(" Series....");
              console.log(this.series);
              this.loadTable();
            },
            error => {
                console.log("Error en onInit getSeriePago");
              console.log(error);
            }
          );

        this.seleccionarcheck();
    }
    onSubmit(){
        let a=0;
        this.folios=new Array();
        for(let i=0; i < this.cantidades;i++){
            console.log(a);
            this.folio=new Folio(0,0,"","",null);
            this.folio.id=null;
            this.folio.fechaAlta=null;
            this.folio.estadoFolio="DISPONIBLE";
            this.folio.numeroFolio=Number(this.cantfolios)+Number(a);
            this.folio.serie=this.serie;
            this.folios.push(this.folio);
            a++;
        }
        this._superService.altaFolioPago(this.folios).subscribe(
            result => {
                console.log(result);

        $("#tablafolios").dataTable().fnDestroy();
        this.LoadTableData();
            },
            error => {
                console.log(error);
                
        $("#tablafolios").dataTable().fnDestroy();

        this.LoadTableData();
            }
          );
          console.log("Mandar ");
        console.log(JSON.stringify(this.folios));
    }

    asignarfolios(){
        if (this.cantidades<0){

        }
        else if (this.cantidades > 0){
            console.log(this.cantfolios);
            let a=Number(this.cantfolios);
            let b=Number(this.cantidades);
            this.folfinal=a+(b-1);
        }
    }

    eliminartodos(){
        
        for(let a=0;a<this.folios.length;a++){
            console.log("a");
            this.numerofol.push(this.folios[a].numeroFolio);
        }
        console.log("Eliminar");
        console.log(this.numerofol);
        this._superService.eliminarFoliosPagos(this.numerofol).subscribe(
            result => {
                
        $("#tablafolios").dataTable().fnDestroy();
              this.loadTable();
            },
            error => {
                $("#tablafolios").dataTable().fnDestroy();
            }
          );
    }

    selectSerie(){
        console.log("hola");
        console.log(this.serieid);
        for(let s=0; s< this.series.length;s++){
            if (this.serieid == this.series[s].id){
                this.serie=this.series[s];
                console.log(this.serie);
            }
            else{
            }
        }
    }

    /**MÉTODO PARA CARGAR LOS DATOS DE LA TABLA Y USAR DATATABLES... */
  LoadTableData() {
    this._superService.getFolioPagos().subscribe(
      result => {
        this.DataArray = result.respuesta;
        console.log(" Datos del array para la tabla....");
        console.log(this.DataArray);
        this.loadTable();
      },
      error => {
          console.log("error LoadTableData getFolioPagos");
        console.log(error);
      }
    );
  }


  loadTable(): void {
    setTimeout(function () {
      $(function () {
    
       $('#tablafolios').dataTable();

      });
    }, 1000);
  }

  //JQuery
  seleccionarcheck(){
    $('#mastercheckbox').click(function(event) {
      if(this.checked) {
          // Iterate each checkbox
          $(':checkbox').each(function() {
              this.checked = true;
          });
      }
      else {
        $(':checkbox').each(function() {
              this.checked = false;
          });
      }
    });
  }
}