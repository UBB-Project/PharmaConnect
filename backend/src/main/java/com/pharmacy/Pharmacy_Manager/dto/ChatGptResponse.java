package com.pharmacy.Pharmacy_Manager.dto;

import java.util.List;

public record ChatGptResponse(List<Choice> choices) {

  public static record Choice(Message message) {

    public static record Message(String role, String content) {
    }
  }
}
