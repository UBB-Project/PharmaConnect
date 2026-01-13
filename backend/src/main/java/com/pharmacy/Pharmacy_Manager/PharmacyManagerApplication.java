package com.pharmacy.Pharmacy_Manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication()
@EnableScheduling
public class PharmacyManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PharmacyManagerApplication.class, args);
	}
}
