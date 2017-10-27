import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import {Caja} from '../../../models/caja.model';
import {Cajero} from '../../../models/Cajero.model';
import { DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs/Rx';
/**ESTE MISMO SERVICIO PARA DATATABLES... */
import {SupervisorService} from '../../supervisor.service';

/**IMPORTAMOS EL MODULO DE DATATABLES... */
//import {  }

declare var jquery: any;
declare var $: any;
  
@Component({
  selector: 'asignar-caja',
  templateUrl: './asignar-caja.component.html',
  styleUrls: ['./asignar-caja.component.css']
})

export class AsignarCajaComponent implements OnInit{
  public caja:Caja;
  public cajas:Caja[];
  public cajero:Cajero;
  public allcajeros: Cajero[];
  public cajeros: Cajero[];
  public cajeros2;
  public modfondo=false;
  public cajerofondo=0;
  public cajabol : boolean=false;
  public cajerobol:boolean= false;
  public fondobol:boolean= false;
  public modbol:boolean=true;
  public status:string;
  public caj;
  public fondotemp;
  public cajaEliminar:number=0;
  public prueba;

  //Directivas y declaracion de variables para el uso de la tabla !important
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
dtTrigger: Subject<string> = new Subject();
  /**PROPIEDAD PARA LOS DATOS DE LA TABLA */
  DataArray : any = [];
  /** */

  constructor(
    public _superService: SupervisorService /**Necesitamos el servicio */,
    private _route: ActivatedRoute,
    private _router: Router
  ) {


    this.caja=new Caja(0,"",0,"");
    this.cajas=new Array();

    this.cajero=new Cajero(0,"","",0,0,null);
    this.allcajeros=new Array();
    this.cajeros=new Array();
    this.cajeros2=new Array();
    }

  ngOnInit() {
    //Se cargan los datos para la tabla y el manejo de ellos
    this.obtenerdatos();
  
    $('#caj').prop('readonly', true);
    //Se cargan los datos de la tabla
    this.LoadTableData();
    
  }

  onSubmit(){
    this.cajero.fondo=this.cajerofondo;
    this.caja.estatus='PENDIENTE';
    this.cajero.cajas=this.caja;
    console.log("Cajero asignar");
    console.log(this.cajero);
    

    this._superService.asignarCaja(this.cajero).subscribe(
     
      result =>{
        console.log("Se envio con éxito");
        $("#example").dataTable().fnDestroy();
        this.obtenerdatos();
        this.LoadTableData();
      },
      error =>{
        if (error.status=="400"){
          $("#example").dataTable().fnDestroy();
          this.status="error";
          this.obtenerdatos();
          this.LoadTableData();
        }
        else{
          $("#example").dataTable().fnDestroy();
          this.status="success";
          this.obtenerdatos();
          this.LoadTableData();
        }
        
        if((error._body.substring(20,46)) == "Fondo mayor a lo permitido"){
          console.log("FONDO MAYOR ....");
          this.status="fondomayor";
        }

        if((error._body.substring(20,43)) == "Fondo menor o igual a 0"){
          console.log("FONDO IGUAL O MENOR A CERO ....");
          this.status="fondoiguala0";
        }
        console.log("Error en Submit de asignar caja, asignarCaja");
        console.log(error);
        //console.log("HEADERS...");
        //console.log(JSON.stringify(error));
        //console.log(JSON.stringify(error._body.substring(20,46))) /**EXTRAEMOS EL MENSAJE DE ERROR */
        
      }
      
    );

    this.caja=new Caja(0,"",0,"");
    this.cajero=new Cajero(0,"","",0,0,null);
    this.cajabol=false;
    this.cajerobol=false;
  }

  obtenerdatos(){
     //Se hace la petición de las cajas que están libres
     this.cajeros=null;
     this.cajas=null;
     this._superService.getCaja("LIBRE").subscribe(
      result => {
        this.cajas=(result.respuesta);
        console.log("Cajas libres");
        console.log(this.cajas);
      },
      error => {
        console.log(error);
      }
    );
    //Se hace la peticion para los cajeros que estan libres
    this._superService.getCajero().subscribe(
      result => {
        this.cajeros=result;
        console.log("Cajeros libres");
        console.log(this.cajeros);
      },
      error => {
        console.log(error);
      }
    );

    //Se hace la petición para obtener todos los cajeros
    this._superService.getallCajeros().subscribe(
      result => {
        this.allcajeros=result;
        console.log("All Cajeros");
        console.log(this.allcajeros);
      },
      error => {
        console.log(error);
      }
    );

    //Petición para obtener todas las cajas y cajeros para después meterlos en la tabla.
    this._superService.getcajasCajeros().subscribe(
      result => {
        console.log("cajascajeros");
        this.cajeros2=result;
        console.log("Estos son los datos...");
        console.log(JSON.stringify(this.cajeros2));
      },
      error => {
        console.log(error);
      }
    );
  }

  cambiarfondo(){
    if( this.modfondo==true){
      this.modfondo=false;
      this.readOnly();
    }
    else {
      this.modfondo=true;
      this.notreadOnly();
    }
    if( this.modbol==true){
      this.modbol=false;
    }
    else {
      this.modbol=true;
    }
  }

  //Método para asiganr la cantidad anterior si es que se cancela el modificar fondo
  cancelfondo(){
    this.cajerofondo=this.cajero.fondo;
  }

  //Metodo que se ejecuta despues de seleccionar una caja
  seleccCaja(){
    for(let i = 0; i < this.cajas.length; i++){
      if(this.caja.nombre==this.cajas[i].nombre){
        this.caja.id=this.cajas[i].id;
        this.caja.sucursal=this.cajas[i].sucursal;
        this.caja.estatus=this.cajas[i].estatus;
      }
      if(this.caja.nombre==""){
        this.cajabol=false;
      }
      else {
        this.cajabol=true;
      }
    }
  }

  //Método que se ejecuta cunado se selecciona un cajero
  seleccCajero(){
    for(let i = 0; i < this.cajeros.length; i++){
      if(this.cajero.nombre==this.cajeros[i].nombre){
        this.cajero.idCajero=this.cajeros[i].idCajero;
        this.cajero.apellidos=this.cajeros[i].apellidos;
        this.cajero.id=this.cajeros[i].id;
        this.cajero.fondo=this.cajeros[i].fondo;
        this.cajerofondo=this.cajeros[i].fondo;
        this.fondotemp=this.cajeros[i].fondo;
        
      }
      if(this.cajero.nombre=="Seleccionar cajero..."){
        this.cajerobol=false;
      }
      else {
        this.cajerobol=true;
      }
    }
  }

  verificarCantidad() {
    console.log(this.cajero.fondo);
    if (this.cajerofondo >= 0) {

      this.fondobol = true;

    }
    else if (this.cajerofondo < 0) {
      this.fondobol = false;
    }
    else {
      this.fondobol=false;
    }
  }

  /**MÉTODO PARA CARGAR LOS DATOS DE LA TABLA Y USAR DATATABLES... */
  LoadTableData() {
    this._superService.getcajasCajeros().subscribe(
      result => {
        this.DataArray = result.respuesta;
        this.prueba=this.DataArray;
        console.log(" Datos del array para la tabla....");
        console.log(this.DataArray);
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
    
       $('#example').dataTable();

      });
    }, 1000);
  }



  removerCaja(a){
    for(let i = 0; i < this.allcajeros.length; i++){
      if(this.DataArray[a].nombrecajero==this.allcajeros[i].nombre){
        if (this.DataArray[a].estatus=="PENDIENTE"){
        console.log(this.allcajeros[i].cajas.estatus);
        this.cajaEliminar=i;
        $('#ModalCancelar').modal('show');
        console.log(this.allcajeros[i]);
        //desasignarCaja
        }
        else {
          $('#ModalError').modal('show');
        }
        break;
      }
    }
  }

  desasignar(){
    this._superService.desasignarCaja(this.allcajeros[this.cajaEliminar]).subscribe(
      result => {
        this.status="cajaelim";
        console.log("Se desasigno con éxito");
        $('#ModalCancelar').modal('hide');
        this.LoadTableData();
      },
      error => {
        $('#ModalCancelar').modal('hide');
        if (error.status=="400"){
          this.status="cajaerror";
          this.LoadTableData();
        }else {
          this.status="cajaelim";
          $("#example").dataTable().fnDestroy();
          this.obtenerdatos();
          this.LoadTableData();

        }
      }
    );
  }

  readOnly(){
    $('#caj').prop('readonly', true);
  }
  notreadOnly(){
    $('#caj').prop('readonly', false);
  }
}
