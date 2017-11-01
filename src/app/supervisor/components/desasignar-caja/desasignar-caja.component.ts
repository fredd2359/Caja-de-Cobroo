import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import {Caja} from '../../../models/caja.model';
import {Cajero} from '../../../models/Cajero.model';
import { DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs/Rx';
/**ESTE MISMO SERVICIO PARA DATATABLES... */
import {SupervisorService} from '../../supervisor.service';

declare var jquery: any;
declare var $: any;
  
@Component({
  selector: 'app-desasignar-caja',
  templateUrl: './desasignar-caja.component.html',
  styleUrls: ['./desasignar-caja.component.css']
})
export class DesasignarCajaComponent implements OnInit {

  public allcajeros: Cajero[];

  public status:string;
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
  ) 
  {
    this.allcajeros=new Array();
  }

  ngOnInit() {
    this.obtenerdatos();
    this.LoadTableData();
    
  }
  obtenerdatos(){
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
          this.status="errordesasignar";
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
        $('#ModalError').modal("show");
        this.LoadTableData();
      },
      error => {
        $('#ModalCancelar').modal('hide');
        if (error.status=="400"){
          this.status="cajaerror";
          $('#ModalError').modal("show");
          this.LoadTableData();
        }else {
          this.status="cajaelim";
          $('#ModalError').modal("show");
          $("#example").dataTable().fnDestroy();
          this.obtenerdatos();
          this.LoadTableData();

        }
      }
    );
  }
}
