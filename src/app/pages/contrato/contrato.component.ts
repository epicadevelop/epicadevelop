import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Contrato } from '../../domain/model/contrato';
import { Taxa } from '../../domain/model/taxa'
import { ContratoService } from '../../services/contrato.service';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Acordo } from 'src/app/domain/model/acordo';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})

export class ContratoComponent implements OnInit {

  formcontrato!: FormGroup;
  session!: SessionService;
  contrato: Contrato = {} as Contrato;

  qtdeParcelaAtrazo: number = 0;
  seqBoleto: number = 0;
  existeAcordo: number = 0;

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
  
    let parcelaAtrazo = this.qtdeParcelaAtrazo;
    let result: boolean; 
    console.log('atrazo parcelas: ', parcelaAtrazo);
  
    if (parcelaAtrazo == 1 && param == 1 && this.existeAcordo < 1)
      result = false;
    else
      result = true;
   
    console.log('resultado :   ', result);
  
    return result;
  
  }


  getContratoinicio() {
    let proposta = SessionService.getContrato();

    this.contratoService.getContrato(proposta)
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

    let msg = "Selecionou o codigo : " + codigo;
    this.snackbar.open(msg, "Fechar", { duration: 9000 })

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
