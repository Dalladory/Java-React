package program.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.dto.account.*;
import program.services.AccountService;

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
    @GetMapping("/{email}/profile")
    public ResponseEntity<UserProfileDto> authenticate(
            @PathVariable String email
    ) {
        return ResponseEntity.ok(service.GetUserProfile(email));
    }
}