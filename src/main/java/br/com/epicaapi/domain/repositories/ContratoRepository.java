package br.com.epicaapi.domain.repositories;

import br.com.epicaapi.domain.entities.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContratoRepository  extends JpaRepository<Contrato, String> {

    Optional<Contrato> findByProposta(String proposta);

}
