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
  templateUrl: './historial-pago.component.html',
  styleUrls: ['./historial-pago.component.css']
})
export class HistorialPagoComponent implements OnInit {

  public serie:Serie;
  public series:Serie[];
  public folio:Folio;
  public folios:Folio[];
  public foliosserie:Folio[];
  public foliosasig:Folio[];
  public foliosELIMINAR:any;
  public caja:Caja;
  public cajas:Caja[];
  public cajero:Cajero;
  public folioelim;
  public cajeros:Cajero[];
  public folioinicio:number;
  public foliofinal:number;
  public seriename:string;
  public status;
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
    console.log("folio inicio");
    console.log(this.folioinicio);
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

  validarfolios2(i){
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

  selectSerie(){
    console.log("hola");
    console.log(this.seriename);
    let a:string=this.seriename;
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
        if (this.seriename == this.series[s].serie){
            this.serie=this.series[s];
            console.log(this.serie);
            this.serieidbol=true;
            // this._superService.getFolioporSerie(this.serie.id).subscribe(
            //   result => {
            //     console.log("resultado");
            //     console.log(result);
            //     this.foliosserie=result.respuesta;
            //   },
            //   error => {
            //     console.log("error");          
            //     console.log(error);
            //   }
            // );
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
seleccionarcheck2(){
  let self=this;
  var texto="";
  $('#mastercheckbox').click(function(event) {
    if(this.checked) {
      let a=0;  
      self.arregloeliminar=new Array();
      // Iterate each checkbox
        $(':checkbox').each(function() {
          
          this.checked = true;
          $('#tablafolios tr td').each(function(){
            texto = $('#tablafolios tr:nth-child('+(a++)+') td:nth-child('+2+')').text();
            if ((texto=="")){
            }
            else {
              
              self.textos=Number(texto);
              self.arregloeliminar.push({numeroFolio: self.textos});
            }
          });
          
          a++;
        });
    }
    else {
      $(':checkbox').each(function() {
            this.checked = false;
        });
        self.arregloeliminar=new Array;
    }
  });
  console.log("arreglo a eliminar");
  console.log(JSON.stringify(self.arregloeliminar));
  
  // this.eliminarmuchos();
}

asignarCajero(){
  
      for (this.pos1;this.pos1<(this.pos2+1);this.pos1++){
        this.foliosasig=new Array();
        this.folio=this.folios[this.pos1];
        console.log(this.folios[this.pos1]);
        this.folio.cajero=this.cajero;
        this.foliosasig.push(this.folio);
        console.log("folio stringifydo");
        console.log(JSON.stringify(this.foliosasig));
        this._superService.asignarFolioPago(this.foliosasig).subscribe(
          result => {
            console.log("resultado");
            this.loadTable();
          },
          error => {
          if (error.status=="400"){
            this.status="folioasig";
            $("#tablafoliosvales").dataTable().fnDestroy();

            this.LoadTableData();
          }
          else{
            this.status="success";
            console.log("error");          
            console.log(error);
            $("#tablafolios").dataTable().fnDestroy();
  
            this.LoadTableData(); 
          }
          if (error.status=="500"){
            this.status="folioasig";
            $("#tablafoliosvales").dataTable().fnDestroy();

            this.LoadTableData();
          }
          }
        );
      }
    }

    cambio(){
      this.asignarfoliosbol=!this.asignarfoliosbol;
    }

    eliminarvarios(){
      for (let i=0;i<this.arregloeliminar.length;i++){   
        for (let j=0; j<this.folios.length;j++){      
          let foliovector=Number(this.folios[j].numeroFolio);
          let folioeliminar=Number(this.arregloeliminar[i]);
          if (this.arregloeliminar[i].numeroFolio==this.folios[j].numeroFolio){
            this.foliosELIMINAR.push(this.folios[j]);
          }
        }
      }
      console.log("arreglo a desasignar");
      console.log(this.foliosELIMINAR);
      this._superService.desasignarFolioPagos(this.foliosELIMINAR).subscribe(
        result => {
          console.log("resultado");
          this.loadTable();
        },
        error => {
          if (error.status=="400"){
            this.status="errorelim";
            $("#tablafoliosvales").dataTable().fnDestroy();

            this.LoadTableData();
          }
          else{
            this.status="successelim";
            console.log("error");          
            console.log(error);
            $("#tablafolios").dataTable().fnDestroy();
    
            this.LoadTableData();
          } 
          if (error.status=="500"){
            this.status="errorasignar";
            $("#tablafoliosvales").dataTable().fnDestroy();

            this.LoadTableData();
          }
          if((error._body.substring(20,53)) == "El folio ya se encuentra asignado"){
            console.log("FONDO IGUAL O MENOR A CERO ....");
            this.status="folioasig";
            $("#tablafoliosvales").dataTable().fnDestroy();
    
        }
        }
      );
      this.arregloeliminar=new Array();
      this.foliosELIMINAR=new Array();
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
          if ($('#check'+check).is(":checked")){
  
            $("#ModalErrorCancelacion").modal("show");
          }
          else{
  
          }
        }
        else{
        if ($('#check'+check).is(":checked")){
        console.log("if de check");
        console.log("entroooooo");
        this.arregloeliminar.push({numeroFolio: this.folios[a].numeroFolio});
        console.log(this.folios[a].numeroFolio);
        self.folioelim=this.folios[a].numeroFolio;
        break;
        }
        else {
          console.log("else de check");
          for(let a=0;a<self.arregloeliminar.length;a++){
            console.log("fpolio elimi");
            console.log(this.folios[check].numeroFolio);
            if(this.folios[check].numeroFolio==self.arregloeliminar[a].numeroFolio){
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
