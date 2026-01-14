package com.pharmacy.Pharmacy_Manager.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "stock_alerts")
@Getter
@Setter
@NoArgsConstructor
public class StockAlert {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String email;
    private UUID itemId;
}
