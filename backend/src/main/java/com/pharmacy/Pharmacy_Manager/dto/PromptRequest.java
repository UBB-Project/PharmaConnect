package com.pharmacy.Pharmacy_Manager.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PromptRequest(@JsonProperty("prompt") String prompt) {
}
