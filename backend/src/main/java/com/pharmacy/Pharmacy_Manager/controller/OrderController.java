package com.pharmacy.Pharmacy_Manager.controller;

import com.google.zxing.WriterException;
import com.pharmacy.Pharmacy_Manager.dto.OrderDTO;
import com.pharmacy.Pharmacy_Manager.model.OrderEntity;
import com.pharmacy.Pharmacy_Manager.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @GetMapping("{id}")
    public ResponseEntity<OrderEntity> getOrder(@PathVariable String id){
        final OrderEntity orderEntity = service.get(UUID.fromString(id));
        return ResponseEntity.ok(orderEntity);
    }

    @PostMapping()
    public ResponseEntity<byte[]> placeOrder(@RequestBody OrderDTO orderDTO) {
        try {
            OrderEntity orderEntity = service.create(orderDTO);
            byte[] qrImage = service.getQR(orderEntity);

            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(qrImage);
        } catch (IOException | WriterException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
