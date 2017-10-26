import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';

import {SupervisorService} from '../../supervisor.service';

import { DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs/Rx';

//Importacion de los modelos
import {Folio} from '../../../models/folio.model';
import {Serie} from '../../../models/serie.model'; 
import {Cajero} from '../../../models/Cajero.model';
import {Caja} from '../../../models/caja.model';  

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-historial-vale',
  templateUrl: './historial-vale.component.html',
  styleUrls: ['./historial-vale.component.css']
})
export class HistorialValeComponent implements OnInit {
  public serie:Serie;
  public series:Serie[];
  public folio:Folio;
  public folios:Folio[];
  public caja:Caja;
  public cajas:Caja[];
  public cajero:Cajero;
  public cajeros:Cajero[];
  public folioinicio:number;
  public foliofinal:number;
  public serieid:number;

  public pos1:number=null;
  public pos2:number=null;
  public serieidbol:boolean;
  public foliniciobol:boolean;
  public folfinalbol:boolean;
  public cajerom:string;
  public cajerobol:boolean;
  
  //Directivas y declaracion de variables para el uso de la tabla !important
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<string> = new Subject();

  constructor(
    public _superService: SupervisorService /**Necesitamos el servicio */
  ) {
    this.serie=new Serie(0,"","","","");
    this.series=new Array();
    this.folio=new Folio(0,0,"","",null,null);
    this.folios=new Array();  
    this.cajero=new Cajero(0,"","",0,0,null);
    this.cajeros=new Array();  
  }

  ngOnInit() {
    this.LoadTableData();  
    this._superService.getFolioVales().subscribe(
      result => {
        
        this.folios = result.respuesta;
        console.log("vales cargados");
        console.log(this.folios);
        this.loadTable();
      },
      error => {
        console.log(error);
      }
    );
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
    this._superService.getallCajeros().subscribe(
      result => {
        
        this.cajeros = result;
        console.log(" Cajeros....");
        console.log(this.cajeros);
        this.loadTable();
      },
      error => {
        console.log(error);
      }
    );
  }

  validarfolios(i){
    
    for(let a=0;a<this.folios.length;a++){
      if (this.folioinicio==this.folios[a].numeroFolio){
        this.pos1=a;
        break;
      }
    }

    if (this.foliofinal==null){
      //No debe hacer nada
      this.foliniciobol=false;
    }
    else if (this.pos1>this.pos2) {
      this.foliniciobol=false;
      this.foliniciobol=false;
      $("#ModalFolioError").modal("show");
    }
    else {
      this.foliniciobol=true;
      this.folfinalbol=true;
    }
  }

  validarfolios2(i){
    for(let a=0;a<this.folios.length;a++){
      if (this.foliofinal==this.folios[a].numeroFolio){
        this.pos2=a;
        break;
      }
    }

    if (this.folioinicio==null){
      //No debe hacer nada
      this.folfinalbol=false;
    }
    else if (this.pos2<this.pos1) {
      this.folfinalbol=false;
      this.folfinalbol=false;
      $("#ModalFolioError").modal("show");
    }
    else {
      this.folfinalbol=true;
      this.foliniciobol=true;
    }
  }

  selectSerie(){
    console.log("hola");
    console.log(this.serieid);
    let a:string=this.serieid.toString();
    console.log("a");
    console.log(a);
    if (a=="Escoge un cajero..."){
      console.log("holi");
      this.serieidbol=false;
    }
    else{
      console.log("else de tostring");
    }
    for(let s=0; s< this.series.length;s++){
        if (this.serieid == this.series[s].id){
            this.serie=this.series[s];
            console.log(this.serie);
            this.serieidbol=true;
            console.log("bolean de serie");
            console.log(this.serieidbol);
            break;
        }
        else{
          console.log("entro a else");

        }
    }
   
}
selectcajero(){
  let a:string=this.cajerom.toString();
  if (a=="Escoge un cajero..."){
    this.cajerobol=false;
  }
  else{
    console.log("else de tostring");
  }
  console.log("cajero");
  console.log(this.cajerom);
  for(let s=0; s< this.cajeros.length;s++){
      if (this.cajerom == this.cajeros[s].nombre){
          this.cajero=this.cajeros[s];
          this.cajerobol=true;
          console.log("bolean de cajero");
          console.log(this.cajerobol);
          break;
      }
      else{
        console.log("entro a else");

      }
  }
}

  asignarCajero(){
    for (this.pos1;this.pos1<(this.pos2+1);this.pos1++){
      this.folio=this.folios[this.pos1];
      this.folio.cajero=this.cajero;
      console.log(this.folio);
      this._superService.asignarFolioPago(this.folio).subscribe(
        result => {
          this.loadTable();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

    /**MÉTODO PARA CONFIGURAR LA TABLA Y USAR DATATABLES... */
  // Se tiene que usar $("#talbefolios").dataTable().fnDestroy(); antes de cada vez que se quiera actualizar la tabla 
  LoadTableData() {
    this._superService.getFolioPagos().subscribe(
      result => {
        console.log("Folios");
        console.log(result);
        this.folios=result.respuesta;
        this.loadTable();
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

        $("#tablafolios").dataTable().fnDestroy();

        //Se carga la tabla 
        $('#tablafolios').dataTable();

      });
    }, 1000);
  }
  // TERMINA LA CONFIGURACIÓN DE LA TABLA **

}
