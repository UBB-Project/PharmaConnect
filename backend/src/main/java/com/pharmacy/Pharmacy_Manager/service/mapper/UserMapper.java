package com.pharmacy.Pharmacy_Manager.service.mapper;

import com.pharmacy.Pharmacy_Manager.dto.UserRequestDto;
import com.pharmacy.Pharmacy_Manager.dto.UserResponseDto;
import com.pharmacy.Pharmacy_Manager.model.UserEntity;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserMapper {

    public UserEntity mapToUserEntity(UserRequestDto userRequestDto) {
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(userRequestDto.firstName());
        userEntity.setSecondName(userRequestDto.secondName());
        userEntity.setLastName(userRequestDto.lastName());

        return userEntity;
    }

    public UserResponseDto mapToUserResponse(UserRequestDto userRequestDto) {
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setFirstName(userRequestDto.firstName());
        userResponseDto.setSecondName(userRequestDto.secondName());
        userResponseDto.setLastName(userRequestDto.lastName());

        return userResponseDto;
    }

}
