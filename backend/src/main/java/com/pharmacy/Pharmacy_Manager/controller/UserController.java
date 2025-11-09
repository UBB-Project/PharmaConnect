package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.UserRequestDto;
import com.pharmacy.Pharmacy_Manager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/users")
    public UUID addUser(@RequestBody UserRequestDto userRequestDto){
        return userService.addUserWithName(userRequestDto.firstName(), userRequestDto.secondName(), userRequestDto.lastName());
    }
}
