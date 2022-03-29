package br.com.epicaapi.security.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ContratoResponse implements Serializable {
    private String proposta;
    private String cliente;
    private String documento;
    private String endereco;
    private String bairro;
    private String cep;
    private String cidade;
    private String estado;
    private String fone;
    private String email;
    private String produto;
    private String qtdeGaveta;
    private Integer qtdeParcAtrazo;
    private List boleto;


}
