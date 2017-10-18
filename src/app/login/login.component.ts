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

  onSubmit(){
//     this._usuarioService.signup(this.usu).subscribe(
//       response =>{
//           this.identity=response.issetUser;
//           if(!this.identity || !this.identity._id){
//               alert('El usuario no ha entrado');
//           }
//           else{
//               localStorage.setItem('identity',JSON.stringify(this.identity));
//               //mostrar identity
//               console.log(this.identity);
//               //conseguir el token
//               this._usuarioService.signup(this.usu,'true').subscribe(
//                   response =>{
//                       this.token=response.token;
//                       if(this.token<=0){
//                           alert('El token no se ha generado');
//                       }
//                       else{
//                           localStorage.setItem('token',(this.token));
//                           console.log(this.token);
//                           this.status='success';
//                           this._router.navigate(['/home']);
//                       }
//                   },  
//                   error => {
//                       var errorMessage=(<any>error);
//                       if (errorMessage!=null){
//                           var body=JSON.parse(error._body);
//                           this.status='error';
//                       }
//                   }
//               );
//           }
//       },  
//       error => {
//           var errorMessage=(<any>error);
//           if (errorMessage!=null){
//               var body =JSON.parse(error._body);
//               this.status='error';
//           }
//       }
//   );
  }
}
