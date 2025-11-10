package com.pharmacy.Pharmacy_Manager.repository;

import com.pharmacy.Pharmacy_Manager.dto.PharmacyRequestDto;
import com.pharmacy.Pharmacy_Manager.model.PharmacyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PharmacyRepository extends JpaRepository<PharmacyEntity, UUID> {
    List<PharmacyRequestDto> findByName(String name);
}
