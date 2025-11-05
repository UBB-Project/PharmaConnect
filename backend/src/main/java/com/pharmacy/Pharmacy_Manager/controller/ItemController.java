package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.ItemDTO;
import com.pharmacy.Pharmacy_Manager.model.Item;
import com.pharmacy.Pharmacy_Manager.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService itemService;

    @PostMapping
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

    @GetMapping
    public List<ItemDTO> getAllItems() {
        return itemService.getAllItems().stream()
                .map(ItemDTO::from)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ItemDTO getItem(@PathVariable UUID id) {
        Item item = itemService.getById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Item not found"));
        return ItemDTO.from(item);
    }
}
