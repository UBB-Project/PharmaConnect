package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.dto.LocationDTO;
import com.pharmacy.Pharmacy_Manager.model.Location;
import com.pharmacy.Pharmacy_Manager.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final PharmacyRepository pharmacyRepository;

    public LocationDTO createLocation(@RequestBody LocationDTO locationDTO) {
        Location location = Location.builder()
                .address(locationDTO.getAddress())
                .pharmacy(pharmacy)
                .build();
    }
}
