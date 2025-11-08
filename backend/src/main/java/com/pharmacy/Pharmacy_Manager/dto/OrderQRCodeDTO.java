package com.pharmacy.Pharmacy_Manager.dto;

import com.pharmacy.Pharmacy_Manager.model.Order;
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

    public static OrderQRCodeDTO fromOrder(Order order) {
        return OrderQRCodeDTO
                .builder()
                .orderId(order.getId().toString())
                .quantity(order.getQuantity())
                .userId(order.getUser().getId().toString())
                .itemName(order.getItem().getName())
                .itemId(order.getItem().getId().toString())
                .build();
    }
}
