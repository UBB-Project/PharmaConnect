package com.pharmacy.Pharmacy_Manager.service;


import com.pharmacy.Pharmacy_Manager.dto.CartRequestDTO;
import com.pharmacy.Pharmacy_Manager.dto.CartResponseDTO;
import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import com.pharmacy.Pharmacy_Manager.model.OrderEntity;
import com.pharmacy.Pharmacy_Manager.model.OrderStatus;
import com.pharmacy.Pharmacy_Manager.model.UserEntity;
import com.pharmacy.Pharmacy_Manager.repository.ItemRepository;
import com.pharmacy.Pharmacy_Manager.repository.OrderRepository;
import com.pharmacy.Pharmacy_Manager.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Builder
@AllArgsConstructor

public class CartService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public List<OrderEntity> getCartItems(UserEntity user) {
        return orderRepository.findByUserAndStatus(user, OrderStatus.CART);
    }

    public OrderEntity addItemToCart(UserEntity user, UUID itemId, int quantity) {
        ItemEntity item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        Optional<OrderEntity> existing = orderRepository.findByUserAndItemAndStatus(user, item, OrderStatus.CART);
        if (existing.isPresent()) {
            OrderEntity order = existing.get();
            order.setQuantity(order.getQuantity() + quantity);
            return orderRepository.save(order);
        }

        OrderEntity order = OrderEntity.builder()
                .user(user)
                .item(item)
                .quantity(quantity)
                .status(OrderStatus.CART)
                .build();

        return orderRepository.save(order);
    }

    public OrderEntity updateItemQuantity(UserEntity user, UUID itemId, int quantity) {
        OrderEntity order = orderRepository.findByUserAndItemAndStatus(user, itemRepository.findById(itemId)
                                .orElseThrow(() -> new RuntimeException("Item not found")),
                        OrderStatus.CART)
                .orElseThrow(() -> new RuntimeException("Item not in cart"));

        order.setQuantity(quantity);
        return orderRepository.save(order);
    }

    public void removeItemFromCart(UserEntity user, UUID itemId) {
        OrderEntity order = orderRepository.findByUserAndItemAndStatus(user, itemRepository.findById(itemId)
                                .orElseThrow(() -> new RuntimeException("Item not found")),
                        OrderStatus.CART)
                .orElseThrow(() -> new RuntimeException("Item not in cart"));

        orderRepository.delete(order);
    }


}
