package br.com.epicaapi.domain.services;


import br.com.epicaapi.domain.entities.Contrato;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public interface ContratoService {

  Optional<Contrato> getContratoByProposta(String proposta);

}
