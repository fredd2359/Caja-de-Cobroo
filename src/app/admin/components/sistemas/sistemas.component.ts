import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgModel } from "@angular/forms";
/**EL MODELO */
import { Sistema } from './models/sistemas';
/**EL SERVICIO */
import { AdminService } from '../../admin.service';
/**DATA TABLES */
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';
/**JQUERY VARIABLES */
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas.component.css']
})
export class SistemasComponent implements OnInit {
  public sistemas: Sistema;
  public getsistemas: Sistema[]; /**La propiedad de tipo arreglo, donde vaciaremos los resultados de la consulta */
  public prueba;
  public status:String;/**Propiedad para signar el estado de las peticiones */
  public arregloeliminar:any=[]; /**Es una propiedad, donde se almacena el sistema (registro) que vamos a eliminar */
  public SistemaSeleccionado: Sistema; /**Es la propiedad que va a almacenar losregistros del elemento a MODIFICAR */

  //Directivas y declaracion de variables para el uso de la tabla !important
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<string> = new Subject();
  /**PROPIEDAD PARA LOS DATOS DE LA TABLA */
  DataArray : any = [];
  /** */
  constructor(
    public _adminService: AdminService, /**Necesitamos el servicio */
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.sistemas = new Sistema (0,"","");
    this.SistemaSeleccionado = new Sistema (0,"",""); /** */
    this.getsistemas = new Array(); /**Iniciamos la variable, donde vaciaremos los resultados de la consulta GET */
    //this.SistemaSeleccionado = new Sistema("","");/**Registro a eliminar (sistema a eliminar, sólo 1) */
  }
  ngOnInit() {
  //$('#TablaSistemas').DataTable();
  this.LoadTableData(); /**CARGA LOS DATOS EN LA TABLA Y AGREGA EL SETTIME */
  this.obtenerdatos(); /**OBTIENE LOS DATOS YA CARGADOS DE LA TABLA DE ARRIVA */
  console.log("Obteniendo los datos desde BD...");
  this._adminService.getSistemas().subscribe(
    result => {
     console.log("SISTEMAS ...");
     this.getsistemas = (result.respuesta);/**Asignamos los valores obtenidos de la consulta a nuestra variable de tipo Arreglo */
     console.log(this.getsistemas);
    },
    error => {
      console.log(error);
    }
  );
  }
  onSubmit(){
    console.log("Cargando nuevos datos...");
    //this.ngOnInit();
    this.obtenerdatos();
    this.LoadTableData();
    this.ngOnInit();
    this.SistemaSeleccionado = new Sistema (0,"",""); /**CUANDO SE MANDAN LOS DATOS MODIFICADOS, REINICIAMOS */
    console.log("MEMOOOOO ESTOS SON LOS NUEVOS DATOS DESPUES DE AGREGAR UNO NUEVOOOOOO");    
    console.log(JSON.stringify(this.SistemaSeleccionado));
    /**DAR DE ALTA SISTEMAS  MET=POST*/
    this._adminService.altaSistemas(this.sistemas).subscribe(
      result => {
          console.log(result);
          $("#TablaSistemas").dataTable().fnDestroy();
          this.LoadTableData();
      },
      error => {
          console.log(error);
          if (error.status=="400"){
              $("#TablaSistemas").dataTable().fnDestroy();
              this.status="error";
              this.LoadTableData();
              this.resettt();
            }
            else {
              this.SistemaSeleccionado = new Sistema (0,"","");/**INICIALIZAR EL CLONADO */
              $("#ModalInfoAlta").modal('show');              
              console.log("algo");
              this.status="success";
              $("#TablaSistemas").dataTable().fnDestroy();
              this.LoadTableData();
              this.resettt();
              
          }
          if((error._body.substring(20,40)) == "El sistema ya existe"){
            this.status="existente";
            this.resettt();
            this.LoadTableData();
            this.SistemaSeleccionado = new Sistema (0,"",""); /**INICIALIZAR EL CLONADO */
        } 
      }
    );
/**TERMINA DAR DE ALTA SISTEMA */
  }
  /**Tratra de seleccionar sólo 1 */
  /**TERMINA Tratra de seleccionar sólo 1 */
  /**LIMPIAR FORMULARIO */
  resettt(){
    console.log("Im reset");
    var reset = document.getElementsByClassName("resett");
      for (var i = 0; i < reset.length; i++) {
        reset[i].innerHTML = "";
      }
    $('#formAgregaSistema').trigger("reset");
  }
  /**TERMINA LIMPIAR FORMULARIO */
/**OBTENER DATOS */
  obtenerdatos(){
    //Se hace la petición de las cajas que están libres
    console.log("Se extraen los registros ...");
    this._adminService.getSistemas().subscribe(
     result => {
      console.log("SISTEMAS ...");
      this.getsistemas = (result.respuesta);/**Asignamos los valores obtenidos de la consulta a nuestra variable de tipo Arreglo */
      console.log(this.getsistemas);
     },
     error => {
       console.log(error);
     }
   );
 }
 /**TERMINA MÉTODO PARA OBTENER DATOS */
 /**MÉTODO PARA CARGAR LOS DATOS DE LA TABLA Y USAR DATATABLES... */
 LoadTableData() {
  this._adminService.getSistemas().subscribe(
    result => {
      this.DataArray = result.respuesta;
      this.prueba = this.DataArray;
      console.log(" Datos del array para la tabla....");
      console.log(this.DataArray);
      this.loadTable();
    },
    error => {
      console.log("Un error inesperado ha ocurrido:");
      console.log(error);
    }
  );
}
loadTable(): void {
  console.log("biien");
  setTimeout(function () {
    $(function () {
     $('#TablaSistemas').dataTable();
    });
  }, 1000);
}
 /**TERMINA MÉTODO PARA CARGAR LOS DATOS DE LA TABLA Y USAR DATATABLES... */
/**MÉTODO OBTIENE DATOS DE SISTEMAS (REGISTROS)  */
 selectcheck2(i){
  //let self=this;
  //var texto="";
  //var fol:number;
  //let index:number=i;
  try{
  let check:number=i;
  console.log("Elemento seleccionado");
  console.log(i);
  for(let a=0 ; a < this.getsistemas.length;a++){
    if (a==i){
      
      console.log(this.getsistemas[a]);
      
      if ((this.getsistemas[a])){
        console.log("registros!!!");
        
      }
      else{
        console.log("Holaaaaaa else principal");
      if ($('#check'+check).is(":checked")){
      console.log("if de check");
      break;
      }
      else {
        console.log("else de check");
      }
    }
  }  
  else{
    //console.log("Ocurrió algo feo my friend");
    console.log("error");
  }
}
  if(this.getsistemas[i] == null){
    console.log("Ocurrió algo feo my friend x2");
    this.ngOnInit();
  }
  else{
console.log("Elemento a eliminar:");
console.log(JSON.stringify(this.getsistemas[i])); /**Este es el dato (sistema a eliminar) */
this.SistemaSeleccionado = this.getsistemas[i];
console.log("ISISISIS");
console.log(this.SistemaSeleccionado);
  }

  }catch(err){
    console.log("Ocurrió algo feo my friend");

    console.log(err.message);
  }
}
/**TERMINA MÉTODO OBTIENE SISTEMA MEDIENTE  */
 /**MÉTODO ELIMINAR SÓLO UN SISTEMA */
 eliminarSistema(){
  console.log("Arreglo a eliminiar");
  console.log(this.SistemaSeleccionado);

this._adminService.bajaSistema(this.SistemaSeleccionado).subscribe(
   result => {
     $("#TablaSistemas").dataTable().fnDestroy();
       this.LoadTableData();
   },
   error => {
    if (error.status=="400"){
      this.status='Noeliminadoo';
      $("#TablaSistemas").dataTable().fnDestroy();
      //this.LoadTableData();
      this.ngOnInit();
    }
    else {
      this.SistemaSeleccionado = new Sistema (0,"","");/**INICIALIZAR EL CLONADO */
      this.status = 'eliminadoo';
      console.log("aquiuiuiuiu");
      console.log(error);
        $("#TablaSistemas").dataTable().fnDestroy();
        //this.LoadTableData();
        this.ngOnInit();
     }
    });
 }
 /**TERMINA MÉTODO ELIMINAR SÓLO UN SISTEMA */
/**CARGA DATOS A MODAL */
 asignarCat(i) {
  let check:number=i;
  console.log("Elemento seleccionado");
  console.log(i);
  for(let a=0 ; a < this.getsistemas.length;a++){
    if (a==i){
      
      console.log(this.getsistemas[a]);
      
      if ((this.getsistemas[a])){
        console.log("registros!!!");
      }
      else{
        console.log("Holaaaaaa else principal");
      if ($('#check'+check).is(":checked")){
      console.log("if de check");
      break;
      }
      else {
        console.log("else de check");
      }
    }
  }  
  else{
    console.log("error");
  }
}
console.log("Elemento a MODIFICAR:");
console.log(JSON.stringify(this.getsistemas[i])); /**Este es el dato (sistema a eliminar) */
this.SistemaSeleccionado = this.simpleClone(this.getsistemas[i]);
console.log("ISISISIS");
console.log(this.SistemaSeleccionado.nombre);
}
/**TERMINA CARGA DATOS A MODAL */
/**EXTRAER DATOS DE LA BD PARA MODIFICAR */
onSubmitMod() {
}
simpleClone(obj: any) {
  return Object.assign({}, obj);
}
/**TERMINA EXTRAER DATOS DE LA BD PARA MODIFICAR */

/**EDITAR-MODIFICAR LOS SISTEMAS 26/10/2017 
 * CUANDO YA ABRIÓ MODAL Y ESCRIBISTE NUEVA INFO..
 * ENTONVES CIERRA MODAL Y ACTUALIZA TODO
*/
modificarSistema(){
  $("#ModalModificaSistema").modal('hide');
  console.log("Holaaa modificar");
  this._adminService.modificarSistema(this.SistemaSeleccionado).subscribe(
    result => {
      this.status = 'errormodificado';
      //this.productos = result;
      console.log(JSON.stringify(result));
      $("#TablaSistemas").dataTable().fnDestroy(); /**UN INTENTO DE REINICIAR LA TABLA Y LLAMAR LOS MÉTODOS PRINCIPALES */
      this.ngOnInit();
      //this.productos = null;
      
    },
    error => {
      this.status = 'modificado';
      console.log("Producto Modificado con éxito!");
      console.log(error);
      this.SistemaSeleccionado = new Sistema (0,"","");
      $("#TablaSistemas").dataTable().fnDestroy(); /**UN INTENTO DE REINICIAR LA TABLA Y LLAMAR LOS MÉTODOS PRINCIPALES */      
      this.ngOnInit();
      /**SE EXTRAEN DE NUEVO LOS DATOS DE LA BD */
      this._adminService.getSistemas().subscribe(
        result2 => {
          console.log("Productos modificados ya cargados...");
          console.log("EL resultado 2??");
          console.log(JSON.stringify(result2));
          this.LoadTableData();
        },
        error => {
          console.log(error);
        }
      );
      /**cargamos de nuevo la table */
      $("#TablaSistemas").dataTable().fnDestroy();
      this.LoadTableData();
      this.SistemaSeleccionado = new Sistema (0,"","");
      //this.cate = this.productoSeleccionado.categoria;
    }
  );
}
}
