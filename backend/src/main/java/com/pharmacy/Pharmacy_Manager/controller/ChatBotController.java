package com.pharmacy.Pharmacy_Manager.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharmacy.Pharmacy_Manager.dto.PromptRequest;
import com.pharmacy.Pharmacy_Manager.service.ChatBotService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/chat")
public class ChatBotController {

  private final ChatBotService chatBotService;

  public ChatBotController(ChatBotService chatBotService) {
    this.chatBotService = chatBotService;
  }

  @PostMapping
  public String chat(@RequestBody PromptRequest promptRequest) {
    return chatBotService.getChatResponse(promptRequest);
  }
}
