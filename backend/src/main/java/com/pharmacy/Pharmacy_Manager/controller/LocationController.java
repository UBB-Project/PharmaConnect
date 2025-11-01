package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.LocationDTO;
import com.pharmacy.Pharmacy_Manager.service.LocationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/locations")
public class LocationController {
    private LocationService locationService;

    @PostMapping
    public LocationDTO save(@RequestBody LocationDTO locationDTO) {
        return locationService.
    }
}
