package program.services;

import org.springframework.web.client.RestOperations;
import program.configuration.captcha.CaptchaSettings;
import program.configuration.captcha.GoogleResponse;
import program.dto.account.LoginDto;
import program.dto.account.AuthResponseDto;
import program.dto.account.RegisterDto;
import program.configuration.security.JwtService;
import program.constants.Roles;
import program.entities.UserEntity;
import program.entities.UserRoleEntity;
import program.repositories.RoleRepository;
import program.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import program.repositories.UserRoleRepository;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CaptchaSettings captchaSettings;
    private final RestOperations restTemplate;
    protected static final String RECAPTCHA_URL_TEMPLATE = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";

    public AuthResponseDto register(RegisterDto request) {
        String url = String.format(RECAPTCHA_URL_TEMPLATE, captchaSettings.getSecret(), request.getReCaptchaToken());
        final GoogleResponse googleResponse = restTemplate.getForObject(url, GoogleResponse.class);
        if (!googleResponse.isSuccess()) {   //перевіряємо чи запит успішний
            //throw new Exception("reCaptcha was not successfully validated");
            return null;
        }
        var user = UserEntity.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .phone("093 839 43 23")
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        repository.save(user);
        var role = roleRepository.findByName(Roles.User);
        var ur = new UserRoleEntity().builder()
                .user(user)
                .role(role)
                .build();
        userRoleRepository.save(ur);

        var jwtToken = jwtService.generateAccessToken(user);
        return AuthResponseDto.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponseDto login(LoginDto request) {
        String url = String.format(RECAPTCHA_URL_TEMPLATE, captchaSettings.getSecret(), request.getReCaptchaToken());
        final GoogleResponse googleResponse = restTemplate.getForObject(url, GoogleResponse.class);
        if (!googleResponse.isSuccess()) {   //перевіряємо чи запит успішний
            //throw new Exception("reCaptcha was not successfully validated");
            return null;
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateAccessToken(user);
        return AuthResponseDto.builder()
                .token(jwtToken)
                .build();
    }

}