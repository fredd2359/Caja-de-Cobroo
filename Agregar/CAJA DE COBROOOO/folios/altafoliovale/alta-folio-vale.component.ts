import { Component, OnInit } from '@angular/core';
/**CARGAMOS EL MODELO */
import { AltaFolioVale } from './models/alta-folio-vale'
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'alta-folio-vale',
    templateUrl: './alta-folio-vale.component.html',
    styleUrls: ['./alta-folio-vale.component.css']
})
export class AltaFolioValeComponent implements OnInit
{
    public altafoliovale: AltaFolioVale; //Instanciamos el modelo para alta de serie en PAGOS
    //public altaserieVale: Series; //Instanciamos el modelo para alta de serie en VALES
    title :string;
    
    constructor(){
        /**Inicializamos el modelo SERIE */
        this.title = "Alta en Folio de Vales";
        this.altafoliovale = new AltaFolioVale("","","");
        //this.altaserieVale = new Series("","");
    }
    ngOnInit(){
       
      }
}