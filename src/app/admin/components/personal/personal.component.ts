import { Component, OnInit } from '@angular/core';
/**MODELO */
import { altaPersonal } from './models/personal';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  public altapersonal:altaPersonal;

  constructor() { 
    this.altapersonal = new altaPersonal("","","","","","","","",0,0,0,0,"","","","","",0,0,"","");
  }
  ngOnInit() {
  }

}
