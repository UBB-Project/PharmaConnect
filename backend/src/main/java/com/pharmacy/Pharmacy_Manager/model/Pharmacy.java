package com.pharmacy.Pharmacy_Manager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Entity
@Table (name = "pharmacies")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Pharmacy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

//    @OneToMany(mappedBy = "pharmacy", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Location> locations;
}
