package br.com.epicaapi.controller;

import br.com.epicaapi.domain.entities.Contrato;
import br.com.epicaapi.domain.entities.Boleto;
import br.com.epicaapi.domain.services.BoletoService;
import br.com.epicaapi.domain.services.ContratoService;
import br.com.epicaapi.security.exceptions.domain.EntityNotFoundException;
import br.com.epicaapi.security.model.response.ContratoResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/contrato")
public class ContratoController {

    private ContratoService contratoService;
    private BoletoService boletoService;

    @GetMapping("/{proposta}")
    public ResponseEntity<?> getContratoByProposta(@Valid @PathVariable String proposta){

        Contrato contrato = contratoService.getContratoByProposta(proposta)
                .orElseThrow(()-> new EntityNotFoundException("Contrato não localizado"));

        System.out.println(contrato);

        List boleto =  boletoService.getBoletoByProposta(proposta);

        System.out.println(boleto);

        ContratoResponse response = new ContratoResponse(
                contrato.getProposta(),
                contrato.getCliente(),
                contrato.getDocumento(),
                contrato.getEndereco(),
                contrato.getBairro(),
                contrato.getCep(),
                contrato.getCidade(),
                contrato.getEstado(),
                contrato.getFone(),
                contrato.getEmail(),
                contrato.getProduto(),
                contrato.getQtdeGaveta(),
                contrato.getQtdeParcAtrazo(),
                (List) boleto
        );

        return ResponseEntity.ok(response);
    }
}
