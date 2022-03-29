package br.com.epicaapi.domain.services.impl.User;

import br.com.epicaapi.domain.entities.User;
import br.com.epicaapi.domain.repositories.UserRepository;
import br.com.epicaapi.domain.services.UserService;
import br.com.epicaapi.security.exceptions.domain.EntityNotFoundException;
import br.com.epicaapi.security.model.request.LoginRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Optional;


@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private final  UserRepository userRepository;

    public User loadUserByUserAndPass (String contrato,String cpfCnpj) {
        User user = userRepository.findByContratoAndCpfCnpj(contrato,cpfCnpj)
                .orElseThrow(()-> new EntityNotFoundException("Contrato/CPF não localizado"));

        return user;
    }

    @Override
    public Optional<User> getUserByID(String id) {
        return Optional.empty();
    }

    public LoginRequest decode(String req) {
        try {

            byte[] decode = Base64.getDecoder().decode(req);
            String decodeStr = new String(decode);
            String[] split = decodeStr.toString().split(":");
            String contrato = split[0];
            String cpfCnpj =  split[1];

            LoginRequest loginRequest = new LoginRequest( contrato , cpfCnpj);
            return loginRequest;

        } catch (ArrayIndexOutOfBoundsException e) {
            return null;
        }
    }

}
