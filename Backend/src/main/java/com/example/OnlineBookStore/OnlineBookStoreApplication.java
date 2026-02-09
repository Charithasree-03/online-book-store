package com.example.OnlineBookStore;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class OnlineBookStoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineBookStoreApplication.class, args);
	}

	@Bean
	CommandLineRunner cleanupDuplicateEmails(JdbcTemplate jdbc) {
		return args -> {
			System.out.println("=== Checking for duplicate emails ===");
			// Delete duplicate users keeping only the one with the lowest ID
			int deleted = jdbc.update(
				"DELETE u1 FROM user u1 " +
				"INNER JOIN user u2 " +
				"WHERE u1.email = u2.email AND u1.id > u2.id"
			);
			if (deleted > 0) {
				System.out.println("=== Deleted " + deleted + " duplicate user(s) ===");
			} else {
				System.out.println("=== No duplicate users found ===");
			}
		};
	}
}
