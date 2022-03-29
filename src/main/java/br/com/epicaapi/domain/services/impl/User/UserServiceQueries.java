package br.com.epicaapi.domain.services.impl.User;
import br.com.epicaapi.domain.entities.User;
import br.com.epicaapi.domain.repositories.UserRepository;
import br.com.epicaapi.domain.services.UserService;
import br.com.epicaapi.security.model.request.LoginRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;


@AllArgsConstructor
@Component
public abstract class UserServiceQueries implements UserService{

    private UserRepository userRepository;

    public Optional<User> getUserByID(String id) {
        return Optional.empty();
    }

    public LoginRequest decode(String req) {
        return null;
    }

}
