import { Component, OnInit , ViewChild, AfterViewInit } from '@angular/core';
import {SupervisorService} from '../../../supervisor.service';

import { DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs/Rx';

//Importacion de los modelos
import {Folio} from '../../../../models/folio.model';
import {Serie} from '../../../../models/serie.model';

declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'altas-bajas-folio-vale',
    templateUrl: './altas-bajas-folio-vale.component.html',
    styleUrls: ['./altas-bajas-folio-vale.component.css']
})
export class AltasBajasFolioValeComponent implements OnInit{
    //Declaracion de variables
    public serieid:number;
    public serie:Serie;
    public series:Serie[];
    public folio:Folio;
    public folios:Folio[];
    public cantfolios:number;
    public cantidades:number;
    public folfinal:number;

   //Directivas y declaracion de variables para el uso de la tabla !important
   @ViewChild(DataTableDirective)
   dtElement: DataTableDirective;
   dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<string> = new Subject();
    
    constructor(
        public _superService: SupervisorService /**Necesitamos el servicio */
      ) 
      {
        this.serie=new Serie(0,"","","","");
        this.series=new Array();
        this.folio=new Folio(0,0,"","",null);
        this.folios=new Array();  
      }

    ngOnInit(){
       
        this.LoadTableData();   

        this._superService.getSerieVale().subscribe(
          result => {
            this.series = result.respuesta;
            console.log(" Series....");
            console.log(this.series);
            this.loadTable();
          },
          error => {
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
          },
          error => {
              console.log(error);
          }
        );
      console.log(this.folios);
  }

  asignarfolios(){
    if (this.cantidades<0){
      console.log("menis de un numero");
    }
    else if (this.cantidades > 0){
        console.log(this.cantfolios);
        let a=Number(this.cantfolios);
        let b=Number(this.cantidades);
        this.folfinal=a+(b-1);
    }
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


    /**MÉTODO PARA CONFIGURAR LA TABLA Y USAR DATATABLES... */
  // Se tiene que usar $("#talbefolios").dataTable().fnDestroy(); antes de cada vez que se quiera actualizar la tabla 
  LoadTableData() {
    this._superService.getFolioVales().subscribe(
      result => {
        console.log("Vales");
        console.log(result);
        this.folios=result;

        // this.DataArray = result.respuesta;
        // this.prueba=this.DataArray;
        // console.log(" Datos del array para la tabla....");
        // console.log(this.DataArray);
        // this.loadTable();


      },
      error => {
        console.log(error);
      }
    );
  }

  loadTable(): void {
    setTimeout(function () {
      $(function () {
        //Se destruye la tabla en cuanto se obtiene una respuesta de back

        $("#tablafoliosvales").dataTable().fnDestroy();

        //Se carga la tabla 
        $('#tablafoliosvales').dataTable();

      });
    }, 1000);
  }
  // TERMINA LA CONFIGURACIÓN DE LA TABLA **

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