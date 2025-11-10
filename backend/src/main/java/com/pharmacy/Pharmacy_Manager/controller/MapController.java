package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyMapDTO;
import com.pharmacy.Pharmacy_Manager.service.MapService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(("/api/map"))
public class MapController {
    private final MapService mapService;

    @GetMapping("/pharmacies")
    public List<PharmacyMapDTO> getPharmaciesForMap() {
        return mapService.getAllPharmaciesForMap();
    }
}
