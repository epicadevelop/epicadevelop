package br.com.epicaapi.domain.entities;

import br.com.epicaapi.domain.ERoles;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Immutable
@Table(name = "VW_BUSCA_CLIENTE_WEB")

public class User {

    @Id
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private String id;

    @Column(name="NUM_PROP")
    private String contrato;

    @Column(name="DESCRICAO")
    private String nome;

    @Column(name="DOCUMENTO")
    private String cpfCnpj;

  //private ERoles roles;

}
