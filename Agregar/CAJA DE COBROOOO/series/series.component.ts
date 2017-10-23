import { Component, OnInit } from '@angular/core';
/**CARGAMOS EL MODELO */
import { SeriesPago } from './models/seriesPago';

declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit
{
    public altaserie: SeriesPago; //Instanciamos el modelo para alta de serie en PAGOS
    public altaserieVale: SeriesPago; //Instanciamos el modelo para alta de serie en VALES
    title :string;
    title2:string;
    constructor(){
        /**Inicializamos el modelo SERIE */
        this.title = "Alta de Series en Pago";
        this.title2 = "Alta de Series en Vales";
        this.altaserie = new SeriesPago("","");
        this.altaserieVale = new SeriesPago("","");
    }
    ngOnInit(){
       
      }
}