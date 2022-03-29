package br.com.epicaapi.domain.repositories;


import br.com.epicaapi.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

  Optional<User> findByContratoAndCpfCnpj (String contrato,String cpfCnpj);



}
