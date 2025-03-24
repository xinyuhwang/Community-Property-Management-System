package com.CommunityPropertyManagement.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Document
@Data
@NoArgsConstructor
public class Event {
    @Id
    private ObjectId id;
    private String name;
    private LocalDateTime datetime;
    private Location location;

    // Custom constructor without the 'id' field
    public Event(String name, LocalDateTime datetime, Location location) {
        this.name = name;
        this.datetime = datetime;
        this.location = location;
    }

    // Nested Location class
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Location {
        private String name;
        private String address;
    }
}
