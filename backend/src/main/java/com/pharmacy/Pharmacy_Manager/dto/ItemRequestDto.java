package com.pharmacy.Pharmacy_Manager.dto;

import com.pharmacy.Pharmacy_Manager.model.Item;
import lombok.Builder;
import java.time.LocalDate;
import java.util.UUID;

@Builder
public record ItemRequestDto(
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
        ) {
    public static ItemDTO from(Item i) {
        return ItemDTO.builder()
                .id(i.getId())
                .name(i.getName())
                .description(i.getDescription())
                .category(i.getCategory())
                .price(i.getPrice())
                .brand(i.getBrand())
                .imageUrl(i.getImageUrl())
                .manufacturingDate(i.getManufacturingDate())
                .expirationDate(i.getExpirationDate())
                .prescriptionRequired(i.getPrescriptionRequired())
                .sideEffects(i.getSideEffects())
                .build();
    }
}
