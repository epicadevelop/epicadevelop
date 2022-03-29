package br.com.epicaapi.config;

import br.com.epicaapi.domain.services.impl.User.UserServiceImpl;
import br.com.epicaapi.security.jwt.JWTAuthenticationEntryPoint;
import br.com.epicaapi.security.jwt.JWTAuthenticationTokenFilter;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


	@Autowired
	UserServiceImpl userDetailsService;

	@Autowired
	private JWTAuthenticationEntryPoint unauthorizedHandler;

	@Bean
	public JWTAuthenticationTokenFilter authenticationJwtTokenFilter() {

		return new JWTAuthenticationTokenFilter();
	}




	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()

			.authorizeRequests()
//				.antMatchers("/api/**").permitAll()
//				.antMatchers("/api/auth/**").permitAll()
				.antMatchers("/api/auth/autentica/**").permitAll()
				.anyRequest().authenticated()
				.and()

				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}

}
