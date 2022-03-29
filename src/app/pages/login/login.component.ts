import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/interfaces/IUsuarioLogin';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  @Input() error!: string | null;

  session!: SessionService;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.formLogin = this.formBuilder.group(
      {
        contrato: ['', Validators.required],
        cpfCnpj: ['', Validators.required]
      }
    )
  }


  get f() { return this.formLogin.controls; }

  altenticar() {

    const login: IUsuario = this.formLogin.value

    if (this.formLogin.invalid) return;

    try {

      this.loginService.logar(login)
        .subscribe({

          next: (data) => {

              SessionService.setToken(data['token']);
              SessionService.setContrato(data['contrato']);
              SessionService.setCliente(data['name']);

              if (SessionService.isUserLoggedIn()) {
                this.router.navigate([SessionService.getDefaultHomePageUrl()]);
              }
          },

          error: (err) => {

            const e = err['status'];

            let msg: string = err['title'];

            if (e == 401) {
              msg = "Contrato / CPF invalido(s)";

            } else if (e == 400) {
              msg = "Contrato / CPF invalido(s)";

            } else if (e == 404) {
              msg = "Contrato / CPF não localizado(s)";
            }

            this.snackBar.open(msg, 'Fechar', { duration: 5000 });
          }
        })


    } catch (error) {

    }
  }
}
