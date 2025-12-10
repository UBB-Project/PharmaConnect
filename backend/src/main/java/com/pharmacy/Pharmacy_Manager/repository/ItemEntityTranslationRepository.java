package com.pharmacy.Pharmacy_Manager.repository;

import com.pharmacy.Pharmacy_Manager.model.ItemEntityTranslation;
import com.pharmacy.Pharmacy_Manager.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ItemEntityTranslationRepository extends JpaRepository<ItemEntityTranslation, UUID> {

    List<ItemEntityTranslation> findByItemId(UUID itemId);

    // Optionally, find one translation by item id and language
    Optional<ItemEntityTranslation> findByItemIdAndLanguage(UUID itemId, Language language);

    List<ItemEntityTranslation> findAllByLanguage(Language language);
}
