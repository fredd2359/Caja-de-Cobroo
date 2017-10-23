import { Component, OnInit } from '@angular/core';
/**CARGAMOS EL MODELO */
import { AltaFolioPago } from './models/alta-folio-pago'
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'alta-folio-pago',
    templateUrl: './alta-folio-pago.component.html',
    styleUrls: ['./alta-folio-pago.component.css']
})
export class AltaFolioComponent implements OnInit
{
    public altafoliopago: AltaFolioPago; //Instanciamos el modelo para alta de serie en PAGOS
    //public altaserieVale: Series; //Instanciamos el modelo para alta de serie en VALES
    title :string;
    
    constructor(){
        /**Inicializamos el modelo SERIE */
        this.title = "Alta en Folio de Pago";
        this.altafoliopago = new AltaFolioPago("","","");
        //this.altaserieVale = new Series("","");
    }
    ngOnInit(){
       
      }
}