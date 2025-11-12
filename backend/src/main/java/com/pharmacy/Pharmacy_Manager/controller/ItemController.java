package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.ItemRequestDto;
import com.pharmacy.Pharmacy_Manager.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PostMapping("/items")
    public UUID addItem(@RequestBody ItemRequestDto itemRequestDto) {
        return itemService.addItem(
                itemRequestDto.name(),
                itemRequestDto.description(),
                itemRequestDto.category(),
                itemRequestDto.price(),
                itemRequestDto.brand(),
                itemRequestDto.imageUrl(),
                itemRequestDto.manufacturingDate(),
                itemRequestDto.expirationDate(),
                itemRequestDto.prescriptionRequired(),
                itemRequestDto.sideEffects()
        );
    }
}
