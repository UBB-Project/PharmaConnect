package com.pharmacy.Pharmacy_Manager.repository;

import com.pharmacy.Pharmacy_Manager.model.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface LocationRepository extends JpaRepository<LocationEntity, UUID> {
}