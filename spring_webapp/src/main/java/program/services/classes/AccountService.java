package program.services;

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

    public AuthResponseDto register(RegisterDto request) {
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