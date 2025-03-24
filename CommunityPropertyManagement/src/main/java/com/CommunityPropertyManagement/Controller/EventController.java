package com.CommunityPropertyManagement.Controller;

import com.CommunityPropertyManagement.Model.Event;
import com.CommunityPropertyManagement.Repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

    @Autowired
    EventRepo eventRepo;


    @PostMapping("/addEvent")
    public void addEvent(@RequestBody Event event) {
        eventRepo.save(event);

    }
}
