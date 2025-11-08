package com.pharmacy.Pharmacy_Manager.dto;

import lombok.Builder;

@Builder
public record UserRequestDto(String firstName, String secondName, String lastName){
}
