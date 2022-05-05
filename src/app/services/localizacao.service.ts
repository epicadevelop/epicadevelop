import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Localizacao } from '../domain/model/localizacao';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {
private readonly  pathLocalizacao: string  = '/contrato/localizacao/{cpf}';


  constructor(
    private router: Router,
    private http: HttpClient,
    private httpUtil: HttpUtilService
    
  ) {}

  
  getLocalizacao (cpf: string): Observable <Localizacao[]>{

    const param =  env.serverUrl + this.pathLocalizacao.replace('{cpf}',cpf);
    return this.http.get<Localizacao[]>(param , this.httpUtil.header());
  }
  
}
