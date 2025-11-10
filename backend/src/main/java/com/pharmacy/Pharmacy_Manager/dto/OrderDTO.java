package com.pharmacy.Pharmacy_Manager.dto;

import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import com.pharmacy.Pharmacy_Manager.model.OrderEntity;
import com.pharmacy.Pharmacy_Manager.model.OrderType;
import com.pharmacy.Pharmacy_Manager.model.UserEntity;
import lombok.Data;

import java.util.UUID;

@Data
public class OrderDTO {
    OrderType type;
    UUID itemId;
    int quantity;
    UUID userId;

    public OrderEntity toOrder(UserEntity user, ItemEntity item) {
        return OrderEntity.builder()
                .user(user)
                .item(item)
                .quantity(quantity)
                .type(type)
                .build();

    }
}
