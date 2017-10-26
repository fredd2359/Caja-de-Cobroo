import { Component, OnInit } from '@angular/core';
import {SupervisorService} from '../../../supervisor.service';

//Importacion de los modelos
import {Folio} from '../../../../models/folio.model';
import {Serie} from '../../../../models/serie.model';

//Declaraciones para utilizar JQuery
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-baja-folios-vales',
  templateUrl: './baja-folios-vales.component.html',
  styleUrls: ['./baja-folios-vales.component.css']
})
export class BajaFoliosValesComponent implements OnInit {

  //Declaracion de variables
  public serieVale:Serie;
  public serieVales:Serie[];
  public folio:Folio;
  public folios:Folio[];

  constructor(
    public _superService: SupervisorService /**Necesitamos el servicio */
  ) 
  {
    this.serieVale=new Serie(0,"","","","");
    this.serieVales=new Array();
    this.folio=new Folio(0,0,"","",null,null);
    this.folios=new Array();  
  }

  ngOnInit() {
    this.LoadTableData();
  }

  /**MÉTODO PARA CONFIGURAR LA TABLA Y USAR DATATABLES... */
  // Se tiene que usar $("#talbefolios").dataTable().fnDestroy(); antes de cada vez que se quiera actualizar la tabla 
  LoadTableData() {
    this._superService.getFolioVale().subscribe(
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
    
       $('#example').dataTable();

      });
    }, 1000);
  }
  // TERMINA LA CONFIGURACIÓN DE LA TABLA **
}
