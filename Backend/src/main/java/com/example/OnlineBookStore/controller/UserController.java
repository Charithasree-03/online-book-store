package com.example.OnlineBookStore.controller;

import com.example.OnlineBookStore.DTO.JwtAuthenticationResponse;
import com.example.OnlineBookStore.DTO.SignInRequest;
import com.example.OnlineBookStore.DTO.SignupRequest;
import com.example.OnlineBookStore.entity.User;
import com.example.OnlineBookStore.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@jakarta.validation.Valid @RequestBody SignupRequest signupRequest){
        return ResponseEntity.ok(authenticationService.signUp(signupRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody SignInRequest signInRequest){
        return ResponseEntity.ok(authenticationService.signin(signInRequest));
    }
}
