import { Component } from '@angular/core';
//
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//
import { UsuarioService } from '../../services/usuario.service';
//
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
     
    nombre:   ['carlos',[ Validators.required,Validators.minLength(3) ] ],
    email:    ['carlos@gmail.com',[Validators.required,Validators.email]],
    password: ['12345',[Validators.required,Validators.minLength(2)]],
    password2:['12345',[Validators.required,Validators.minLength(2)]],
    terminos: [true,Validators.required],

  },{
    validators:this.passowrdIguales('password','password2')
  });

  constructor(private fb:FormBuilder,private usuariosService:UsuarioService,private router:Router) { }

  crearUsuario(){
    this.formSubmitted=true;

    console.log(this.registerForm.value);
    // si es el formulario es invalido no hacer nada 
    if(this.registerForm.invalid){
      return;
    }
    else{
      // si el fomulario es valido realizo el posteo
      this.usuariosService.crearUsuario(this.registerForm.value)
      .subscribe( data=>{
       // si el registro es exitoso enviarlo al dashboard
       this.router.navigateByUrl('/');
      },(err)=>{
        //si pasa un error 
        Swal.fire({
          icon:'error',
          title:'Error',
          text:err.error.msg
        });

      });
        
    }


  }

  compoNovalido(campo:string):boolean{
   
    if(this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    }  
    else{
      return false
    }
  }
  passwordsNovalidos(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSubmitted){
     return true;
    }
    else{
      return false;
    }
  }

  aceptarTerminos(){
    //! siginifa negacion osea el lado contrario si esta true con ! lo evaluo como su contraio osea false
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passowrdIguales(pass1:string,pass2:string){

   return ( formGroup:FormGroup ) => {
    const pas1control = formGroup.get(pass1);
    const pas2control = formGroup.get(pass2);

    if(pas1control.value === pas2control.value){
      pas2control.setErrors(null);
    }
    else{
      pas2control.setErrors({noEsigual:true});
    }

   }
  }

}
