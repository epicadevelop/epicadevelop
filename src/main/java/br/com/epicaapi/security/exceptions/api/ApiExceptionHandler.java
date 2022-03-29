package br.com.epicaapi.security.exceptions.api;

import br.com.epicaapi.security.exceptions.domain.DomainException;
import br.com.epicaapi.security.exceptions.domain.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    private final MessageSource messageSource;

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<Error.Fields> fields = new ArrayList<>();
        ex.getBindingResult().getAllErrors()
                .stream()
                .forEach(objectError -> {
                    var name = ((FieldError) objectError).getField();
                    //var message = objectError.getDefaultMessage();
                    var message= messageSource.getMessage(objectError, LocaleContextHolder.getLocale());
                    fields.add(new Error.Fields(name, message));
                });

        Error error = new Error();
        error.setStatus(status.value());
        error.setDateTime(OffsetDateTime.now());
        error.setTitle("Um ou mais campos estão invalidos, faça o preenchimento correto e envie novamente");
        error.setFields(fields);
        return handleExceptionInternal(ex, error, headers, status, request);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleEntityNotFound(DomainException ex, WebRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        Error error = new Error();
        error.setStatus(status.value());
        error.setDateTime(OffsetDateTime.now());
        error.setTitle(ex.getMessage());
        return handleExceptionInternal(ex, error, new HttpHeaders(), status, request);
    }

    @ExceptionHandler(DomainException.class)
    public ResponseEntity<Object> handleDomain(DomainException ex, WebRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Error error = new Error();
        error.setStatus(status.value());
        error.setDateTime(OffsetDateTime.now());
        error.setTitle(ex.getMessage());
        return handleExceptionInternal(ex, error, new HttpHeaders(), status, request);
    }
}
