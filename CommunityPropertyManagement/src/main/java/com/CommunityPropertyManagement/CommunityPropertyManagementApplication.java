package com.CommunityPropertyManagement;

import com.CommunityPropertyManagement.Model.Event;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;
import java.util.UUID;

@SpringBootApplication
public class CommunityPropertyManagementApplication {

	public static void main(String[] args) {
		Event.Location location = new Event.Location("Convention Center", "123 Tech Lane, Innovation City, IC 45678");
		Event event = new Event("Tech Conference 2023", LocalDateTime.parse("2023-11-15T09:00:00"), location);

		// Print event details
		System.out.println("Event ID: " + event.getId());
		System.out.println("Event Name: " + event.getName());
		System.out.println("Event Date: " + event.getDatetime());
		System.out.println("Location: " + event.getLocation().getName() + ", " + event.getLocation().getAddress());
		SpringApplication.run(CommunityPropertyManagementApplication.class, args);
	}

}
