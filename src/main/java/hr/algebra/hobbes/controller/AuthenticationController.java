package hr.algebra.hobbes.controller;

import hr.algebra.hobbes.dto.AuthenticateRequestDto;
import hr.algebra.hobbes.dto.AuthenticateResponseDto;
import hr.algebra.hobbes.dto.RegistrationRequestDto;
import hr.algebra.hobbes.service.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(
            @RequestBody @Valid RegistrationRequestDto request
    ) throws MessagingException {
        authenticationService.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticateResponseDto> authenticate(
            @RequestBody @Valid AuthenticateRequestDto request
    ){
        return ResponseEntity.ok(authenticationService.authenticate(request));

    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        authenticationService.activateAccount(token);
    }

}
