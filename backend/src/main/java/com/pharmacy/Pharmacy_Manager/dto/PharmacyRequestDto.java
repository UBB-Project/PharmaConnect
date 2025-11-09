package com.pharmacy.Pharmacy_Manager.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class PharmacyRequestDto {
    private UUID id;
    @NotBlank(message = "Name cannot be empty")
    private String name;
    private List<String> locations;
}
