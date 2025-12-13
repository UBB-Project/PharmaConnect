package com.pharmacy.Pharmacy_Manager.repository;

import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import com.pharmacy.Pharmacy_Manager.model.OrderEntity;
import com.pharmacy.Pharmacy_Manager.model.OrderStatus;
import com.pharmacy.Pharmacy_Manager.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, UUID> {
    List<OrderEntity> findByUserAndStatus(UserEntity user, OrderStatus attr0);
    Optional<OrderEntity> findByUserAndItemAndStatus(UserEntity user, ItemEntity item, OrderStatus orderStatus);
}
