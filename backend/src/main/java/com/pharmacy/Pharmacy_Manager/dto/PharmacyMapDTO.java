package com.pharmacy.Pharmacy_Manager.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PharmacyMapDTO {
    private UUID id;
    @NotBlank(message = "Address cannot be empty")
    private String name;
    @NotBlank(message = "Address cannot be empty")
    private String address;
    private Double latitude;
    private Double longitude;
}
