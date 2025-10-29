package com.pharmacy.Pharmacy_Manager.controller;
import com.pharmacy.Pharmacy_Manager.dto.ItemDTO;
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
    public UUID addItem(@RequestBody ItemDTO itemDTO) {
        return itemService.addItem(
                itemDTO.name(),
                itemDTO.description(),
                itemDTO.category(),
                itemDTO.price(),
                itemDTO.brand(),
                itemDTO.imageUrl(),
                itemDTO.manufacturingDate(),
                itemDTO.expirationDate(),
                itemDTO.prescriptionRequired(),
                itemDTO.sideEffects()
        );
    }
}
