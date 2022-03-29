import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private loginService: LoginService ) {}

  imagePath = '/assets/logo_new.png';
  isLoggedIn$!: Observable<boolean>;


  ngOnInit(): void {
    this.isLoggedIn$  = this.loginService.isLoggedIn;
  }
   
  onLogout(){
    this.loginService.logout();
    this.isLoggedIn$  = this.loginService.isLoggedIn;
  }

  get user(): any{
    return localStorage.getItem('cliente');
  }



}
