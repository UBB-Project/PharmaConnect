package com.pharmacy.Pharmacy_Manager.dto;

import com.pharmacy.Pharmacy_Manager.model.Item;
import com.pharmacy.Pharmacy_Manager.model.Order;
import com.pharmacy.Pharmacy_Manager.model.OrderType;
import com.pharmacy.Pharmacy_Manager.model.User;
import lombok.Data;

import java.util.UUID;
@Data
public class OrderDTO {
    OrderType type;
    UUID itemId;
    int quantity;
    UUID userId;

    public Order toOrder(User user, Item item) {
        final var order = new Order();
        order.setUser(user);
        order.setItem(item);
        order.setQuantity(quantity);
        order.setType(type);
        return order;
    }
}
