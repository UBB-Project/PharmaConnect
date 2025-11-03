package com.pharmacy.Pharmacy_Manager.repository;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyDTO;
import com.pharmacy.Pharmacy_Manager.model.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PharmacyRepository extends JpaRepository<Pharmacy, UUID> {
    List<PharmacyDTO> findPharmacyName(String name);
}
