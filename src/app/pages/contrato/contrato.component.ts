import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Contrato } from '../../domain/model/contrato';
import { Taxa } from '../../domain/model/taxa'
import { ContratoService } from '../../services/contrato.service';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Acordo } from 'src/app/domain/model/acordo';
import { BoletoCripto } from 'src/app/domain/model/boletoCripto';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})

export class ContratoComponent implements OnInit {
   
  formCripto: HTMLFormElement = document.querySelector('#formItau')!;
  
  formcontrato!: FormGroup;
  session!: SessionService;
  contrato: Contrato = {} as Contrato;
  boletoCripto!: BoletoCripto;  
  
  qtdeParcelaAtrazo: number = 0;
  seqBoleto:    number = 0;
  existeAcordo: number = 0;
  existeTaxa:   number = 0;
  criptoItau!:  string;
  
//private nfeEmitir: NfeEmitir[] = [];
  
  taxa: Taxa[] = [];
  acordo: Acordo[]=[];
  
  colunas = ['codigo' , 'proposta', 'parcela', 'vencimento', 'valorParcela', 'nossoNumero', 'actions'];
  
  dataSourceTaxa!: MatTableDataSource<Taxa>;
  dataSourceAcordo!: MatTableDataSource<Acordo>;
  
  constructor(private contratoService: ContratoService,
    private snackbar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.getContratoinicio();
  }

  /*  
  fillUpData() {
    this.formcontrato = this.fb.group({
         proposta: [this.contrato.proposta , [Validators.required]],
         cliente: [this.contrato.cliente , [Validators.required]],
         cpfCnpj: [this.contrato.documento , [Validators.required]],
         produto: [this.contrato.produto , [Validators.required]],
         qtdeGaveta: [this.contrato.qtdeGaveta , [Validators.required]],
         endereco: [this.contrato.endereco , [Validators.required]],
         bairro: [this.contrato.bairro , [Validators.required]],
         cidade: [this.contrato.cidade , [Validators.required]],
         uf: [this.contrato.estado , [Validators.required]],
         cep: [this.contrato.cep , [Validators.required]],
         fone: [this.contrato.fone , [Validators.required]],
         email: [this.contrato.email , [Validators.required]],

   });
  }
  */
  
  canSend(param: number) {
  /*
    let parcelaAtrazo = this.qtdeParcelaAtrazo;
    let result: boolean; 
    console.log('atrazo parcelas: ', parcelaAtrazo);
  
    if (parcelaAtrazo == 1 && param == 1 && this.existeAcordo < 1)
      result = false;
    else
      result = true;
   
    console.log('resultado :   ', result);
  
    return result;
    */
  
  }

  getContratoinicio() {

    let proposta = SessionService.getContratoAtual();

    this.contratoService.getContratos(proposta)
      .subscribe({
        next: (data: Contrato) => {

          if (data != null) {
              this.contrato = data;
              this.taxa = this.contrato.taxa;
              this.acordo = this.contrato.acordo;
              this.dataSourceTaxa = new MatTableDataSource(this.taxa);
              this.dataSourceAcordo = new MatTableDataSource(this.acordo);
              this.qtdeParcelaAtrazo = this.contrato.qtdeParcAtrazo;
              this.existeAcordo =  this.acordo.length;
              this.existeTaxa =  this.taxa.length;

          } else {
            let msg = "Contrato não localizado";
            this.snackbar.open(msg, "Fechar", { duration: 5000 })
          }
        },

        error: (err) => {
          let msg = "Contrato não localizado";
          console.log(msg);
        }
      })
  }


  gerarBoleto(codigo: string){
    this.contratoService.getBoleto(codigo)
      .subscribe({

        next:(data: BoletoCripto) =>{

          if (data != null){
            this.boletoCripto = data;            
            this.criptoItau = this.boletoCripto.boletoCripto
            
            this.submitItau();

            //this.formCripto.submit();

//            let msg = "Selecionou : " + this.criptoItau;
//            this.snackbar.open(msg, "Fechar", { duration: 9000 });
          }else{


          }

        }

      })
}
       
submitItau(){
    var form = document.createElement("form");
    form.method = "POST";
    form.action = "https://shopline.itau.com.br/shopline/shopline.aspx";
    form.target = "_blank"
    form.style.display = 'none';
//  form['Content-Type'] =  'application/x-www-form-urlencoded';
//  form['Accept'] = 'application/json';
//  above attributes are not valid
    var nomeCampo = document.createElement("input");
    nomeCampo.value = this.criptoItau;
    nomeCampo.name='DC';
    form.appendChild(nomeCampo);
    document.body.appendChild(form);
    form.submit();
}

  /*
  getContratoinicio() {
    
    let proposta = SessionService.getContrato();
  
    this.contratoService.getContrato(proposta)
      .subscribe({          
        next: (response) => {  this.contrato = response;  console.log('contrato: ' , this.contrato); },
        error: (err) =>{ let msg = "Contrato não localizado"; console.log(msg);}
      })
    }
  */    

}
