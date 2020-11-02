import { Component,NgZone,OnInit} from '@angular/core';
//
import { FormBuilder, Validators } from '@angular/forms';
//
import { Router } from '@angular/router';
//
import { UsuarioService } from '../../services/usuario.service';
//
import Swal from 'sweetalert2';
//


declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

 public formSbmitted = false;

 public auth2:any;
 
 public loginForm =this.fb.group({
  email:   [localStorage.getItem('email') || '' ,[Validators.required,Validators.email]],
  password:['',[Validators.required]],
  remember:[false]
 });


  constructor(private router:Router,
    private usuariosService:UsuarioService, 
    private fb:FormBuilder,
    private ngzone:NgZone
    ) { }

  ngOnInit(){
    return this.renderButton();
  }

  login(){
    this.usuariosService.loginUsuario(this.loginForm.value).subscribe( data =>{
      
      if(this.loginForm.get('remember').value === true)
      {
        localStorage.setItem('email',this.loginForm.get('email').value);
      }
      else{
        localStorage.removeItem('email');
      }
        this.router.navigateByUrl('/');
    },(err)=>{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:err.error.msg
      });
    });

   // console.log(this.loginForm);
   //this.router.navigateByUrl('/');
  }

   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

   async startApp() {
   await this.usuariosService.googleInit();
   this.auth2 = this.usuariosService.auth2;
   this.attachSignin(document.getElementById('my-signin2'));

  };

   attachSignin(element) {

     this.auth2.attachClickHandler(element, {},

        (googleUser) => {

          const id_token = googleUser.getAuthResponse().id_token;

          this.usuariosService.loginGoogle(id_token).subscribe(resp =>{
             // si el logeo es correcto que me lleve al dashboard,
             //utilizo el ngzone debido a que si me autentico con google, la navegacion la hace la 
             //libreria de google por lo tanto debo utulizar el ngzone para decirle a abgualr que esta bien 
             //por lo tanto esto me evita que fallen los plugging que tengo o que se porduzca alguna falla en el html
             this.ngzone.run(() => {
              this.router.navigateByUrl('/');
             })
            
          });
      
        },(error) => {

          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
