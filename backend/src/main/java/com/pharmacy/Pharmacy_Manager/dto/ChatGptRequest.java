package com.pharmacy.Pharmacy_Manager.dto;

import java.util.List;

public record ChatGptRequest(String model, List<Message> messages) {

  public static record Message(String role, String content) {
  }
}
