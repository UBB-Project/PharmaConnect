package com.pharmacy.Pharmacy_Manager.service;

import com.pharmacy.Pharmacy_Manager.model.StockAlert;
import com.pharmacy.Pharmacy_Manager.repository.StockAlertRepository;
import com.pharmacy.Pharmacy_Manager.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class StockNotificationService {

    @Autowired
    private StockAlertRepository alertRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private JavaMailSender mailSender;

    public void registerInterest(String email, UUID itemId) {
        StockAlert alert = new StockAlert();
        alert.setEmail(email);
        alert.setItemId(itemId);
        alertRepository.save(alert);
    }

    @Scheduled(fixedRate = 5000)
    @Transactional
    public void checkDatabaseChanges() {
        List<StockAlert> allAlerts = alertRepository.findAll();

        for (StockAlert alert : allAlerts) {
            itemRepository.findById(alert.getItemId()).ifPresent(item -> {
                if (item.getStockQuantity() != null && item.getStockQuantity() > 0) {

                    sendEmail(alert.getEmail(), item.getName());

                    alertRepository.delete(alert);

                    System.out.println("Am detectat stoc nou  pentru " + item.getName() + ". Mail trimis!");
                }
            });
        }
    }

    private void sendEmail(String email, String productName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("contact.pharmaconnect@gmail.com");
            message.setTo(email);
            message.setSubject("Stoc nou: " + productName);
            message.setText("Bună! Vă anunțăm că " + productName + " a revenit în stoc pe PharmaConnect!");
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Eroare la trimitere mail: " + e.getMessage());
        }
    }
}