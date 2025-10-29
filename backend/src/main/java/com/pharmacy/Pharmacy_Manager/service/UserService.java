package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.model.User;
import com.pharmacy.Pharmacy_Manager.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UUID addUserWithName(String firstName, String secondName, String lastName)
    {
        User newUser = User.builder().firstName(firstName).secondName(secondName).lastName(lastName).build();
        userRepository.save(newUser);
        return newUser.getId();
    }
}
