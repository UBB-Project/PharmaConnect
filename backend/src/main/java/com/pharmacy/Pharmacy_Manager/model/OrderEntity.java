package com.pharmacy.Pharmacy_Manager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false, unique = true)
    private UUID id;

    @Column
    @Enumerated(EnumType.STRING)
    private OrderType type;

    @Column
    @CreationTimestamp(source = SourceType.DB)
    private Instant placedAt;

    @Column
    @NotNull
    private int quantity;

    @ManyToOne()
    @JoinColumn(name= "item_id", referencedColumnName = "id")
    @NotNull
    private ItemEntity item;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @NotNull
    private UserEntity user;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}
