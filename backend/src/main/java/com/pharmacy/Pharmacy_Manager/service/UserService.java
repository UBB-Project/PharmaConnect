package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.model.UserEntity;
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
        UserEntity newUserEntity = UserEntity.builder().firstName(firstName).secondName(secondName).lastName(lastName).build();
        userRepository.save(newUserEntity);
        return newUserEntity.getId();
    }
}
