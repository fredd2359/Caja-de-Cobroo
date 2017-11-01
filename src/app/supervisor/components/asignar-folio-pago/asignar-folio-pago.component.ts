import { Component, OnInit,ViewChild, AfterViewInit  } from '@angular/core';
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
  selector: 'app-historial',
  templateUrl: './asignar-folio-pago.component.html',
  styleUrls: ['./asignar-folio-pago.component.css']
})
export class AsignarFolioPagoComponent implements OnInit {

  public serie:Serie;
  public series:Serie[];
  public seriesasignar:Serie[];
  public folio:Folio;
  public folios:Folio[];
  public foliosserie:Folio[];
  public foliosasig:Folio[];
  public foliosELIMINAR:any;
  public ngcajero:string;
  public caja:Caja;
  public cajas:Caja[];
  public cajero:Cajero;
  public folioelim;
  public cajeros:Cajero[];
  public folioinicio:number;
  public foliofinal:number;
  public seriename:string;
  public status;
  public subCad:number;
  public arregloeliminar;

  public pos1:number=null;
  public pos2:number=null;
  public serieidbol:boolean;
  public foliniciobol:boolean;
  public folfinalbol:boolean;
  public cajerom:string;
  public textos:number;
  public cajerobol:boolean;
  public asignarfoliosbol:boolean=false;
  
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
    this.folio=new Folio(0,"","","",null,null);
    this.folios=new Array();  
    this.foliosserie=new Array();  
    this.cajero=new Cajero(0,"","",0,0,null);
    this.foliosasig=new Array();  
    this.cajeros=new Array();  
    this.arregloeliminar =new Array();
    this.foliosELIMINAR=new Array;
    this.seriesasignar=new Array();
  }

  ngOnInit() {
    this.LoadTableData();  
    this._superService.getFolioPagos().subscribe(
      result => {
        
        this.folios = result.respuesta;
        console.log("folios cargados");
        console.log(this.folios);
        this.loadTable();
      },
      error => {
        console.log(error);
      }
    );
    this._superService.getSeriePago().subscribe(
      result => {
        
        this.series = result.respuesta;
        this.seriesasignar=this.series;
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
    this.seleccionarcheck2();
  }

  validarfolios(i){
    console.log(i);

    let a:string=this.folioinicio.toString();
    console.log("folio inicio");
    console.log(this.folioinicio);
    if (a==="Folio..."){
      console.log("foliniciobol");   
      this.foliniciobol=false;
    }
    else{
    for(let a=0;a<this.folios.length;a++){
      if (this.folioinicio==Number(this.folios[a].numeroFolio)){
        this.pos1=a;
        console.log("pos1");
        console.log(this.pos1);
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
  }

  validarfolios2(i){

    let a:string=this.foliofinal.toString();
    console.log("folio inicio");
    console.log(this.foliofinal);
    if (a==="Folio..."){ 
    console.log("foliniciobol");   
      this.folfinalbol=false;
    }
    else{
    for(let a=0;a<this.folios.length;a++){
      if (this.foliofinal==Number(this.folios[a].numeroFolio)){
        this.pos2=a;
        console.log("pos2");
        console.log(this.pos2);
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
  }

  selectSerie(){
    console.log("hola");
    console.log(this.seriename);
    let a:string=this.seriename;
    if (a=="Escoge una Categoria..."){
      console.log("holi");
      this.serieidbol=false;
    }
    else{
      console.log("else de tostring");
    }
    for(let s=0; s< this.seriesasignar.length;s++){
        if (this.seriename == this.seriesasignar[s].serie){
            this.serie=this.seriesasignar[s];
            console.log(this.serie);
            this.serieidbol=true;
             this._superService.getFolioReciboporSerie(this.serie.id).subscribe(
               result => {
                 console.log("resultado");
                 console.log(result);
                 this.foliosserie=result.respuesta;
               },
               error => {
                 console.log("error");     
                 this.foliosserie=new Array();
                 this.status="nohayfolios"; 
                 $('#ModalAsignar').modal("hide");  
                 $('#modalRegistrarfolio').modal("show");    
                 console.log(error);
               }
             );
            break;
        }
        else{
          console.log("entro a else");

        }
    }
   
}


selectcajero(){
  let a:string=this.ngcajero.toString();
  if (a=="Escoge un cajero..."){
    this.cajerobol=false;
  }
  else{
  
    for(let s=0; s< this.cajeros.length;s++){
      if (this.ngcajero == this.cajeros[s].nombre){
        console.log("cajero select cajeros");
          this.cajero=this.cajeros[s];
          console.log(this.cajero);
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
}

seleccionarcheck2(){
  let self=this;
  var texto="";
  
  // $('#mastercheckbox').click(function(event) {
    
    if($('#mastercheckbox').is(":checked")) {
      // Iterate each checkbox
        $(':checkbox').each(function() {
          this.checked = true;
          
             let s=this.id.toString();
            //  console.log(s);
             let g=s.substring(5,s.length);
             self.subCad=Number(g);
             self.asignarelim();
          
        });
    }
    else {
      $(':checkbox').each(function() {
            this.checked = false;
        });
        self.arregloeliminar=new Array();
       
    }
    
  // });
  console.log("arreglo a eliminar");
  console.log(JSON.stringify(this.arregloeliminar));
  
  // this.eliminarmuchos();
}

asignarelim(){

  for (let h=0; h<this.folios.length;h++){
    if (h==this.subCad){
      console.log("self");
      this.arregloeliminar.push({id: this.folios[h].id});
    }
  }

}
asignarCajero(){
  
  this.foliosasig=new Array();
      for (this.pos1;this.pos1<(this.pos2+1);this.pos1++){
        this.folio=this.folios[this.pos1];
        console.log(this.folios[this.pos1]);
        this.folio.cajero=this.cajero;
        this.foliosasig.push(this.folio);
      }
        console.log("folio stringifydo");
        console.log(JSON.stringify(this.foliosasig));
        this._superService.asignarFolioPago(this.foliosasig).subscribe(
          result => {
            console.log("resultado");
            
            $("#tablafolios").dataTable().fnDestroy();
            this.status="successdesasignar";
            $('#formAsignarfolio').trigger("reset");
            this.seriename="Escoge una Categoria...";
            $('#modalRegistrarfolio').modal("show");
            this.serieidbol=false;
            this.LoadTableData();
          },
          error => {
          if (error.status=="400"){
            this.status="folioasig";
            $('#modalRegistrarfolio').modal("show");
            $('#formAsignarfolio').trigger("reset");
            this.seriename="Escoge una Categoria...";
            $("#tablafolios").dataTable().fnDestroy();
            this.serieidbol=false;

            this.LoadTableData();
          }
          else{
            this.status="success";
            $('#modalRegistrarfolio').modal("show");
            $('#formAsignarfolio').trigger("reset");
            console.log("error");          
            this.seriename="Escoge una Categoria...";
            this.serieidbol=false;
            console.log(error);
            $("#tablafolios").dataTable().fnDestroy();
  
            this.LoadTableData(); 
          }
          if (error.status=="500"){
            this.status="folioasig";
            this.seriename="Escoge una Categoria...";
            $('#formAsignarfolio').trigger("reset");
            this.serieidbol=false;
            $('#modalRegistrarfolio').modal("show");
            $("#tablafolios").dataTable().fnDestroy();

            this.LoadTableData();
          }
          }
        );
      
    }

    cambio(){
      this.asignarfoliosbol=!this.asignarfoliosbol;
      for (this.pos1;this.pos1<(this.pos2+1);this.pos1++){
        for (let i=0;i<this.folios.length;i++){
       
        }
      } 
    }

    prueba(){
      console.log("hola");
        $('#check15').prop('checked', true)
      
    }

    selectcheck2(i){
      let self=this;
      var texto="";
      var fol:number;
      let index:number=i;
      let check:number=i;
      console.log(i);
    
      for(let a=0 ; a < this.folios.length;a++){
        if (a==i){        
          if ((this.folios[a].estadoFolio=="CANCELADO")){

          console.log("entra a a=i");
          console.log(this.folios[a].estadoFolio);  
            if ($('#check'+check).is(":checked")){
    
              $("#ModalErrorCancelacion").modal("show");
            }
            else{
              for(let a=0;a<self.arregloeliminar.length;a++){
                console.log("fpolio elimi");
                console.log(this.folios[check].numeroFolio);
                if(this.folios[check].id==self.arregloeliminar[a].id){
                  console.log("splice");
                  self.arregloeliminar.splice(a,1);
                }
              }
            }
          }
          else{
          if ($('#check'+check).is(":checked")){
          console.log("if de check");
          console.log("entroooooo");
          this.arregloeliminar.push({id: this.folios[a].id});
          console.log(this.folios[a].id);
          self.folioelim=Number(this.folios[a].id);
          break;
          }
          else {
            console.log("else de check");
            for(let a=0;a<self.arregloeliminar.length;a++){
              console.log("fpolio elimi");
              console.log(this.folios[check].numeroFolio);
              if(this.folios[check].id==self.arregloeliminar[a].id){
                console.log("splice");
                self.arregloeliminar.splice(a,1);
              }
          }
        }
      }
            
        }
    }
    console.log("dato a eliminar");
    console.log(this.arregloeliminar);
    }
    
    eliminarvarios(){
      for (let i=0;i<this.arregloeliminar.length;i++){   
        for (let j=0; j<this.folios.length;j++){
          if (this.arregloeliminar[i].id==this.folios[j].id){
            this.foliosELIMINAR.push(this.folios[j]);
          }
        }
      }
      // this.arregloeliminar=new Array();
      console.log("arreglo a desasignar");
      console.log(this.foliosELIMINAR);
      this._superService.desasignarFolioPagos(this.arregloeliminar).subscribe(
        result => {
          this.status="successdesasignar";
          console.log(this.status);
          $("#tablafolios").dataTable().fnDestroy();
          $('#modalRegistrarfolio').modal("show");
          this.arregloeliminar=new Array();
          this.LoadTableData();
        },
        error => {
          if (error.status=="400"){
            this.status="errorelim";
            $('#modalRegistrarfolio').modal("show");
            $("#tablafolios").dataTable().fnDestroy();
            this.arregloeliminar=new Array();
            this.LoadTableData();
          }
          else{
            this.status="successelim";
            $('#modalRegistrarfolio').modal("show");
            console.log("error");          
            console.log(error);
            this.arregloeliminar=new Array();
            $("#tablafolios").dataTable().fnDestroy();
    
            this.LoadTableData();
          } 
          if (error.status=="500"){
            this.status="errorasignar";
            $('#modalRegistrarfolio').modal("show");
            this.arregloeliminar=new Array();
            $("#tablafolios").dataTable().fnDestroy();

            this.LoadTableData();
          }
          if((error._body.substring(20,53)) == "El folio ya se encuentra asignado"){
            console.log("FONDO IGUAL O MENOR A CERO ....");
            this.status="folioasig";
            this.arregloeliminar=new Array();
            $('#modalRegistrarfolio').modal("show");
            $("#tablafolios").dataTable().fnDestroy();
    
          }
        }
      );
      this.arregloeliminar=new Array();
      this.foliosELIMINAR=new Array();
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
