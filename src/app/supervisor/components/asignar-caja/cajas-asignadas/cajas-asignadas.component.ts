import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cajas-asignadas',
  templateUrl: './cajas-asignadas.component.html',
  styleUrls: ['./cajas-asignadas.component.css']
})
export class CajasAsignadasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("cajas-asignadas");
  }

}
