package com.pharmacy.Pharmacy_Manager.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.pharmacy.Pharmacy_Manager.dto.OrderDTO;
import com.pharmacy.Pharmacy_Manager.dto.OrderQRCodeDTO;
import com.pharmacy.Pharmacy_Manager.model.Order;
import com.pharmacy.Pharmacy_Manager.model.User;
import com.pharmacy.Pharmacy_Manager.repository.ItemRepository;
import com.pharmacy.Pharmacy_Manager.repository.OrderRepository;
import com.pharmacy.Pharmacy_Manager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import javax.imageio.ImageIO;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public Order get(UUID id)  {
        final var maybeOrder = repository.findById(id);
        if(maybeOrder.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return maybeOrder.get();
    }

    public Order create(OrderDTO dto) {
        final var user = userRepository.findById(dto.getUserId());
        final var item = itemRepository.findById(dto.getItemId());
        if(item.isEmpty() || user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Order order = dto.toOrder(user.get(), item.get());
        return repository.save(order);
    }

    public byte[] getQR(Order order) throws IOException, WriterException {
        var qrDTO = OrderQRCodeDTO.fromOrder(order);
        var dtoString = objectMapper.writeValueAsString(qrDTO);
        return generateQRCode(dtoString);
    }

    private byte[] generateQRCode(String text) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 400, 400);

        var qrcodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        ImageIO.write(qrcodeImage, "PNG", pngOutputStream);

        return pngOutputStream.toByteArray();
    }
}
