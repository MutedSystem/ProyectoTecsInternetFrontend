import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) {}

  iniciarSesion(data:any){

    const url = environment.URL_DOMINIO +'/auth/singin';

    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    return this.http.post(url,JSON.stringify(data),options);

  }

  registrar(data: any){

    const url = environment.URL_DOMINIO +'/auth/singup';

    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    return this.http.post(url,JSON.stringify(data),options);

  }

}
