package com.pharmacy.Pharmacy_Manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.pharmacy.Pharmacy_Manager.dto.ChatGptRequest;
import com.pharmacy.Pharmacy_Manager.dto.ChatGptResponse;
import com.pharmacy.Pharmacy_Manager.dto.PromptRequest;
import com.pharmacy.Pharmacy_Manager.model.ItemEntity;
import com.pharmacy.Pharmacy_Manager.repository.ItemRepository;

@Service
public class ChatBotService {

  private final RestClient restClient;
  private final ItemRepository itemRepository;

  @Value("${openapi.api.key}")
  private String apiKey;

  @Value("${openapi.api.model}")
  private String model;

  public ChatBotService(RestClient restClient, ItemRepository itemRepository) {
    this.restClient = restClient;
    this.itemRepository = itemRepository;
  }

  public String getChatResponse(PromptRequest promptRequest) {
    String userMessage = promptRequest.prompt();

    List<ItemEntity> allItems = itemRepository.findAll();

    StringBuilder dbContext = new StringBuilder();
    for (ItemEntity item : allItems) {
      dbContext.append(item.getName())
          .append(" - ")
          .append(item.getDescription())
          .append("\n");
    }

    String systemPrompt = "You are a pharmacy assistant. Your job is to recommend medications or supplements to the user.\n"
        + "- The user may describe symptoms (like \"headache\" or \"nausea\"), or write in any language.\n"
        + "- The user may also describe general health concerns or body areas (like \"heart,\" \"joints,\" \"skin\"), in any language.\n"
        + "- Match their input to the most relevant item in the database, even if it is not strictly a symptom.\n"
        + "- Always use the database to provide your recommendation.\n"
        + "- Respond in the same language the user writes in.\n"
        + "- If nothing matches, respond: \"Sorry, I couldn't find any medications or supplements for that concern.\" Translate it in the language the user wrote in.\n"
        + "- If the user asks something unrelated to medications or supplements, respond: \"I can only help with medication or supplement recommendations.\"Translate it in the language the user wrote in.\\n\n"
        + "Here are the items in your database:\n" +
        dbContext.toString();

    ChatGptRequest chatGptRequest = new ChatGptRequest(
        model,
        List.of(
            new ChatGptRequest.Message("system", systemPrompt),
            new ChatGptRequest.Message("user", userMessage)));

    ChatGptResponse response = restClient
        .post()
        .header("Authorization", "Bearer " + apiKey)
        .header("Content-Type", "application/json")
        .body(chatGptRequest)
        .retrieve()
        .body(ChatGptResponse.class);

    return response.choices().get(0).message().content();
  }
}
