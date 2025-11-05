package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyDTO;
import com.pharmacy.Pharmacy_Manager.service.PharmacyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pharmacies")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PharmacyController {
    private final PharmacyService pharmacyService;

    @GetMapping
    public List<PharmacyDTO> getAllPharmacies() {
        return pharmacyService.getAllPharmacies();
    }

    @PostMapping
    public PharmacyDTO createPharmacy(@Valid @RequestBody PharmacyDTO pharmacyDTO) {
        return pharmacyService.createPharmacy(pharmacyDTO);
    }

    @GetMapping("/name/{name}")
    public List<PharmacyDTO> getPharmaciesByName(@PathVariable String name) {
        return pharmacyService.getPharmaciesByName(name);
    }

    @GetMapping("/{id}")
    public PharmacyDTO getPharmacyById(@PathVariable UUID id) {
        return pharmacyService.getPharmacyById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePharmacy(@PathVariable UUID id) {
        pharmacyService.deletePharmacy(id);
    }
}
