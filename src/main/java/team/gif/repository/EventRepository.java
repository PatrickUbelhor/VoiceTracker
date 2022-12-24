package team.gif.repository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import team.gif.model.Event;

import java.util.List;

public interface EventRepository extends CrudRepository<Event, Long> {
	
	@Query(value = "SELECT events FROM Event events ORDER BY instant ASC")
	List<Event> findAllEvents();
	
}
