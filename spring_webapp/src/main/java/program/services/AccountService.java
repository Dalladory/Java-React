package program.services;

import org.springframework.web.client.RestOperations;
import program.configuration.captcha.CaptchaSettings;
import program.configuration.captcha.GoogleResponse;
import program.dto.account.*;
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
import program.services.classes.GoogleAuthService;

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
    private final GoogleAuthService googleAuthService;
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

    public AuthResponseDto GoogleLogin(GoogleAuthDto model) {
        var googleToken = model.getToken();
        String accessToken = null;
        UserEntity user = null;
        try{
            var googlePayload = googleAuthService.verify(googleToken);
            var optional = repository.findByEmail(googlePayload.getEmail());
            if(!optional.isEmpty()) {
                user = optional.get();
            }

            if(optional.isEmpty()) {
                user = UserEntity.builder()
                        .firstName((String) googlePayload.get("family_name"))
                        .lastName((String) googlePayload.get("given_name"))
                        .email(googlePayload.getEmail())
                        .phone("093 839 43 23")
                        .password("")
                        .build();
                repository.save((user));
            }
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            googlePayload.getEmail(),
                            ""
                    )
            );
        }
        catch(Exception ex) {

        }

        var jwtToken = jwtService.generateAccessToken(user);
        return AuthResponseDto.builder()
                .token(jwtToken)
                .build();
    }

    public UserProfileDto GetUserProfile(String email) {
        var optional =repository.findByEmail(email);
        if(!optional.isEmpty()) {
            var user = optional.get();
            return UserProfileDto.builder()
                    .id(user.getId())
                    .email(email)
                    .name(user.getFirstName())
                    .surname(user.getLastName())
                    .build();
        }
        return  null;
    }

}