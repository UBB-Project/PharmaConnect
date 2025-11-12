package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.MapLocationDTO;
import com.pharmacy.Pharmacy_Manager.service.MapService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/map")
@CrossOrigin(origins = "http://localhost:5173")
public class MapController {

    private final MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/pharmacies")
    public List<MapLocationDTO> getPharmaciesForMap() {
        return mapService.getAllPharmaciesForMap();
    }
}