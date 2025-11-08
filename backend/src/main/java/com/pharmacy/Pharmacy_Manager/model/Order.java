package com.pharmacy.Pharmacy_Manager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

import java.time.Instant;
import java.util.UUID;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false, unique = true)
    private UUID id;

    @Column
    @Enumerated
    private OrderType type;

    @Column
    @CreationTimestamp(source = SourceType.DB)
    private Instant placedAt;

    @Column
    private int quantity;

    @ManyToOne()
    @JoinColumn(name= "item_id", referencedColumnName = "id")
    private Item item;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
