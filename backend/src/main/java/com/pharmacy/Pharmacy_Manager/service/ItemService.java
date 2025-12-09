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
import com.pharmacy.Pharmacy_Manager.dto.ItemResponseDto;
import com.pharmacy.Pharmacy_Manager.dto.StockCheckResponseDto;
import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
                        String sideEffects
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

    public StockCheckResponseDto processBulkOrder(MultipartFile file) throws IOException {
        StockCheckResponseDto response = new StockCheckResponseDto();

        List<ItemEntity> allItems = itemRepository.findAll();

        LevenshteinDistance levenshtein = new LevenshteinDistance();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String searchName = line.trim();
                if (searchName.isEmpty()) continue;

                ItemEntity bestMatch = null;
                int bestDistance = Integer.MAX_VALUE;

                for (ItemEntity item : allItems) {
                    if (item.getName() == null) continue;

                    int distance = levenshtein.apply(searchName.toLowerCase(), item.getName().toLowerCase());

                    if (distance < bestDistance) {
                        bestDistance = distance;
                        bestMatch = item;
                    }
                }

                if (bestMatch != null && bestDistance <= 3) {

                    // TODO: Later replace with: int stock = bestMatch.getStock();
                    int stock = 50;

                    if (bestMatch.getName().toUpperCase().contains("X")) {
                        stock = 0;
                    }

                    if (stock > 0) {
                        ItemResponseDto dto = mapToResponseDto(bestMatch);
                        response.addAvailable(dto);
                    } else {
                        response.addOutOfStock(bestMatch.getName());
                    }
                } else {
                    response.addNotFound(searchName);
                }
            }
        }
        return response;
    }

    private ItemResponseDto mapToResponseDto(ItemEntity entity) {
        return ItemResponseDto.builder()
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .brand(entity.getBrand())
                .imageUrl(entity.getImageUrl())
                .manufacturingDate(entity.getManufacturingDate())
                .expirationDate(entity.getExpirationDate())
                .prescriptionRequired(entity.getPrescriptionRequired())
                .sideEffects(entity.getSideEffects())
                .build();
    }
}
