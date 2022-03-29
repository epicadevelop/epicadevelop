import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtilService } from '../services/http-util.service';
import { environment as env } from '../../environments/environment';
import { Contrato } from '../domain/model/contrato';


@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private readonly path: string = '/contrato/{proposta}'

  constructor(
      private http: HttpClient,      
      private httpUtil: HttpUtilService
  ) { }


  getContrato(proposta: string): Observable<Contrato>{
  
    const param = env.serverUrl +  this.path.replace('{proposta}' , proposta);
    console.log(   this.httpUtil.header());
        
     
    return this.http.get<Contrato>(param , this.httpUtil.header());
//  return this.http.get<Contrato>(param);    

  }




}
