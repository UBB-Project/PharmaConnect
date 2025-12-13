package com.pharmacy.Pharmacy_Manager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDTO {
    private UUID id;
    private String name;
    private String brand;
    private String imageUrl;
    private double price;
    private int quantity;

}
