package com.pharmacy.Pharmacy_Manager.controller;

import com.google.zxing.WriterException;
import com.pharmacy.Pharmacy_Manager.dto.OrderDTO;
import com.pharmacy.Pharmacy_Manager.model.Order;
import com.pharmacy.Pharmacy_Manager.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @GetMapping("{id}")
    public ResponseEntity<Order> getOrder(@PathVariable String id){
        final var order = service.get(UUID.fromString(id));
        return ResponseEntity.ok(order);
    }

    @PostMapping()
    public ResponseEntity<byte[]> placeOrder(@RequestBody OrderDTO dto) {
        try {
            var order = service.create(dto);
            var qrImage = service.getQR(order);

            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(qrImage);
        } catch (IOException | WriterException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
