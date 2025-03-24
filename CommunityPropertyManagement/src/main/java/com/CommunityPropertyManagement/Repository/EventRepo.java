package com.CommunityPropertyManagement.Repository;

import com.CommunityPropertyManagement.Model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.bson.types.ObjectId;

public interface EventRepo extends MongoRepository<Event, Integer> {
}
