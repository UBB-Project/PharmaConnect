package com.pharmacy.Pharmacy_Manager.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class LocationDTO {
    public UUID id;
    @NotBlank(message = "Address cannot be empty")
    public String address;
    private UUID pharmacyId;
    private String openHours;
}
