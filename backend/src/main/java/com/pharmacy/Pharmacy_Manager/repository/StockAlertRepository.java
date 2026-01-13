package com.pharmacy.Pharmacy_Manager.repository;

import com.pharmacy.Pharmacy_Manager.model.StockAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StockAlertRepository extends JpaRepository<StockAlert, UUID> {
    List<StockAlert> findByItemId(UUID itemId);
    void deleteByItemId(UUID itemId);
}