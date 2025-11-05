package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyDTO;
import com.pharmacy.Pharmacy_Manager.model.Pharmacy;
import com.pharmacy.Pharmacy_Manager.repository.PharmacyRepository;
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

    public PharmacyDTO createPharmacy(PharmacyDTO pharmacyDTO) {
        Pharmacy pharmacy = Pharmacy.builder()
                .name(pharmacyDTO.getName())
//                .locations(pharmacyDTO.getLocations().stream()
//                        .map(addr -> Location.builder().address(addr).build)))
//                        .collect(Collectors.toList()))
                .build();
//        pharmacy.getLocations().forEach(loc - > loc.setPharmacy(pharmacy));
        Pharmacy saved = pharmacyRepository.save(pharmacy);

        pharmacyDTO.setId(saved.getId());
        return pharmacyDTO;
    }

    public List<PharmacyDTO> getAllPharmacies() {
        return pharmacyRepository.findAll().stream().map(p->{
            PharmacyDTO pharmacyDTO = new PharmacyDTO();
            pharmacyDTO.setId(p.getId());
            pharmacyDTO.setName(p.getName());
//            pharmacyDTO.setLocations(p.getLocations().stream())
//                    .map(Location::getAddress).collect(Collectors.toList());
            return pharmacyDTO;
        }).collect(Collectors.toList());
    }

    public List<PharmacyDTO> getPharmaciesByName(String name) {
        return pharmacyRepository.findByName(name)
                .stream()
                .map(p -> {
                    PharmacyDTO dto = new PharmacyDTO();
                    dto.setId(p.getId());
                    dto.setName(p.getName());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public PharmacyDTO getPharmacyById(UUID id) {
        Pharmacy pharmacy = pharmacyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        PharmacyDTO pharmacyDTO = new PharmacyDTO();
        pharmacyDTO.setId(pharmacy.getId());
        pharmacyDTO.setName(pharmacy.getName());
        return pharmacyDTO;

    }
    public void deletePharmacy(UUID id) {
        if (!pharmacyRepository.existsById(id)) {
            throw new RuntimeException("Pharmacy not found");
        }
        pharmacyRepository.deleteById(id);
    }


}
