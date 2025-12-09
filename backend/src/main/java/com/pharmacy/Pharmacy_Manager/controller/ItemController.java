package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.ItemQueryDto;
import com.pharmacy.Pharmacy_Manager.dto.ItemRequestDto;
import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import com.pharmacy.Pharmacy_Manager.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")

public class ItemController {
    private final ItemService itemService;

    @PostMapping
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
                itemRequestDto.sideEffects(),
                itemRequestDto.soldCount(),
                itemRequestDto.stockQuantity()
        );
    }

    @GetMapping
    public List<ItemRequestDto> getAllItems(@ModelAttribute ItemQueryDto query) {
        return itemService.searchFilterSort(
                        query.getSearch(),
                        query.getCategory(),
                        query.getBrand(),
                        query.getPrescription(),
                        query.getSort()
                )
                .stream()
                .map(ItemRequestDto::from)
                .toList();
    }


    @GetMapping("/{id}")
    public ItemRequestDto getItem(@PathVariable UUID id) {
        ItemEntity item = itemService.getById(id)
                .orElseThrow();
        return ItemRequestDto.from(item);
    }
}
