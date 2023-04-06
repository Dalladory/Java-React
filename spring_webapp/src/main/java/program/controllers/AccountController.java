package program.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import program.dto.account.GoogleAuthDto;
import program.dto.account.LoginDto;
import program.dto.account.AuthResponseDto;
import program.dto.account.RegisterDto;
import program.services.AccountService;
import program.services.classes.GoogleAuthService;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService service;


    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @RequestBody RegisterDto request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> authenticate(
            @RequestBody LoginDto request
    ) {
        return ResponseEntity.ok(service.login(request));
    }

    @PostMapping("/googlelogin")
    public ResponseEntity<AuthResponseDto> authenticate(
            @RequestBody GoogleAuthDto request
    ) {
        return ResponseEntity.ok(service.GoogleLogin(request));
    }
}