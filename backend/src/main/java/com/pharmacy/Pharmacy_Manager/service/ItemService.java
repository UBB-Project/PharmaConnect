package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.repository.ItemRepository;
import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    @Transactional
    public UUID addItem(
                        String name,
                        String description,
                        String category,
                        Double price,
                        String brand,
                        String imageUrl,
                        LocalDate manufacturingDate,
                        LocalDate expirationDate,
                        Boolean prescriptionRequired,
                        String sideEffects,
                        Integer soldCount,
                        Integer stockQuantity
                        )
        {
            ItemEntity newItemEntity = ItemEntity.builder()
                    .name(name)
                    .description(description)
                    .category(category)
                    .price(price)
                    .brand(brand)
                    .imageUrl(imageUrl)
                    .manufacturingDate(manufacturingDate)
                    .expirationDate(expirationDate)
                    .prescriptionRequired(prescriptionRequired)
                    .sideEffects(sideEffects)
                    .soldCount(soldCount)
                    .stockQuantity(stockQuantity)
                    .build();
            itemRepository.save(newItemEntity);
            return newItemEntity.getId();
        }
    public Optional<ItemEntity> getById(UUID id) {
        return itemRepository.findById(id);
    }

    public List<ItemEntity> searchFilterSort(
            String search,
            String category,
            String brand,
            Boolean prescription,
            String sort
    ) {
        List<ItemEntity> items = itemRepository.findAll();

        if (search != null && !search.isBlank()) {
            String s = search.toLowerCase();
            items = items.stream()
                    .filter(i ->
                            i.getName().toLowerCase().contains(s) ||
                                    i.getBrand().toLowerCase().contains(s)
                    )
                    .collect(Collectors.toList());
        }

        if (category != null && !category.isBlank()) {
            items = items.stream()
                    .filter(i -> i.getCategory().equalsIgnoreCase(category))
                    .collect(Collectors.toList());
        }

        if (brand != null && !brand.isBlank()) {
            items = items.stream()
                    .filter(i -> i.getBrand().equalsIgnoreCase(brand))
                    .collect(Collectors.toList());
        }

        if (prescription != null) {
            items = items.stream()
                    .filter(i -> i.getPrescriptionRequired().equals(prescription))
                    .collect(Collectors.toList());
        }

        if (sort != null) {
            switch (sort) {
                case "priceLowHigh":
                    items.sort(Comparator.comparing(ItemEntity::getPrice));
                    break;
                case "priceHighLow":
                    items.sort(Comparator.comparing(ItemEntity::getPrice).reversed());
                    break;
                case "nameAZ":
                    items.sort(Comparator.comparing(ItemEntity::getName));
                    break;
                case "nameZA":
                    items.sort(Comparator.comparing(ItemEntity::getName).reversed());
                    break;
                case "brandAZ":
                    items.sort(Comparator.comparing(ItemEntity::getBrand));
                    break;
                case "brandZA":
                    items.sort(Comparator.comparing(ItemEntity::getBrand).reversed());
                    break;
            }
        }

        return items;
    }
}
