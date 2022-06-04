import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) { }

  makeBuy(data:any){
    let token = JSON.parse(localStorage.getItem('CrearteData') as string).token;

    let url = environment.URL_DOMINIO + '/buy';

    let options = {
      headers: {
        "x-access-token": token
      }
    }

    return this.http.post(url,data,options);

  }

  seeBuy(){
    let token = JSON.parse(localStorage.getItem('CrearteData') as string).token;

    let url = environment.URL_DOMINIO + '/buy/see';

    let options = {
      headers: {
        "x-access-token": token
      }
    }

    return this.http.get(url,options);

  }

}
