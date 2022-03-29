package br.com.epicaapi.domain.services.impl.contrato;


import br.com.epicaapi.domain.entities.Contrato;
import br.com.epicaapi.domain.repositories.ContratoRepository;
import br.com.epicaapi.domain.services.ContratoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class ContratoServiceImpl implements ContratoService {

    private ContratoRepository contratoRepository;

    public Optional<Contrato> getContratoByProposta(String proposta){

    Optional<Contrato> contrato = contratoRepository.findByProposta(proposta);

        return contrato;

    }



}
