package com.patrickubelhor.repository;


import com.patrickubelhor.model.event.Event;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EventRepository extends CrudRepository<Event, Long> {
	
	@Query(value = "SELECT events FROM Event events ORDER BY instant ASC")
	List<Event> findAllEvents();
	
}
