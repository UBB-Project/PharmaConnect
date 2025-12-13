package com.pharmacy.Pharmacy_Manager.service.mapper;

import com.pharmacy.Pharmacy_Manager.dto.ItemRequestDto;
import com.pharmacy.Pharmacy_Manager.dto.ItemResponseDto;
import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ItemMapper {

    public ItemEntity mapToItemEntity(ItemRequestDto itemRequestDto) {
        ItemEntity itemEntity = new ItemEntity();
        itemEntity.setId(itemRequestDto.id());
        itemEntity.setName(itemRequestDto.name());
        itemEntity.setDescription(itemRequestDto.description());
        itemEntity.setCategory(itemRequestDto.category());
        itemEntity.setPrice(itemRequestDto.price());
        itemEntity.setBrand(itemRequestDto.brand());
        itemEntity.setImageUrl(itemRequestDto.imageUrl());
        itemEntity.setManufacturingDate(itemRequestDto.manufacturingDate());
        itemEntity.setExpirationDate(itemRequestDto.expirationDate());
        itemEntity.setPrescriptionRequired(itemRequestDto.prescriptionRequired());
        itemEntity.setSideEffects(itemRequestDto.sideEffects());
        itemEntity.setSoldCount(itemRequestDto.soldCount());
        itemEntity.setStockQuantity(itemRequestDto.stockQuantity());

        return itemEntity;
    }

    public ItemResponseDto mapToItemResponse(ItemRequestDto itemRequestDto) {
        ItemResponseDto itemResponseDto = new ItemResponseDto();
        itemResponseDto.setName(itemRequestDto.name());
        itemResponseDto.setDescription(itemRequestDto.description());
        itemResponseDto.setCategory(itemRequestDto.category());
        itemResponseDto.setPrice(itemRequestDto.price());
        itemResponseDto.setBrand(itemRequestDto.brand());
        itemResponseDto.setImageUrl(itemRequestDto.imageUrl());
        itemResponseDto.setManufacturingDate(itemRequestDto.manufacturingDate());
        itemResponseDto.setExpirationDate(itemRequestDto.expirationDate());
        itemResponseDto.setPrescriptionRequired(itemRequestDto.prescriptionRequired());
        itemResponseDto.setSideEffects(itemRequestDto.sideEffects());
        itemResponseDto.setSoldCount(itemRequestDto.soldCount());
        itemResponseDto.setStockQuantity(itemRequestDto.stockQuantity());

        return itemResponseDto;

    }
}
