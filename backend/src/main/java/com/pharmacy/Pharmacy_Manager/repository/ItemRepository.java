package com.pharmacy.Pharmacy_Manager.repository;
import com.pharmacy.Pharmacy_Manager.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface ItemRepository extends JpaRepository<Item, UUID> {}
