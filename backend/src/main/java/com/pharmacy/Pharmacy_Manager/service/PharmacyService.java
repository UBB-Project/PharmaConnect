package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyDTO;
import com.pharmacy.Pharmacy_Manager.model.Location;
import com.pharmacy.Pharmacy_Manager.model.Pharmacy;
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


    public PharmacyDTO createPharmacy(PharmacyDTO pharmacyDTO) {
        Pharmacy pharmacy = fromDTO(pharmacyDTO);
        pharmacy.getLocations().forEach(loc -> loc.setPharmacy(pharmacy));
        Pharmacy saved = pharmacyRepository.save(pharmacy);
        return toDTO(saved);
    }

    public List<PharmacyDTO> getAllPharmacies() {
        return pharmacyRepository.findAll()
                .stream().map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<PharmacyDTO> getPharmaciesByName(String name) {
        return pharmacyRepository.findByName(name)
                .stream().map(this::toDTO)
                .collect(Collectors.toList());
    }

    public PharmacyDTO getPharmacyById(UUID id) {
        Pharmacy pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        return toDTO(pharmacy);
    }

    public void deletePharmacy(UUID id) {
        if (!pharmacyRepository.existsById(id)) {
            throw new RuntimeException("Pharmacy not found");
        }
        pharmacyRepository.deleteById(id);
    }

    public PharmacyDTO updatePharmacy(UUID id, PharmacyDTO pharmacyDTO) {
        Pharmacy pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pharmacy not found"));

        pharmacy.setName(pharmacyDTO.getName());

        Pharmacy updated = pharmacyRepository.save(pharmacy);
        return toDTO(updated);
    }

    private PharmacyDTO toDTO(Pharmacy pharmacy) {
        PharmacyDTO pharmacyDTO = new PharmacyDTO();
        pharmacyDTO.setId(pharmacy.getId());
        pharmacyDTO.setName(pharmacy.getName());
        pharmacyDTO.setLocations(pharmacy.getLocations().stream()
                .map(Location::getAddress)
                .collect(Collectors.toList()));
        return pharmacyDTO;
    }

    private Pharmacy fromDTO(PharmacyDTO pharmacyDTO) {
        Pharmacy pharmacy = Pharmacy.builder()
                .name(pharmacyDTO.getName())
                .locations(pharmacyDTO.getLocations().stream()
                        .map(addr -> Location.builder().address(addr).build())
                        .collect(Collectors.toList()))
                .build();
        pharmacy.getLocations().forEach(loc -> loc.setPharmacy(pharmacy));
        return pharmacy;
    }
}
