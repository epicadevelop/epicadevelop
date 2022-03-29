package br.com.epicaapi.security.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;


@Getter
@Setter
@AllArgsConstructor
public class LoginRequest implements Serializable {

    @NotBlank
    private String contrato;

    @NotBlank
    private String cpfCnpj;

}
