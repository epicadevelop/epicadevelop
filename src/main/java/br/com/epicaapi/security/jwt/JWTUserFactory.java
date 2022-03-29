package br.com.epicaapi.security.jwt;

import br.com.epicaapi.domain.entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public class JWTUserFactory {

    public static JWTUserDetailsImpl create(User user) {

    //List<GrantedAuthority> authorities = new ArrayList<>();
    //authorities.add(new SimpleGrantedAuthority(user.getRoles().toString()));

      return new JWTUserDetailsImpl(
              user.getId(),
              user.getContrato(),
              user.getCpfCnpj());
    }

}
