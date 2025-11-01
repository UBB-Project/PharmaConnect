package com.pharmacy.Pharmacy_Manager.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class LocationDTO {
    public UUID id;
    public String address;
    private UUID pharmacyId;
}
