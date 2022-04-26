import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtilService } from '../services/http-util.service';
import { environment as env } from '../../environments/environment';
import { Contrato } from '../domain/model/contrato';
import { BoletoCripto } from '../domain/model/boletoCripto';


@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private readonly path: string = '/contrato/{proposta}';
  private readonly pathBoleto: string = '/geraBoleto/{codigo}';

  constructor(
      private http: HttpClient,      
      private httpUtil: HttpUtilService
  ) { }


  getContratos(proposta: string): Observable<Contrato>{  
    const param = env.serverUrl +  this.path.replace('{proposta}' , proposta);     
    return this.http.get<Contrato>(param , this.httpUtil.header());
  }

  getBoleto(codigo: string): Observable<BoletoCripto>{
    const param = env.serverUrl + this.pathBoleto.replace('{codigo}',codigo);
    return this.http.get<BoletoCripto>(param,this.httpUtil.header());
  }

}
