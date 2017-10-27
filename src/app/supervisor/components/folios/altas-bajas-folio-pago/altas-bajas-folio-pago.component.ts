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
    public seriename:string;
    public serie:Serie;
    public series:Serie[];
    public folio:Folio;
    public folios:Folio[];
    public cantfolios:number;
    public cantidades:number;
    public folfinal:string;
    public numerofol:any;
    public cantidadesbol:boolean=true;
    public status:string="";
    public arregloeliminar=[];
    public seriebol=false;
    public textos:number;
    public folioelim:number;
    public folfinalnum:number;
    public subCad:number;
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
        this.folio = new Folio(0,"","","",null,null);
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
        this._superService.altaFolioPago(this.folios).subscribe(
            result => {
                //NO SE UTILIZA POR QUE LA RESPUESTA VIENE MAL SE MANEJA EN ERROR
                // console.log(result);
                // this.status="success";
                // console.log(this.status);
                // $("#tablafolios").dataTable().fnDestroy();

                // this.LoadTableData();
            },
            error => {
                console.log("errorisirto");
                console.log(error);
                if (error.status=="400"){
                    $("#tablafolios").dataTable().fnDestroy();
                    this.status="error";
                    this.LoadTableData();
                  }
                else{
                    this.status="success";
                    $("#tablafolios").dataTable().fnDestroy();
            
                    this.LoadTableData();
                    
                }
                if((error._body.substring(20,38)) == "El folio ya existe"){
                    console.log("FONDO IGUAL O MENOR A CERO ....");
                    this.status="folioexist";
                    $("#tablafolios").dataTable().fnDestroy();
            
                    this.LoadTableData();
                }
            } 
          );
          $('#formAltaSeries').trigger("reset");
          console.log("Mandar ");
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

    verificarCantidad() {
        console.log(this.cantidades);
        if (this.cantidades > 0) {
    
          this.cantidadesbol = true;
    
        }
        else if (this.cantidades < 0) {
          this.cantidadesbol = false;
        }
        else {
          this.cantidadesbol=false;
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
                this.seriebol=true;
                console.log(this.serie);
                break;
            }
            else{

            }
        }
    }

    /**MÉTODO PARA CARGAR LOS DATOS DE LA TABLA Y USAR DATATABLES... */
  LoadTableData() {
    this._superService.getFolioPagos().subscribe(
      result => {
        this.folios = result.respuesta;
        console.log(" Datos del array para la tabla....");
        console.log(this.folios);
        $("#tablafolios").dataTable().fnDestroy();
        this.loadTable();
      },
      error => {
          console.log("error LoadTableData getFolioPagos");
          $("#tablafolios").dataTable().fnDestroy();
        console.log(error);
      }
    );
  }

  loadTable(): void {
    setTimeout(function () {
      $(function () {
    
       $("#tablafolios").dataTable().fnDestroy();

       //hola
       $('#tablafolios').dataTable();

      });
    }, 1000);
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
  
  eliminarvarios(){
    console.log("Arreglo de eliminiar");
    console.log(this.arregloeliminar);
  this._superService.eliminarFoliosPagos(this.arregloeliminar).subscribe(
     result => {
       $("#tablafolios").dataTable().fnDestroy();
         this.status="elimino"
         this.LoadTableData();
     },
     error => {
      if (error.status=="400"){
        $("#tablafolios").dataTable().fnDestroy();
        this.status="elimerror";
        this.LoadTableData();
      }
      else {
        console.log(error);
          this.status="elimsuccess";
          $("#tablafolio").dataTable().fnDestroy();
  
          this.LoadTableData();
      }
  }
  );
}

}