package br.com.epicaapi.controller;

import br.com.epicaapi.domain.entities.User;
import br.com.epicaapi.domain.repositories.UserRepository;
import br.com.epicaapi.domain.services.UserService;
import br.com.epicaapi.security.exceptions.domain.EntityNotFoundException;
import br.com.epicaapi.security.jwt.JWTUtils;
import br.com.epicaapi.security.model.request.LoginRequest;
import br.com.epicaapi.security.model.response.LoginResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JWTUtils       jwtUtils;
    private final UserRepository userRepository;
    private  UserService         userService;

    @PostMapping("/autentica")

//  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) throws Exception {
    public ResponseEntity<?> authenticateUser(@RequestBody String request) throws Exception {

        LoginRequest loginRequest = userService.decode(request);

        System.out.println(request);

        User user = userRepository.findByContratoAndCpfCnpj(loginRequest.getContrato() , loginRequest.getCpfCnpj())
                .orElseThrow(()-> new EntityNotFoundException("Contrato não localizado"));

        String jwt = jwtUtils.generateJwtTokenCli(user.getContrato(), user.getCpfCnpj());

        LoginResponse loginResponse = new LoginResponse("Barer",
                jwt,
                user.getId(),
                user.getContrato(),
                user.getNome(),
                user.getCpfCnpj()
        );

        return ResponseEntity.ok(loginResponse);
    }
}
