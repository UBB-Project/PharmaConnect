package com.pharmacy.Pharmacy_Manager.repository;

import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity, UUID> {
    List<ItemEntity> findByNameStartingWithOrderByPriceAsc(String prefix);
}
