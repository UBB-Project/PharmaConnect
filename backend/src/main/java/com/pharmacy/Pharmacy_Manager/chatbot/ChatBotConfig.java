package com.pharmacy.Pharmacy_Manager.chatbot;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class ChatBotConfig {

  @Value("${openapi.api.url}")
  private String apiUrl;

  @Bean
  public RestClient restClient() {
    return RestClient.builder().baseUrl(apiUrl).build();
  }

}
