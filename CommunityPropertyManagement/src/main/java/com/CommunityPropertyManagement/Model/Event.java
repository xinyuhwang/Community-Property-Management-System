package com.CommunityPropertyManagement.Model;

import com.CommunityPropertyManagement.Config.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;

import javax.validation.constraints.Future;
import java.time.LocalDateTime;

@Document
@Data
@NoArgsConstructor
public class Event {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class) // Use custom serializer
    private ObjectId id; // ObjectId as the primary key
    private String name;

    @Future(message = "Event date must be in the future") // Ensure datetime is in the future
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