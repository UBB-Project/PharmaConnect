package com.pharmacy.Pharmacy_Manager.service.mapper;

import com.pharmacy.Pharmacy_Manager.dto.CartResponseDTO;
import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import com.pharmacy.Pharmacy_Manager.model.OrderEntity;


public class CartMapper {
    public static CartResponseDTO toReponseDTO(OrderEntity orderEntity) {
        ItemEntity item = orderEntity.getItem();
        return CartResponseDTO.builder()
                .id(item.getId())
                .name(item.getName())
                .brand(item.getBrand())
                .imageUrl(item.getImageUrl())
                .price(item.getPrice())
                .quantity(orderEntity.getQuantity())
                .build();
    }
    }

