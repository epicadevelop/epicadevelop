package br.com.epicaapi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginUser {

	@RequestMapping("/login")
	public String logar() {
		return"Logado";
	}

}
