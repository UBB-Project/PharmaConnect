package com.pharmacy.Pharmacy_Manager.dto;

import com.pharmacy.Pharmacy_Manager.model.OrderEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderQRCodeDTO {
    String orderId;
    String itemName;
    String itemId;
    String userId;
    int quantity;

    public static OrderQRCodeDTO fromOrder(OrderEntity orderEntity) {
        return OrderQRCodeDTO
                .builder()
                .orderId(orderEntity.getId().toString())
                .quantity(orderEntity.getQuantity())
                .userId(orderEntity.getUser().getId().toString())
                .itemName(orderEntity.getItem().getName())
                .itemId(orderEntity.getItem().getId().toString())
                .build();
    }
}
