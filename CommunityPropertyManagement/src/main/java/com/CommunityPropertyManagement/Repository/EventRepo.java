package com.CommunityPropertyManagement.Repository;

import com.CommunityPropertyManagement.Model.Event;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepo extends MongoRepository<Event, ObjectId> {
}
