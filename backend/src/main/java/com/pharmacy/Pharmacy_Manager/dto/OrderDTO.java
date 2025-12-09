package com.pharmacy.Pharmacy_Manager.dto;

import com.pharmacy.Pharmacy_Manager.model.*;
import lombok.Data;

import java.util.UUID;

@Data
public class OrderDTO {
    OrderType type;
    UUID itemId;
    int quantity;
    UUID userId;
    private OrderStatus status;

    public OrderEntity toOrder(UserEntity user, ItemEntity item) {
        return OrderEntity.builder()
                .user(user)
                .item(item)
                .quantity(quantity)
                .type(type)
                .status(status != null ? status : OrderStatus.CART)
                .build();

    }
}
