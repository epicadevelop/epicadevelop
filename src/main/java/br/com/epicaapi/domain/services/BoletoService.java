package br.com.epicaapi.domain.services;


import br.com.epicaapi.domain.entities.Boleto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BoletoService {

     List<Boleto> getBoletoByProposta (String proposta);
}
