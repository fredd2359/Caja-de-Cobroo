import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'folios',
    templateUrl: './folios.component.html',
    styleUrls: ['./folios.component.css']
})
export class FoliosComponent implements OnInit
{
    title = 'Hola';

    /**Función de JQUERY */
    ngOnInit(){
        $(document).ready(function() {
          console.log("Jquery funcionando!");
          //selectores
          $('.title').css({'color':'lightgray'})
      });
      }

    /**Función de JQUERY */
    toggleTitle()
    {
        $('.title').slideToggle(); 
    }
    /**Termina función JQUERY */
}