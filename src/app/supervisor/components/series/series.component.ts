import { Component, OnInit } from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit
{
    title :string;
    title2:string;
    constructor(){
        /**Inicializamos el modelo SERIE */
        this.title = "Alta de Series en Pago";
        this.title2 = "Alta de Series en Vales";
    }
    ngOnInit(){
       
      }
}