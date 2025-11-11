package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.dto.MapLocationDTO;
import com.pharmacy.Pharmacy_Manager.model.LocationEntity;
import com.pharmacy.Pharmacy_Manager.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MapService {

    private final LocationRepository locationRepository;

    public MapService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<MapLocationDTO> getAllPharmaciesForMap() {
        return locationRepository.findAll().stream()
                .map(loc -> new MapLocationDTO(
                        loc.getPharmacy().getName(),
                        loc.getAddress(),
                        loc.getLatitude(),
                        loc.getLongitude(),
                        loc.getOpenHours()
                ))
                .collect(Collectors.toList());
    }
}