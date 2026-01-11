package com.pharmacy.Pharmacy_Manager.dto;

import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
public class StockCheckResponseDto {
    private List<ItemResponseDto> availableItems = new ArrayList<>();

    private List<String> notFoundNames = new ArrayList<>();

    private List<String> outOfStockNames = new ArrayList<>();

    public void addAvailable(ItemResponseDto item) { this.availableItems.add(item); }
    public void addNotFound(String name) { this.notFoundNames.add(name); }
    public void addOutOfStock(String name) { this.outOfStockNames.add(name); }
}