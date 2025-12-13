package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.dto.CartRequestDTO;
import com.pharmacy.Pharmacy_Manager.dto.CartResponseDTO;
import com.pharmacy.Pharmacy_Manager.model.UserEntity;
import com.pharmacy.Pharmacy_Manager.service.CartService;
import com.pharmacy.Pharmacy_Manager.service.UserService;
import com.pharmacy.Pharmacy_Manager.service.mapper.CartMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/cart")
@Builder
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {
    private final CartService cartService;
    private final UserService userService;

    @GetMapping("/{userId}")
    public List<CartResponseDTO> getCart(@PathVariable UUID userId) {
        UserEntity user = userService.getById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cartService.getCartItems(user)
                .stream()
                .map(CartMapper::toReponseDTO)
                .collect(Collectors.toList());
    }

    @PostMapping("/{userId}")
    public CartResponseDTO addItem(@PathVariable UUID userId, @RequestBody CartRequestDTO request) {
        UserEntity user = userService.getById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return CartMapper.toReponseDTO(cartService.addItemToCart(user, request.getId(), request.getQuantity()));
    }

    @PutMapping("/{userId}")
    public CartResponseDTO updateItem(@PathVariable UUID userId, @RequestBody CartRequestDTO request) {
        UserEntity user = userService.getById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return CartMapper.toReponseDTO(cartService.updateItemQuantity(user, request.getId(), request.getQuantity()));
    }

    @DeleteMapping("/{userId}/{itemId}")
    public void deleteItem(@PathVariable UUID userId, @PathVariable UUID itemId) {
        UserEntity user = userService.getById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        cartService.removeItemFromCart(user, itemId);
    }

}
