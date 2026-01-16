package com.pharmacy.Pharmacy_Manager.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;

@Service
public class ImageOCRService {

  @Value("${openapi.api.key}")
  private String apiKey;

  private final ObjectMapper objectMapper = new ObjectMapper();

  public String extractText(MultipartFile file) throws Exception {

    String base64 = Base64.getEncoder().encodeToString(file.getBytes());
    String mimeType = file.getContentType();

    String body = """
        {
          "model": "gpt-4.1-mini",
          "input": [
            {
              "role": "user",
              "content": [
                {
                  "type": "input_image",
                  "image_url": "data:%s;base64,%s"
                },
                {
                  "type": "input_text",
                  "text": "Read and extract all text from this image."
                }
              ]
            }
          ]
        }
        """.formatted(mimeType, base64);

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://api.openai.com/v1/responses"))
        .header("Authorization", "Bearer " + apiKey)
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(body))
        .build();

    HttpResponse<String> response = HttpClient.newHttpClient()
        .send(request, HttpResponse.BodyHandlers.ofString());

    JsonNode root = objectMapper.readTree(response.body());

    StringBuilder extractedText = new StringBuilder();
    for (JsonNode output : root.path("output")) {
      for (JsonNode content : output.path("content")) {
        if ("output_text".equals(content.path("type").asText())) {
          extractedText.append(content.path("text").asText()).append("\n");
        }
      }
    }

    return extractedText.toString().trim();
  }
}
