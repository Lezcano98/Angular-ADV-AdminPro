
import {environment} from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario{

    constructor(
      
       public nombre  :  string,
       public email   :  string,
       public password?:  string,
       public img?    :  string,
       public google? :  boolean,
       public role?   :  string,
       public uid?    :  string

    ){}


    get imagenUrl(){
      if(!this.img){
        return `${base_url}/uploads/usuarios/no-image`;
       }
        //para ver la imagen si me logeo con google 
       else if(this.img.includes('https')){
        return this.img;
         }
         
         else if(this.img){
             return `${base_url}/uploads/usuarios/${this.img}`;
         }

        else{
            return `${base_url}/uploads/usuarios/no-image`;
        }
       
    }
}