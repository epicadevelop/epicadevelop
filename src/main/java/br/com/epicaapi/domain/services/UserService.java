package br.com.epicaapi.domain.services;
import br.com.epicaapi.domain.entities.User;
import br.com.epicaapi.security.model.request.LoginRequest;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public interface UserService {

    public Optional<User> getUserByID(String id);

    public LoginRequest decode(String request);
}
