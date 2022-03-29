package br.com.epicaapi.domain.entities;

import lombok.*;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@Entity
@Immutable
@Table(name="VW_RET_INFO_CONTRATO")
@AllArgsConstructor
public class Contrato {

    public Contrato(){
        super();
    }

    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "PROPOSTA")
    private String proposta;

    @Column(name = "CLIENTE")
    private String cliente;

    @Column(name = "DOCUMENTO")
    private String documento;

    @Column(name = "ENDERECO")
    private String endereco;

    @Column(name = "BAIRRO")
    private String bairro;

    @Column(name = "CEP")
    private String cep;

    @Column(name = "CIDADE")
    private String cidade;

    @Column(name = "ESTADO")
    private String estado;

    @Column(name = "FONE")
    private String fone;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PRODUTO")
    private String produto;

    @Column(name = "QTDE_GAVETA")
    private String qtdeGaveta;

    @Column(name = "QTD_PARC_ATRAZO")
    private Integer qtdeParcAtrazo;


}

