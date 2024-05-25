package hr.algebra.hobbes.service;

import hr.algebra.hobbes.dto.RegistrationRequestDto;
import hr.algebra.hobbes.model.Token;
import hr.algebra.hobbes.model.User;
import hr.algebra.hobbes.repository.RoleRepository;
import hr.algebra.hobbes.repository.TokenRepository;
import hr.algebra.hobbes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;


    public void register(RegistrationRequestDto request) {
        var userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new IllegalStateException("User role not found"));
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(userRole))
                .build();
        userRepository.save(user);
        sendValidationEmail(user);
    }

    private void sendValidationEmail(User user) {
        var newToken = generateAndSaveActivationToken(user);
        //send mail
    }

    private String generateAndSaveActivationToken(User user) {
        //generate a token
        String generatedToken = generateActivationToken(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationToken(int length) {
        String characters = "0123456789";
        StringBuilder activationTokenBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            activationTokenBuilder.append(characters.charAt(randomIndex));
        }
        return activationTokenBuilder.toString();
    }
}
