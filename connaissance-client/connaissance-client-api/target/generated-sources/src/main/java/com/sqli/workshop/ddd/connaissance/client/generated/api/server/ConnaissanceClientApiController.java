package com.sqli.workshop.ddd.connaissance.client.generated.api.server;

import com.sqli.workshop.ddd.connaissance.client.generated.api.model.AdresseDto;
import com.sqli.workshop.ddd.connaissance.client.generated.api.model.ApiErrorResponseDto;
import com.sqli.workshop.ddd.connaissance.client.generated.api.model.ConnaissanceClientDto;
import com.sqli.workshop.ddd.connaissance.client.generated.api.model.ConnaissanceClientInDto;
import com.sqli.workshop.ddd.connaissance.client.generated.api.model.SituationDto;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import jakarta.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.18.0")
@Controller
@RequestMapping("${openapi.connaissanceClient.base-path:}")
public class ConnaissanceClientApiController implements ConnaissanceClientApi {

    private final ConnaissanceClientApiDelegate delegate;

    public ConnaissanceClientApiController(@Autowired(required = false) ConnaissanceClientApiDelegate delegate) {
        this.delegate = Optional.ofNullable(delegate).orElse(new ConnaissanceClientApiDelegate() {});
    }

    @Override
    public ConnaissanceClientApiDelegate getDelegate() {
        return delegate;
    }

}
