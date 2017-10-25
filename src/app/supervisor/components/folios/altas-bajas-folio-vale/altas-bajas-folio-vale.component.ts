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
    public status:string="";
    public seriebol:boolean=false;
    public arregloeliminar:any=[];
    public textos:number;
    public folioelim:number;
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
        this.arregloeliminar=new Array();
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

        this.seleccionarcheck2();
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
      this._superService.altaFolioVale(this.folios).subscribe(
          result => {
              console.log(result);
          },
          error => {
              console.log(error);
              if (error.status=="400"){
                $("#tablafoliosvales").dataTable().fnDestroy();
                this.status="folioexist";
                this.LoadTableData();
              }
              else {
                  this.status="success";
                  $("#tablafoliosvales").dataTable().fnDestroy();
          
                  this.LoadTableData();
              }
              if (error.status=="500"){
                $("#tablafoliosvales").dataTable().fnDestroy();
                this.status="error";
                this.LoadTableData();
              }
            if((error._body.substring(20,38)) == "El folio ya existe"){
                console.log("FONDO IGUAL O MENOR A CERO ....");
                this.status="folioexist";
                $("#tablafoliosvales").dataTable().fnDestroy();
        
                this.LoadTableData();
            }
          }
        );
        
        $('#formAltaSeries').trigger("reset");
        console.log("Datos enviados");
      console.log(JSON.stringify(this.folios));
  }

  asignarfolios(){
    let a = this.cantidades;
    console.log("cantidades");
    console.log(this.cantidades);
    if (this.cantidades<0){
        this.folfinal=0;
    }
    else if (this.cantidades > 0){
        console.log(this.cantfolios);
        let a=Number(this.cantfolios);
        let b=Number(this.cantidades);
        this.folfinal=a+(b-1);
        if (isNaN(this.folfinal)){
            this.folfinal=0;
        }
    }

    if (isNaN(this.folfinal)){
        this.folfinal=0;
    }
    if (isNaN(a)){
        this.folfinal=0;
    }
}

asignarfolios2(){
  let a = this.cantfolios;
  console.log("cantidades");
  console.log(this.cantfolios);
  if (this.cantfolios<0){
      this.folfinal=0;
  }
  else if (this.cantfolios > 0){
      console.log(this.cantfolios);
      let a=Number(this.cantfolios);
      let b=Number(this.cantidades);
      this.folfinal=a+(b-1);
      if (isNaN(this.folfinal)){
        this.folfinal=0;
    }
  }

  if (isNaN(this.folfinal)){
    this.folfinal=0;
}

if (isNaN(a)){
    this.folfinal=0;
}
}

selectSerie(){
    console.log("hola");
    console.log(this.serieid);
    let a:string=this.serieid.toString();
    console.log("a");
    console.log(a);
    if (a=="Escoge una categoria..."){
      console.log("holi");
      this.seriebol=false;
    }
    else{
      console.log("else de tostring");
    }
    for(let s=0; s< this.series.length;s++){
        if (this.serieid == this.series[s].id){
            this.serie=this.series[s];
            console.log(this.serie);
            this.seriebol=true;
            break;
        }
        else{
          console.log("entro a else");

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

        $("#tablafoliosvales").dataTable().fnDestroy();

        //Se carga la tabla 
        $('#tablafoliosvales').dataTable();

      });
    }, 1000);
  }
  // TERMINA LA CONFIGURACIÓN DE LA TABLA **

  eliminarvarios(){
    console.log("Arreglo de eliminiar");
    console.log(this.arregloeliminar);
  this._superService.eliminarFoliosVales(this.arregloeliminar).subscribe(
     result => {
       $("#tablafoliosvales").dataTable().fnDestroy();
         this.status="elimino"
         this.LoadTableData();
     },
     error => {
      if (error.status=="400"){
        $("#tablafoliosvales").dataTable().fnDestroy();
        this.status="elimerror";
        this.LoadTableData();
      }
      else {
        console.log("aquiuiuiuiu");
        console.log(error);
          this.status="elimsuccess";
          $("#tablafoliosvales").dataTable().fnDestroy();
  
          this.LoadTableData();
      }
  }
  );
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
            $('#tablafoliosvales tr td').each(function(){
              texto = $('#tablafoliosvales tr:nth-child('+(a++)+') td:nth-child('+2+')').text();
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

  
}
