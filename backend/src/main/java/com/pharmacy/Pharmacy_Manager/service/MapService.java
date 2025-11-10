package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyMapDTO;
import com.pharmacy.Pharmacy_Manager.repository.PharmacyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MapService {
    private final PharmacyRepository pharmacyRepository;

    public List<PharmacyMapDTO> getAllPharmaciesForMap() {
        return pharmacyRepository.findAll().stream()
                .flatMap(pharmacy -> pharmacy.getLocations().stream()
                        .map(location -> PharmacyMapDTO.builder()
                                .id(pharmacy.getId())
                                .name(pharmacy.getName())
                                .address(location.getAddress())
                                .latitude(location.getLatitude())
                                .longitude(location.getLongitude())
                                .build()))
                .collect(Collectors.toList());
    }
}
