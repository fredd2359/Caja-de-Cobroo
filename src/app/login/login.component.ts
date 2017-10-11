import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Usuario} from '../models/usuario.model'; 


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario :Usuario;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit() {
  }

}
