package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyRequestDto;
import com.pharmacy.Pharmacy_Manager.dto.PharmacyResponseDto;
import com.pharmacy.Pharmacy_Manager.service.PharmacyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pharmacies")
@RequiredArgsConstructor
public class PharmacyController {
    private final PharmacyService pharmacyService;

    @GetMapping
    public List<PharmacyResponseDto> getAllPharmacies() {
        return pharmacyService.getAllPharmacies();
    }

    @PostMapping
    public PharmacyResponseDto createPharmacy(@Valid @RequestBody PharmacyRequestDto pharmacyRequestDto) {
        return pharmacyService.createPharmacy(pharmacyRequestDto);
    }

    @GetMapping("/name/{name}")
    public List<PharmacyResponseDto> getPharmaciesByName(@PathVariable String name) {
        return pharmacyService.getPharmaciesByName(name);
    }

    @GetMapping("/{id}")
    public PharmacyResponseDto getPharmacyById(@PathVariable UUID id) {
        return pharmacyService.getPharmacyById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePharmacy(@PathVariable UUID id) {
        pharmacyService.deletePharmacy(id);
    }
}
