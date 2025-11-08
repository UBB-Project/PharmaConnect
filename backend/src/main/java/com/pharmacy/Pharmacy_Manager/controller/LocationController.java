package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.LocationDTO;
import com.pharmacy.Pharmacy_Manager.service.LocationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.UUID;

@RestController
@RequestMapping("/api/locations")
public class LocationController {
    private LocationService locationService;

    @PostMapping
    public LocationDTO save(@Valid @RequestBody LocationDTO locationDTO) {
        return locationService.createLocation(locationDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable UUID id) {
        locationService.deleteLocation(id);
    }
}
