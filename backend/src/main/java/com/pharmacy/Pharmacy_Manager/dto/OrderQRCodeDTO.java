package com.pharmacy.Pharmacy_Manager.dto;

import com.pharmacy.Pharmacy_Manager.model.Order;
import lombok.Data;

@Data
public class OrderQRCodeDTO {
    String orderId;
    String itemName;
    String itemId;
    String userId;
    int quantity;

    public static OrderQRCodeDTO fromOrder(Order order) {
        var orderQr = new OrderQRCodeDTO();
        orderQr.setOrderId(order.getId().toString());
        orderQr.setQuantity(order.getQuantity());
        orderQr.setUserId(order.getUser().getId().toString());
        orderQr.setItemName(order.getItem().getName());
        orderQr.setItemId(order.getItem().getId().toString());
        return orderQr;
    }
}
