package com.pharmacy.Pharmacy_Manager.dto;

import lombok.Builder;
import java.time.LocalDate;
import java.util.UUID;

@Builder
public record ItemDTO(
        UUID id,
        String name,
        String description,
        String category,
        Double price,
        String brand,
        String imageUrl,
        LocalDate manufacturingDate,
        LocalDate expirationDate,
        Boolean prescriptionRequired,
        String sideEffects
        ) {}
