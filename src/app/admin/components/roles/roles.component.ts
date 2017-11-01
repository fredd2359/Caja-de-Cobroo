import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgModel } from "@angular/forms"; /**PARA PODER USAR EL NGMODEL EN EL HTML */

/**MODELS */
import { Rol } from './models/roles'
/**EL SERVICIO */
import { AdminService } from '../../admin.service';
/**DATA TABLES */
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';
/**JQUERY VARIABLES */
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  public role:Rol;
  public roles: Rol[]; /**La propiedad de tipo arreglo, donde vaciaremos los resultados de la consulta */
  public prueba; /**Algo que usamos en DATA-ARRAY */
  public status:String;/**Propiedad para signar el estado de las peticiones */
  public rolSeleccionado: Rol; /**Aqui será en donde almacenaremos 1 registro para eliminar o modificar */
  //

  //Directivas y declaracion de variables para el uso de la tabla !important
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<string> = new Subject();
  /**PROPIEDAD PARA LOS DATOS DE LA TABLA */
  DataRoles : any = [];
  /** */
  constructor(
    public _adminService: AdminService, /**Necesitamos el servicio */
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.role = new Rol(0,"");
    this.roles = new Array(); /**Iniciamos la variable, donde vaciaremos los resultados de la consulta GET */
    this.rolSeleccionado = new Rol (0,""); /** La usamos al modificar un registro */
  }
  ngOnInit() {
    //console.log(this.role);
    this.obtenerRoles(); /**MÉTODO QUE OBTIENE LOS DATOS YA CARGADOS DE LA TABLA DE ARRIVA */    
    this.LoadTableData(); /**CARGA LOS DATOS EN LA TABLA Y AGREGA EL SETTIME:POR  SERVIDOR */
    
    //$('#TablaRoles').DataTable(); /**CARGA DATOS DE LA TABLA DE MANERA LOCAL: SIN SERVIDOR */
    console.log("Obteniendo los datos desde BD...");
    this._adminService.getSistemas().subscribe(
      result => {
       console.log("ROLESS ...");
       this.roles = (result.respuesta);/**Asignamos los valores obtenidos de la consulta a nuestra variable de tipo Arreglo */
       console.log(this.roles);
      },
      error => {
        console.log(error);
      }
    );
  }
  onSubmit(){
    this.obtenerRoles();
    this.LoadTableData();    
    this.rolSeleccionado = new Rol (0,"");/**INICIALIZAR EL CLONADO */
    

    console.log("Cargando nuevos datos...");
    $("#TablaRoles").dataTable().fnDestroy();    
    this.ngOnInit();

    this.rolSeleccionado = new Rol (0,""); /**CUANDO SE MANDAN LOS DATOS MODIFICADOS, REINICIAMOS */
    console.log(JSON.stringify(this.rolSeleccionado));
    /**DAR DE ALTA ROLES */
    this._adminService.altaRoles(this.role).subscribe(
      result => {
          console.log(result);
          $("#TablaRoles").dataTable().fnDestroy();
          this.LoadTableData();
      },
      error => {
          console.log(error);
          if (error.status=="400"){
              $("#TablaRoles").dataTable().fnDestroy();
              this.status="error";
              this.LoadTableData();
              this.resettt(); /**resettt, es un método para limpiar el formulario de entrada de datos al momento de dar de alta un nuevo registro */
            }
            else {
              this.rolSeleccionado = new Rol (0,"");/**INICIALIZAR EL CLONADO */
              this.role = new Rol(0,"");


              $("#ModalInfoAlta").modal('show');              
              //console.log("algo");
              this.status="success";
              $("#TablaRoles").dataTable().fnDestroy();
              this.LoadTableData();
              this.resettt();
              this.role = new Rol(0,"");
              
          }
          if((error._body.substring(20,36)) == "El rol ya existe"){
            this.status="existente";
            this.resettt();
            this.LoadTableData();
            this.rolSeleccionado = new Rol (0,""); /**INICIALIZAR EL CLONADO */
        } 
      }
    );
    /**TERMINA DAR DE ALTAS ROLES */
  }
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
  /**EXTRAER LOS ROLES */
  obtenerRoles(){
    console.log("Se extraen los registros ...");
    this._adminService.getRoles().subscribe(
     result => {
      console.log("ROLES ...");
      this.roles = (result.respuesta);/**Asignamos los valores obtenidos de la consulta a nuestra variable de tipo Arreglo */
      console.log(this.roles);
     },
     error => {
       console.log(error);
     }
   );
  }

  /**TERMINA EXTRAER LOS ROLES */

  /**MÉTODO PARA CARGAR LOS DATOS DE LA TABLA Y USAR DATATABLES... */
 LoadTableData() {
  this._adminService.getRoles().subscribe(
    result => {
      this.DataRoles = result.respuesta;
      console.log("¿QUÉ ES PRUEBA?...");
      this.prueba = this.DataRoles;
      console.log(" Datos del array para la tabla....");
      console.log(this.DataRoles);
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
  $("#TablaRoles").dataTable().fnDestroy();  
  setTimeout(function () {
    $(function () {
     $('#TablaRoles').dataTable();
    });
  }, 1000);
}
 /**TERMINA MÉTODO PARA CARGAR LOS DATOS DE LA TABLA Y USAR DATATABLES... */

 selectcheck2(i){
  this.rolSeleccionado.id = this.obtenerRoles[i].id;
}
/**TERMINA MÉTODO OBTIENE SISTEMA MEDIENTE  */

 /**ELIMINAR ROL */
 eliminarRoles(){
  console.log("Rol a eliminiar");
  console.log(this.rolSeleccionado);

this._adminService.bajaRoles(this.rolSeleccionado).subscribe(
   result => {
     $("#TablaRoles").dataTable().fnDestroy();
       this.LoadTableData();
   },
   error => {
    if (error.status=="400"){
      this.status='Noeliminadoo';
      $("#TablaRoles").dataTable().fnDestroy();
      //this.LoadTableData();
      this.ngOnInit();
    }
    else {
      this.rolSeleccionado = new Rol (0,"");/**INICIALIZAR EL CLONADO */
      this.status = 'eliminadoo';
      console.log("aquiuiuiuiu");
      console.log(error);
        $("#TablaRoles").dataTable().fnDestroy();
        //this.LoadTableData();
        this.ngOnInit();
     }
    });
 }

 asignarCat(i) {
  this.rolSeleccionado.rol = this.obtenerRoles[i].rol;

  let check:number=i;
  console.log("Elemento seleccionado");
  console.log(i);
  for(let a=0 ; a < this.roles.length;a++){
    if (a==i){
      
      console.log(this.roles[a]);
      
      if ((this.roles[a])){
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
console.log(JSON.stringify(this.roles[i])); /**Este es el dato (sistema a eliminar) */
this.rolSeleccionado = this.simpleClone(this.roles[i]);
console.log("AQUIII");
//console.log(this.rolSeleccionado.rol);
}
/**TERMINA CARGA DATOS A MODAL */
/**EXTRAER DATOS DE LA BD PARA MODIFICAR */
onSubmitMod() {
}
simpleClone(obj: any) {
  return Object.assign({}, obj);
}
/**TERMINA EXTRAER DATOS DE LA BD PARA MODIFICAR */
/**MODIFICAR LOS ROLES */

modificarRoles(){
  $("#ModalModificaRol").modal('hide');
  console.log("Holaaa modificar");
  this._adminService.modificarRoles(this.rolSeleccionado).subscribe(
    result => {
      this.status = 'errormodificado';
      //this.productos = result;
      console.log(JSON.stringify(result));
      $("#TablaRoles").dataTable().fnDestroy(); /**UN INTENTO DE REINICIAR LA TABLA Y LLAMAR LOS MÉTODOS PRINCIPALES */
      this.ngOnInit();
      //this.productos = null;
      
    },
    error => {
      this.status = 'modificado';
      console.log("Producto Modificado con éxito!");
      console.log(error);
      this.rolSeleccionado = new Rol (0,"");
      $("#TablaRoles").dataTable().fnDestroy(); /**UN INTENTO DE REINICIAR LA TABLA Y LLAMAR LOS MÉTODOS PRINCIPALES */      
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
      $("#TablaRoles").dataTable().fnDestroy();
      this.LoadTableData();
      this.rolSeleccionado = new Rol (0,"");
      //this.cate = this.productoSeleccionado.categoria;
    }
  );
}
onClearModal() {
  //this.ngOnInit();
  //this.LoadTableData();
  console.log("Recarga de datos nuevos");
  //console.log("RESET");
  //$("#exampleModalP").reset();
  console.log(this.rolSeleccionado.rol);
  $("#ModalModificaSistema").on("hidden.bs.modal", e => {
    $(".modal-body")
      .find("#nombre") //.find("textarea,input")
      .val('{{SistemaSeleccionado.nombre}}');
  });
}
/**TERMINA MODIFICAR LOS ROLES */
 /**TERMINA ROL */
 clear(){
  console.log("Hola");
  this.obtenerRoles();
  this.LoadTableData();
  this.rolSeleccionado = new Rol (0,"");/**INICIALIZAR EL CLONADO */
  console.log("Cargando nuevos datos...");
  $("#TablaRoles").dataTable().fnDestroy();    
  this.ngOnInit();

  //this.LoadTableData();
  //this.ngOnInit();
  this.rolSeleccionado = new Rol (0,""); /**CUANDO SE MANDAN LOS DATOS MODIFICADOS, REINICIAMOS */
  console.log("MEMOOOOO ESTOS SON LOS NUEVOS DATOS DESPUES DE AGREGAR UNO NUEVOOOOOO");    
  console.log(JSON.stringify(this.rolSeleccionado));
  /**DAR DE ALTA SISTEMAS  MET=POST*/
}
}
