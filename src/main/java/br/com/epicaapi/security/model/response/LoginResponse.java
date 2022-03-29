package br.com.epicaapi.security.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse implements Serializable {
    private String type;
    private String token;
    private String id;
    private String contrato;
    private String name;
    private String cpf;



}
