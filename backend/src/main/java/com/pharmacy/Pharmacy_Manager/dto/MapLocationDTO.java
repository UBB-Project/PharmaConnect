package com.pharmacy.Pharmacy_Manager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MapLocationDTO {
    private String name;
    private String address;
    private double latitude;
    private double longitude;
    private String openHours;
}