package com.pharmacy.Pharmacy_Manager.controller;

import com.pharmacy.Pharmacy_Manager.service.ImageOCRService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/image")
public class ImageOCRController {

  private final ImageOCRService imageOCRService;

  public ImageOCRController(ImageOCRService imageOCRService) {
    this.imageOCRService = imageOCRService;
  }

  @PostMapping("/ocr")
  public ResponseEntity<Map<String, String>> readImage(@RequestParam("file") MultipartFile file) throws Exception {
    String text = imageOCRService.extractText(file);
    return ResponseEntity.ok(Map.of("text", text));
  }
}
