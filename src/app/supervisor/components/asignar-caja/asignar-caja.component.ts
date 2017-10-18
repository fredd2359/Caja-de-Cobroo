import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import {Caja} from '../../../models/caja.model';
import {Cajero} from '../../../models/cajero.model';

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
export class AsignarCajaComponent implements OnInit {
  public caja:Caja;
  public cajas:Caja[];
  public cajero:Cajero;
  public cajeros: Cajero[];
  public cajeros2;
  public modfondo=false;
  public cajerofondo=0;
  public cajabol : boolean=false;
  public cajerobol:boolean= false;
  public fondobol:boolean= false;
  public status:string;
  public caj;
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
    this.cajeros=new Array();
    this.cajeros2=new Array();
    
    } 
  

  ngOnInit() {
    /**FUNCION PARA CARGAR DATATABLE
     * 
     */
     /**TERMINA FUNCIÓN DE CARGA DEL DATATABLE */

    this.LoadTableData();


    this.obtenerdatos();

        console.log(this.cajeros);

        this.seleccionarcheck();
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
        this.cajeros=result.respuesta;
        console.log("Cajeros libres");
        console.log(this.cajeros);
      },
      error => {
        console.log(error);
      }
    );
    //prueba!!
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
    }
    else {
      this.modfondo=true;
    }
  }

  onSubmit(){
    this.cajero.fondo=this.cajerofondo;
    this.caja.estatus='PENDIENTE';
    this.cajero.cajas=this.caja;

    
    let res = this.cajero;
    this._superService.asignarCaja(this.cajero).subscribe(
      result =>{
        console.log("Se envio con éxito");
        this.obtenerdatos();
      },
      error =>{
        if (error.status=="400"){
          this.status="error";
          this.obtenerdatos();
        }
        else{
          this.status="success";
          this.obtenerdatos();
        }
        console.log("Error en Submit de asignar caja, asignarCaja");
        console.log(error.status);
      }
    );
    

    this.caja=new Caja(0,"",0,"");
    this.cajero=new Cajero(0,"","",0,0,null);
    this.cajabol=false;
    this.cajerobol=false;
  }


  //Metodo que se ejecuta despues de seleccionar una caja
  seleccCaja(){
    for(let i = 0; i < this.cajas.length; i++){
      if(this.caja.nombre==this.cajas[i].nombre){
        this.caja.id=this.cajas[i].id;
        this.caja.sucursal=this.cajas[i].sucursal;
        this.caja.estatus=this.cajas[i].estatus;
        console.log(this.caja);
      
      }
      if(this.caja.nombre==""){
        this.cajabol=false;
      }
      else {
        this.cajabol=true;
      }
    }
    console.log(this.cajabol);
    console.log(this.cajerobol);
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
    if (this.cajerofondo > 0) {
      this.fondobol = true;
    
    }
    else if (this.cajerofondo <= 0) {
      this.fondobol = false;
    }
    else {
      this.fondobol=false;
    }
  }
  
  //Metodo para desasignar cajas seleccionadas

  removerSeleccion() {
    //OBTENER TABLA
    var table = <HTMLTableElement>document.getElementById("cajas");

    var tmp = new Array<Cajero>();
    //VERIFICAR TOTAL DE RENGLONES A ELIMINAR
    let totalSeleccion = 0;
    for (var i = 1; i < table.rows.length; i++) {
      let checkbox = <HTMLInputElement>table.rows[i].cells[0].firstElementChild;
      if (!checkbox.checked){
        tmp.push(this.cajeros[i - 1]);
      }
      else{
        let caja=<HTMLInputElement>table.rows[i].cells[1].firstElementChild;
        let cajero=<HTMLInputElement>table.rows[i].cells[2].firstElementChild;

      }
    }

    // this.productos = tmp;

    // console.log('TOTAL_SEL:' + totalSeleccion);

    // localStorage.setItem('cajas', JSON.stringify(this.productos));

    // //VERIFICAR LISTA
    // if (this.productos.length > 0)
    //   this.listaVacia = false;
    // else
    //   this.listaVacia = true;
  }
  /**MÉTODO PARA CARGAR LOS DATOS DE LA TABLA Y USAR DATATABLES... */
  LoadTableData() {
    this._superService.getcajasCajeros().subscribe(
      result => {
        console.log("nuevo");
        this.cajeros2=result;
        this.DataArray = result.respuesta;
        console.log(" Datos del array para la tabla....");
        console.log(this.DataArray);
        this.loadTable();
      },
      error => {
        console.log(error);
      }
    );

     
    /** 
    this._superService.LoadData().subscribe(
      _superService => {
        this.DataArray = _superService;
        console.log("QWERTY...");
        console.log(JSON.stringify(this._superService));
      }
    );
    */
  }

  loadTable(): void {
    setTimeout(function () {
      $(function () {
        $('#example').DataTable();
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
