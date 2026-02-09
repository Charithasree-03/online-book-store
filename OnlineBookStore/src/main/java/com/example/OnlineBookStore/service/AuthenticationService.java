package com.example.OnlineBookStore.service;

import com.example.OnlineBookStore.DTO.JwtAuthenticationResponse;
import com.example.OnlineBookStore.DTO.SignInRequest;
import com.example.OnlineBookStore.DTO.SignupRequest;
import com.example.OnlineBookStore.entity.User;
import com.example.OnlineBookStore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public User signUp(SignupRequest signUpRequest) {
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRole(signUpRequest.getRole());
        return userRepository.save(user);
    }

    public JwtAuthenticationResponse signin(SignInRequest signInRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword())
        );

        User user = userRepository.findByEmail(signInRequest.getEmail()).orElseThrow();

        String jwt = jwtService.generateToken(user);

        JwtAuthenticationResponse res = new JwtAuthenticationResponse();
        res.setToken(jwt);
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setRole("ROLE_" + user.getRole().name()); // ✅ ROLE_ADMIN / ROLE_USER

        return res;
    }
}