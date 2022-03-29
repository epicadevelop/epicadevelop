package br.com.epicaapi.domain.repositories;


import br.com.epicaapi.domain.entities.Boleto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoletoRepository extends JpaRepository<Boleto, String> {


    Boleto findByProposta(String proposta);

}
