import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) {}

  iniciarSesion(correo:string, contrasena:string){

    const url = environment.URL_DOMINIO +'/auth/singin';

    const data = {
      email : correo,
      password : contrasena
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    return this.http.post(url,JSON.stringify(data),options);

  }


}
