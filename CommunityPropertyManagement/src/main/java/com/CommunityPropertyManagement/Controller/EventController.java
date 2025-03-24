package com.CommunityPropertyManagement.Controller;

import com.CommunityPropertyManagement.Model.Event;
import com.CommunityPropertyManagement.Service.EventService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/events") // Base URL for all endpoints in this controller
public class EventController {

    @Autowired
    private EventService eventService;

    // Create a new Event
    @PostMapping("/addEvent")
    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    // Get all future events sorted by date (nearest events first)
    @GetMapping
    public ResponseEntity<List<Event>> getAllFutureEventsSorted() {
        List<Event> events = eventService.getAllFutureEventsSortedByDate();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    // Get an Event by ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        ObjectId objectId = new ObjectId(id); // Convert String to ObjectId
        Event event = eventService.getEventById(objectId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    // Update an Event by ID
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @Valid @RequestBody Event updatedEvent) {
        ObjectId objectId = new ObjectId(id); // Convert String to ObjectId
        Event event = eventService.updateEvent(objectId, updatedEvent);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    // Delete an Event by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        ObjectId objectId = new ObjectId(id); // Convert String to ObjectId
        eventService.deleteEvent(objectId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}