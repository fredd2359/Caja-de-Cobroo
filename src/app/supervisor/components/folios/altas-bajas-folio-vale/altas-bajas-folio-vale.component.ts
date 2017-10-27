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
    public seriename:string;
    public serie:Serie;
    public series:Serie[];
    public folio:Folio;
    public folios:Folio[];
    public cantfolios:number;
    public cantidades:number;
    public folfinal:string;
    public status:string="";
    public seriebol:boolean=false;
    public arregloeliminar:any=[];
    public textos:number;
    public subCad:number;
    public folioelim:number;
    public folfinalnum:number;
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
        this.folio=new Folio(0,"","","",null,null);
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
          this.folio=new Folio(0,"","","",null,null);
          this.folio.id=null;
          this.folio.fechaAlta=null;
          this.folio.estadoFolio="DISPONIBLE";
          this.folio.cajero=null;
          let c=Number(this.cantfolios)+Number(a);
          this.folio.numeroFolio=this.verificarcifras(c);
          console.log(JSON.stringify("000098"));
          this.folio.serie=this.serie;
          this.folios.push(this.folio);
          a++;
      }
      console.log("arreglo a agregar");
      console.log(this.folios);
      
      this._superService.altaFolioVale(this.folios).subscribe(
          result => {
              console.log(result);
          },
          error => {
              console.log(error);
              if (error.status=="400"){
                this.status="folioexist";
                $("#tablafoliosvales").dataTable().fnDestroy();

                this.LoadTableData();
              }
              else {
                  this.status="success";
                  $("#tablafoliosvales").dataTable().fnDestroy();

                  this.LoadTableData();
          
              }
              if (error.status=="500"){
                this.status="error";
                $("#tablafoliosvales").dataTable().fnDestroy();

                this.LoadTableData();
              }
              
            console.log("se carga la tabla despues de encviar");
            if((error._body.substring(20,38)) == "El folio ya existe"){
                console.log("FONDO IGUAL O MENOR A CERO ....");
                this.status="folioexist";
                $("#tablafoliosvales").dataTable().fnDestroy();
        
            }
          }
        );
        
        $('#formAltaSeries').trigger("reset");
        console.log("Datos enviados");
      console.log(JSON.stringify(this.folios));
  }

  verificarcifras(a){
    
    let b:string=a.toString();
    let v;
    if(b.length==1){
      v="00000"+a;
    }
    if(b.length==2){
      v="0000"+a;
      
    }
    if(b.length==3){
      v="000"+a;
      
    }
    if(b.length==4){
      v="00"+a;
      
    }
    if(b.length==5){
      v="0"+a;
    }
    if(b.length==6){
      v=a;
    }
    
    console.log("folio");
    console.log(v);
    return v;
  }

  asignarfolios(){
    let a = this.cantidades;
    this.folfinalnum=Number(this.folfinal);
    console.log("cantidades");
    console.log(this.cantidades);
    if (this.cantidades<0 || isNaN(this.cantidades)){
      this.folfinal="0";
    }
    else if (this.cantidades > 0){
        let a=Number(this.cantfolios);
        let b=Number(this.cantidades);
        this.folfinalnum=a+(b-1);
        if (isNaN(this.folfinalnum) || isNaN(a) || isNaN(this.cantidades) || this.cantidades==null){
          this.folfinal="0";
        }
        else{
          this.folfinal=this.folfinalnum.toString();
        }
    }

    if (isNaN(this.folfinalnum)|| isNaN(a) || isNaN(this.cantidades) || this.cantidades==null ){
      console.log("entro a if nana");
      this.folfinal="0";
    }
    else {
      let foltostring=Number(this.folfinal);
      let final=foltostring.toString();
      let leng:number=final.length;
      if(final.length==1){
        let v:string="00000"+this.folfinalnum;
        this.folfinal=v;
        console.log("folio final");
        console.log(this.folfinal);
      }
      if(final.length==2){
        let v:string="0000"+this.folfinalnum;
        this.folfinal=v;
        console.log("folio final");
        console.log(this.folfinal);
      }
      if(final.length==3){
        let v:string="000"+this.folfinalnum;
        this.folfinal=v;
        console.log("folio final");
        console.log(this.folfinal);
      }
      if(final.length==4){
        let v:string="00"+this.folfinalnum;
        this.folfinal=v;
        console.log("folio final");
        console.log(this.folfinal);
      }
      if(final.length==5){
        let v:string="0"+this.folfinalnum;
        this.folfinal=v;
        console.log("folio final");
        console.log(this.folfinal);
      }

    }


}

asignarfolios2(){
  let a = this.cantfolios;
  this.folfinalnum=Number(this.folfinal);
  console.log("cantfolios");
  console.log(this.cantfolios);
  if (this.cantfolios<0){
    this.folfinal="0";
  }
  else if (this.cantfolios > 0){
      let a=Number(this.cantfolios);
      let b=Number(this.cantidades);
      this.folfinalnum=a+(b-1);
      this.folfinal=this.folfinalnum.toString();
      if (isNaN(this.folfinalnum) ||  isNaN(a) || isNaN(this.cantidades) || this.cantidades==null){
        this.folfinal="0";
      }
      else {
        this.folfinal=this.folfinalnum.toString();
      }
  }

  if (isNaN(this.folfinalnum) || isNaN(a) || isNaN(this.cantidades)|| this.cantidades==null){
    console.log("entro a if de nan");
    this.folfinal="0";
  }
  else{
    let foltostring=Number(this.folfinal);
    let final=foltostring.toString();
    let leng:number=final.length;
    if(final.length==1){

      let v:string="00000"+this.folfinalnum;
      this.folfinal=v;
      console.log("folio final");
      console.log(this.folfinal);
    }
    if(final.length==2){
      let v:string="0000"+this.folfinalnum;
      this.folfinal=v;
      console.log("folio final");
      console.log(this.folfinal);
    }
    if(final.length==3){
      let v:string="000"+this.folfinalnum;
      this.folfinal=v;
      console.log("folio final");
      console.log(this.folfinal);
    }
    if(final.length==4){
      let v:string="00"+this.folfinalnum;
      this.folfinal=v;
      console.log("folio final");
      console.log(this.folfinal);
    }
    if(final.length==5){
      let v:string="0"+this.folfinalnum;
      this.folfinal=v;
      console.log("folio final");
      console.log(this.folfinal);
    }
    
  }

}

selectSerie(){
    console.log("hola");
    console.log(this.seriename);
    let a:string=this.seriename.toString();
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
        if (this.seriename == this.series[s].serie){
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
        
        this.folios=result.respuesta;
        console.log("Vales");
        console.log(result);
        $("#tablafoliosvales").dataTable().fnDestroy();
        this.loadTable();
      },
      error => {
        console.log(error);
        
        $("#tablafolios").dataTable().fnDestroy();
      }
    );
  }

  loadTable(): void {
    setTimeout(function () {
      $(function () {
        
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

nuevoarray(){
  
  this.arregloeliminar=new Array();
}
  

  seleccionarcheck2(){
    let self=this;
    var texto="";
    
    $('#mastercheckbox').click(function(event) {
      
      if(this.checked) {
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
          console.log("entra?");
          self.arregloeliminar=new Array();
      }
      
    });
    console.log("arreglo a eliminar");
    console.log(JSON.stringify(self.arregloeliminar));
    
    // this.eliminarmuchos();
  }

  asignarelim(){
    console.log("entro a asigelim");
    console.log(this.subCad);

    for (let h=0; h<this.folios.length;h++){
      if (h==this.subCad){
        console.log("self");
        this.arregloeliminar.push({id: this.folios[h].id});
      }
    }

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
      this.arregloeliminar.push({id: this.folios[a].id});
      console.log(this.folios[a].id);
      self.folioelim=Number(this.folios[a].id);
      break;
      }
      else {
        console.log("else de check");
        for(let a=0;a<self.arregloeliminar.length;a++){
          console.log("fpolio elimi");
          console.log(this.folios[check].id);
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

  
}
