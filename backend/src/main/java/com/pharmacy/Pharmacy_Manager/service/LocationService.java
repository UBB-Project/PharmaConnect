package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.dto.LocationDTO;
import com.pharmacy.Pharmacy_Manager.model.LocationEntity;
import com.pharmacy.Pharmacy_Manager.model.PharmacyEntity;
import com.pharmacy.Pharmacy_Manager.repository.LocationRepository;
import com.pharmacy.Pharmacy_Manager.repository.PharmacyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final PharmacyRepository pharmacyRepository;

    public LocationDTO createLocation(LocationDTO locationDTO) {
        PharmacyEntity pharmacy = pharmacyRepository.findById(locationDTO.getPharmacyId())
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        LocationEntity location = LocationEntity.builder()
                .address(locationDTO.getAddress())
                .openHours(locationDTO.getOpenHours())
                .pharmacy(pharmacy)
                .build();

    LocationEntity saved = locationRepository.save(location);
    locationDTO.setPharmacyId(saved.getId());
    return locationDTO;
    }

    public void deleteLocation(UUID id) {
        if(!locationRepository.existsById(id)){
            throw new RuntimeException("Location not found");
        }
        locationRepository.deleteById(id);
    }

}
