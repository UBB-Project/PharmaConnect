package com.pharmacy.Pharmacy_Manager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemResponseDto {

    private String name;
    private String description;
    private String category;
    private Double price;
    private String brand;
    private String imageUrl;
    private LocalDate manufacturingDate;
    private LocalDate expirationDate;
    private Boolean prescriptionRequired;
    private String sideEffects;
    private Integer soldCount;
    private Integer stockQuantity;
}
