import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUsuario } from '../interfaces/IUsuarioLogin';
import { environment as env } from 'src/environments/environment';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  public baseApiUrl = env.serverUrl;
  private readonly PATH: string = '/auth/autentica';

  constructor(private _http: HttpClient,
    private router: Router
  ) {}

  logout() {    
    localStorage.clear();
    this.router.navigate(['login']);
  }

  logar(usuario: IUsuario): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const encoded = btoa(usuario.contrato + ':' + usuario.cpfCnpj);    

    console.log('httpOptions ==> ' , httpOptions);
    return this._http.post(this.baseApiUrl + this.PATH, encoded, httpOptions);     

  }


  get isLoggedIn() {
    this.isUserLoggedIn();
    return this.loggedIn.asObservable();
  }

  checkCredentials() {    
    const token = localStorage['token'];
    return token;
  }

  isUserLoggedIn() {
    const token = this.checkCredentials();
    if (!token) {
      this.loggedIn.next(false);
      return false;
    } else if (this.isTokenExpired(token)) {
      this.loggedIn.next(false);
      return false;
    }    
    this.loggedIn.next(true);
    return true;
  }

  isTokenExpired(token?: string): boolean {

    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);

    if (date === undefined || date === null) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date | null {

    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }


}
