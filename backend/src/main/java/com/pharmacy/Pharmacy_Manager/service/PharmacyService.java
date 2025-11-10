package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyRequestDto;
import com.pharmacy.Pharmacy_Manager.dto.PharmacyResponseDto;
import com.pharmacy.Pharmacy_Manager.model.PharmacyEntity;
import com.pharmacy.Pharmacy_Manager.repository.PharmacyRepository;
import com.pharmacy.Pharmacy_Manager.service.mapper.PharmacyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


//Părțile comentate sunt pt că urmează făcută entitatea Locations
@Service
@RequiredArgsConstructor
public class PharmacyService {
    private final PharmacyRepository pharmacyRepository;

    public PharmacyResponseDto createPharmacy(PharmacyRequestDto pharmacyRequestDto) {
        PharmacyEntity pharmacyEntity = PharmacyEntity.builder()
                .name(pharmacyRequestDto.getName())
//                .locations(pharmacyDTO.getLocations().stream()
//                        .map(addr -> Location.builder().address(addr).build)))
//                        .collect(Collectors.toList()))
                .build();
//        pharmacy.getLocations().forEach(loc - > loc.setPharmacy(pharmacy));
        PharmacyEntity saved = pharmacyRepository.save(pharmacyEntity);

        return PharmacyMapper.mapToPharmacyResponse(saved);
    }

    public List<PharmacyResponseDto> getAllPharmacies() {
        return pharmacyRepository.findAll().stream()
                .map(PharmacyMapper::mapToPharmacyResponse)
                .collect(Collectors.toList());
    }

    public List<PharmacyResponseDto> getPharmaciesByName(String name) {
        return pharmacyRepository.findByName(name)
                .stream()
                .map(PharmacyMapper::mapToPharmacyResponse)
                .collect(Collectors.toList());
    }

    public PharmacyResponseDto getPharmacyById(UUID id) {
        PharmacyEntity pharmacyEntity = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));

        return PharmacyMapper.mapToPharmacyResponse(pharmacyEntity);

    }
    public void deletePharmacy(UUID id) {
        if (!pharmacyRepository.existsById(id)) {
            throw new RuntimeException("Pharmacy not found");
        }
        pharmacyRepository.deleteById(id);
    }


}
