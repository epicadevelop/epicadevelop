package br.com.epicaapi.domain.entities;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@Entity
public class Boleto {

    @Id
    @GeneratedValue
    @Column(name = "CODIGO")
    private String codigo;

    @Column(name = "NUM_PARC")
    private String parcela;

    @Column(name = "D_VENCTO")
    private String vencimento;

    @Column(name = "VALOR_PARC")
    private String valorParcela;

    @Column(name = "TIPO_REC")
    private String tipoReceb;

    @Column(name = "EMPRESA")
    private String empresa;

    @Column(name = "NOSSO_NUM")
    private String nossoNumero;

    @Column(name = "PROPOSTA")
    private String proposta;

    @Column(name = "SEQ")
    private Integer sequencia;
}