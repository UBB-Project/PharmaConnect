package com.pharmacy.Pharmacy_Manager.dto;

import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import com.pharmacy.Pharmacy_Manager.model.ItemEntityTranslation;
import lombok.Builder;
import java.time.LocalDate;
import java.util.UUID;

@Builder
public record ItemTranslationRequestDto(
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
        String sideEffects,
        Integer soldCount,
        Integer stockQuantity
) {
    public static ItemTranslationRequestDto from(ItemEntity i, ItemEntityTranslation j) {
        return ItemTranslationRequestDto.builder()
                .id(i.getId())
                .name(i.getName())
                .description(j.getDescription())
                .category(j.getCategory())
                .price(i.getPrice())
                .brand(i.getBrand())
                .imageUrl(i.getImageUrl())
                .manufacturingDate(i.getManufacturingDate())
                .expirationDate(i.getExpirationDate())
                .prescriptionRequired(i.getPrescriptionRequired())
                .sideEffects(j.getSideEffects())
                .soldCount(i.getSoldCount())
                .stockQuantity(i.getStockQuantity())
                .build();
    }
}