import { Acordo } from "./acordo";
import { Taxa } from "./taxa";

export interface Contrato{

    
    proposta: string;
    cliente: string;
    documento: string;
    endereco: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    fone: string;
    email: string;
    produto: string;
    qtdeGaveta: string;
    qtdeParcAtrazo: number;
    taxa : Taxa[];
    acordo: Acordo[];

}