package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.repository.ItemRepository;
import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.UUID;

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
}
