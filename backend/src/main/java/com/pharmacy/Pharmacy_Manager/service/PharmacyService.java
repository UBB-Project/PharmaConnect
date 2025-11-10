package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyRequestDto;
import com.pharmacy.Pharmacy_Manager.dto.PharmacyResponseDto;
import com.pharmacy.Pharmacy_Manager.model.LocationEntity;
import com.pharmacy.Pharmacy_Manager.model.PharmacyEntity;
import com.pharmacy.Pharmacy_Manager.repository.PharmacyRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;



@Service
@RequiredArgsConstructor
public class PharmacyService {
    private final PharmacyRepository pharmacyRepository;


    public PharmacyResponseDto createPharmacy(PharmacyRequestDto pharmacyDTO) {
        PharmacyEntity pharmacy = fromDTO(pharmacyDTO);
        pharmacy.getLocations().forEach(loc -> loc.setPharmacy(pharmacy));
        PharmacyEntity saved = pharmacyRepository.save(pharmacy);
        return toDTO(saved);
    }

    public List<PharmacyResponseDto> getAllPharmacies() {
        return pharmacyRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<PharmacyResponseDto> getPharmaciesByName(String name) {
        return pharmacyRepository.findByName(name)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public PharmacyResponseDto getPharmacyById(UUID id) {
        PharmacyEntity pharmacyEntity = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        return toDTO(pharmacyEntity);
    }

    public void deletePharmacy(UUID id) {
        if (!pharmacyRepository.existsById(id)) {
            throw new RuntimeException("Pharmacy not found");
        }
        pharmacyRepository.deleteById(id);
    }

    public PharmacyResponseDto updatePharmacy(UUID id, PharmacyRequestDto pharmacyDTO) {
        PharmacyEntity pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pharmacy not found"));

        pharmacy.setName(pharmacyDTO.getName());

        PharmacyEntity updated = pharmacyRepository.save(pharmacy);
        return toDTO(updated);
    }

    private PharmacyResponseDto toDTO(PharmacyEntity pharmacy) {
        return PharmacyResponseDto.builder()
                .name(pharmacy.getName())
                .build();
    }

    private PharmacyEntity fromDTO(PharmacyRequestDto pharmacyDTO) {
        PharmacyEntity pharmacy = PharmacyEntity.builder()
                .name(pharmacyDTO.getName())
                .locations(pharmacyDTO.getLocations().stream()
                        .map(addr -> LocationEntity.builder().address(addr).build())
                        .collect(Collectors.toList()))
                .build();
        pharmacy.getLocations().forEach(loc -> loc.setPharmacy(pharmacy));
        return pharmacy;
    }
}
