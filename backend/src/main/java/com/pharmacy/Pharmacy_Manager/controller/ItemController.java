package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.ItemQueryDto;
import com.pharmacy.Pharmacy_Manager.dto.ItemRequestDto;
import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import com.pharmacy.Pharmacy_Manager.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.pharmacy.Pharmacy_Manager.dto.StockCheckResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

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
                itemRequestDto.sideEffects()
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

    @PostMapping("/bulk-order")
    public ResponseEntity<StockCheckResponseDto> uploadOrderFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            StockCheckResponseDto response = itemService.processBulkOrder(file);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
