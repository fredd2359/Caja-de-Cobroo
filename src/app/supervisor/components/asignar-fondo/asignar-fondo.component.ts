import { Component, OnInit } from '@angular/core';
import {Caja} from '../../../models/caja.model';
import {Cajero} from '../../../models/Cajero.model';

import {SupervisorService} from '../../supervisor.service';

declare var jquery: any;
declare var $: any;
  
@Component({
  selector: 'app-asignar-fondo',
  templateUrl: './asignar-fondo.component.html',
  styleUrls: ['./asignar-fondo.component.css']
})
export class AsignarFondoComponent implements OnInit {

  public ngcajero:string;
  public ngnombrecompleto:string;
  public fondo:number;
  public cajerobol:boolean=false;
  public fondobol:boolean=false;
  public cajeroo:string;
  public ngusuario:string;
  public ngpassword:string;

  public caja:Caja;
  public cajas:Caja[];
  public cajero:Cajero;
  public cajeros: Cajero[];
  
  constructor(
    public _superService: SupervisorService /**Necesitamos el servicio */,
  ) 
  {
    this.caja=new Caja(0,"",0,"");
    this.cajas=new Array();

    this.cajero=new Cajero(0,"","",0,0,null);
    this.cajeros=new Array();
  }

  ngOnInit() {
    this.obtenerdatos();
  }

  onSubmit(){
    let a= new Array();
    a.push({cajero:this.cajero,usuario:this.ngusuario,password:this.ngpassword});
    console.log(a);
    console.log(this.cajero);
    console.log(this.ngusuario);
    console.log(this.ngpassword);    
    this._superService.asignarFondo(this.cajero,this.ngusuario,this.ngpassword).subscribe(
      result => {
        console.log("resukltado");
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerdatos(){
    //Se hace la petición para obtener todos los cajeros
    this._superService.getallCajeros().subscribe(
      //descomentar la linea de abajo y comentar la de arriba**************************************************************** !important
      // this._superService.getCajeroSinFondo().subscribe(      
      result => {
        this.cajeros=result;
        console.log("All Cajeros");
        console.log(this.cajeros);
      },
      error => {
        console.log(error);
      }
    );
  }

  selectCajero(){
    let a:string=this.ngcajero.toString();
    console.log(a);
    if (a=="Seleccionar cajero..."){
      console.log("holi");
      this.cajerobol=false;
    }
    else {
      for(let i=0; i<this.cajeros.length; i++){
        if (this.ngcajero==this.cajeros[i].nombre){
          this.cajero=this.cajeros[i];
        }
      }
      this.cajerobol=true;
      this.fondobol=true;
    }
  }

  verificarCantidad() {
    console.log(this.cajero.fondo);
    if (this.cajero.fondo >= 0) {
      this.fondobol = true;
    }
    else if (this.cajero.fondo < 0) {
      this.fondobol = false;
    }
    else {
      this.fondobol=false;
    }
  }

}
