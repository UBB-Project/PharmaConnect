package com.pharmacy.Pharmacy_Manager.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemQueryDto {

    private String search;
    private String category;
    private String brand;
    private Boolean prescription;
    private String sort;
}