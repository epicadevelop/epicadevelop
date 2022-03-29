package br.com.epicaapi.domain.services.impl.boleto;


import br.com.epicaapi.domain.entities.Boleto;
import br.com.epicaapi.domain.repositories.BoletoRepository;
import br.com.epicaapi.domain.services.BoletoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@Component
public class BoletoServiceImpl implements BoletoService {

    @PersistenceContext
    private EntityManager entityManager;

    private BoletoRepository boletoRepository;

/*
    public Boleto getBoletoByProposta(String proposta){
        Boleto boleto = boletoRepository.findByProposta(proposta);
        return boleto;
    }
*/


    public List<Boleto> getBoletoByProposta (String proposta){
        StoredProcedureQuery findBoletoByProposta = entityManager.createStoredProcedureQuery("dbo.SP_LISTA_DEB_TAXA",Boleto.class);
        findBoletoByProposta.registerStoredProcedureParameter("NumProp",String.class, ParameterMode.IN);

        findBoletoByProposta.setParameter("NumProp",proposta);
        List boleto = findBoletoByProposta.getResultList();

        return boleto;

    }




}
