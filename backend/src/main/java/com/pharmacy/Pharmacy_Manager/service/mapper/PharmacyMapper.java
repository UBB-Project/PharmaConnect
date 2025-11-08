package com.pharmacy.Pharmacy_Manager.service.mapper;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyRequestDto;
import com.pharmacy.Pharmacy_Manager.dto.PharmacyResponseDto;
import com.pharmacy.Pharmacy_Manager.model.PharmacyEntity;
import lombok.experimental.UtilityClass;

@UtilityClass
public class PharmacyMapper {

    public PharmacyEntity mapToPharmacyEntity(PharmacyRequestDto pharmacyRequestDto) {
        PharmacyEntity pharmacyEntity = new PharmacyEntity();
        pharmacyEntity.setId(pharmacyRequestDto.getId());
        pharmacyEntity.setName(pharmacyRequestDto.getName());

        return pharmacyEntity;
    }

    public PharmacyResponseDto mapToPharmacyResponse(PharmacyRequestDto pharmacyRequestDto) {
        PharmacyResponseDto pharmacyResponseDto = new PharmacyResponseDto();
        pharmacyResponseDto.setName(pharmacyRequestDto.getName());

        return pharmacyResponseDto;
    }

    public PharmacyResponseDto mapToPharmacyResponse(PharmacyEntity pharmacyEntity) {
        PharmacyResponseDto pharmacyResponseDto = new PharmacyResponseDto();
        pharmacyResponseDto.setName(pharmacyEntity.getName());

        return pharmacyResponseDto;
    }
}
