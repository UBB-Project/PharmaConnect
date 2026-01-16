package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.ItemQueryDto;
import com.pharmacy.Pharmacy_Manager.dto.ItemRequestDto;
import com.pharmacy.Pharmacy_Manager.dto.ItemTranslationRequestDto;
import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import com.pharmacy.Pharmacy_Manager.model.ItemEntityTranslation;
import com.pharmacy.Pharmacy_Manager.model.Language;
import com.pharmacy.Pharmacy_Manager.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.pharmacy.Pharmacy_Manager.dto.StockCheckResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
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

    @GetMapping("/{id}/{language}")
    public Object getItem(@PathVariable UUID id, @PathVariable Language language) {
        ItemEntity item = itemService.getById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id " + id));
        if(language==Language.en){
            return ItemRequestDto.from(item);
        }
        else{
            ItemEntityTranslation item_trans = itemService.getByIdAndLanguage(id, language).orElseThrow(() -> new RuntimeException("Item not found with id " + id));
            return ItemTranslationRequestDto.from(item, item_trans);
        }
    }

    @GetMapping("/{language}")
    public List<Object> getAllItems(@PathVariable Language language){
        try {
            if (language == Language.en) {
                return Collections.singletonList(itemService.getAll().stream()
                        .map(ItemRequestDto::from)
                        .toList());
            } else {
                return Collections.singletonList(itemService.getAllLanguage(language)
                        .stream().map(t -> ItemTranslationRequestDto.from(t.getItem(), t)).toList());
            }
        }catch(Exception e){
            throw e;
        }

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

    @GetMapping("/similar/{id}")
    public ResponseEntity<List<ItemRequestDto>> getSimilarItems(@PathVariable UUID id) {
        try {
            List<ItemRequestDto> items = itemService.getSimilarById(id).stream()
                    .map(ItemRequestDto::from)
                    .toList();
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
