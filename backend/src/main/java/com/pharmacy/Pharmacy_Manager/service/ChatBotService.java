package com.pharmacy.Pharmacy_Manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.pharmacy.Pharmacy_Manager.dto.ChatGptRequest;
import com.pharmacy.Pharmacy_Manager.dto.ChatGptResponse;
import com.pharmacy.Pharmacy_Manager.dto.PromptRequest;

@Service
public class ChatBotService {

  private final RestClient restClient;

  public ChatBotService(RestClient restClient) {
    this.restClient = restClient;
  }

  @Value("${openapi.api.key}")
  private String apiKey;

  @Value("${openapi.api.model}")
  private String model;

  public String getChatResponse(PromptRequest promptRequest) {

    ChatGptRequest chatGptRequest = new ChatGptRequest(model,
        List.of(new ChatGptRequest.Message("user", promptRequest.prompt())));

    ChatGptResponse response = restClient
        .post()
        .header("Authorization", "Bearer " + apiKey)
        .header("Content-Type", "application/json")
        .body(chatGptRequest)
        .retrieve()
        .body(ChatGptResponse.class);

    return response.choice().get(0).message().content();
  }
}
