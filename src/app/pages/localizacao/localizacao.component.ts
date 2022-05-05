import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Localizacao } from 'src/app/domain/model/localizacao';
import { LocalizacaoService } from 'src/app/services/localizacao.service';
import { IUsuario } from '../../interfaces/IUsuarioLogin';
import { LoginService } from '../../services/login.service';
import { SessionService } from '../../services/session.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})
export class LocalizacaoComponent implements OnInit {

 localizacao: Localizacao[] = []; 


 EmpData : Localizacao[] =[{
  "id": "1",
  "contrato": "Johannah",
  "titular": "Kiffin",
  "produto": "jkiffin0@google.pl",
  "quadra": "F",
  "setor": "Administrative Assistant I",
  "lote":"1221212",
  "complemento":"complentos",
  "cpf":"1231231212"
}, {
  "id": "1",
  "contrato": "12212112",
  "titular": "Kiffin",
  "produto": "jkiffin0@google.pl",
  "quadra": "F",
  "setor": "Timao",
  "lote":"1221212",
  "complemento":"complentos",
  "cpf":"1231231212"
}]

  validaLocalizacao: any={};
  existeLocaliza: number = 0;


  colunas = ['contrato', 'titular',  'produto', 'quadra', 'setor', 'lote', 'complemento'];
  
 
   dataSourceLocalizacao!: MatTableDataSource<Localizacao>;


  login: IUsuario = {
    id: '',
    contrato: '',
    cpfCnpj: ''
  };

  constructor(
    private localizaService: LocalizacaoService,
    private snackbar: MatSnackBar,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {

  }  

  autenticarApi() {

    const param: string =  this.validaLocalizacao.cpf;

    this.login.contrato = 'userAPI';
    this.login.cpfCnpj = param;

    try {

      this.loginService.logar(this.login)
        .subscribe({

          next: (data) => {

              SessionService.setToken(data['token']);
              SessionService.setContrato(data['contrato']);
              SessionService.setCliente(data['name']);

              this.getLocaliza(param);

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
          }
        })


    } catch (error) {

    }
  }

  getLocaliza(param: string){   

    this.localizaService.getLocalizacao(param)
      .subscribe({
        next: (data) =>{

          if (data != null) {            

              console.log('resultado : ', data);            
              this.localizacao = data;              
              this.dataSourceLocalizacao  = new MatTableDataSource(this.localizacao);
              console.log('datasource : ', this.dataSourceLocalizacao);
              console.log('localizacao : ',  this.localizacao);

              this.existeLocaliza = 1;              

          } else {
            let msg = "NÃO LOCALIZADO";
            this.snackbar.open(msg, "Fechar", { duration: 5000 })
          }

        },
        error: (err) =>{

          let msg = "cpf:    " + param;
          this.snackbar.open(msg, "Fechar", { duration: 5000 })

        }
      })

  }

}
