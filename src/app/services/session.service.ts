import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  static redirectUrl: string;

  static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static setContrato(contrato: any) {
    localStorage.setItem('contrato', contrato);
  }


  static getContrato(): string {    
       return localStorage['contrato'] ;
  }

  static setCliente(cliente: any) {
    localStorage.setItem('cliente', cliente);
  }

  static setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  /*
    static getUser(): any {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user) ? plainToClass(User, user) : null;
    }
  */
  static clear() {
    localStorage.removeItem('contrato')
    localStorage.removeItem('token')
  }

  static getDefaultHomePageUrl(): string {
    return 'contrato';
  }

  static isUserLoggedIn(): boolean {
    return this.getToken() !== null;
  }

}