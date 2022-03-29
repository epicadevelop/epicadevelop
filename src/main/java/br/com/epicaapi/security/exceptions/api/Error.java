package br.com.epicaapi.security.exceptions.api;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class Error {
    private Integer status;
    private OffsetDateTime dateTime;
    private String title;
    private List<Fields> fields;

    @Getter
    @AllArgsConstructor
    public static class Fields {
        private String name;
        private String message;
    }
}