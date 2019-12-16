package team.gif.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.gif.model.EventType;
import team.gif.model.ProcessedEvent;
import team.gif.model.User;
import team.gif.service.DataReader;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class Controller {
	
	private final DataReader dataReader;
	
	@Autowired
	public Controller() {
		this.dataReader = new DataReader();
	}
	
	
	/*
	 * Assumption: we will never see two joins or two leaves from the same user in a row
	 *     Although this is a fair assumption, it may not hold if the bot goes offline
	 *     (such as for a restart/update).
	 */
	@GetMapping()
	public List<User> getData() {
		
		// Convert the RawEvents to ProcessedEvents
		List<ProcessedEvent> processedEvents = dataReader.getData("VoiceTracker.csv").stream()
				.map(ProcessedEvent::process)
				.collect(Collectors.toList());
		
		// Separate list of events by user
		HashMap<String, LinkedList<ProcessedEvent>> eventMap = mapEventsToUsers(processedEvents);
	
		// Turn events into intervals per day per user
		HashMap<String, User> userMap = new HashMap<>();
		for (String name : eventMap.keySet()) {
			userMap.put(name, new User(name));
			User user = userMap.get(name);
			
			for (ProcessedEvent event : eventMap.get(name)) {
				user.addEvent(event);
			}
		}
		
		return new LinkedList<>(userMap.values());
	}
	
	private HashMap<String, LinkedList<ProcessedEvent>> mapEventsToUsers(List<ProcessedEvent> processedEvents) {
		HashMap<String, LinkedList<ProcessedEvent>> eventMap = new HashMap<>();
		for (ProcessedEvent event : processedEvents) {
			eventMap.putIfAbsent(event.getName(), new LinkedList<>());
			LinkedList<ProcessedEvent> events = eventMap.get(event.getName());
			
			// If this is the first event, add to list and move on to next one
			if (events.isEmpty()) {
				events.addLast(event);
				continue;
			}
			
			// If this is a JOIN event...
			if (event.getEventType() == EventType.JOIN) {
				// Coalesce intervals if 0-1 minute gap between
				if (event.getMinutesSince(events.getLast()) <= 1) {
					events.removeLast();
					continue;
				}
				
				events.addLast(event);
				continue;
			}
			
			// If this is a LEAVE event...
			if (event.getEventType() == EventType.LEAVE) {
				// Remove interval if 0-1 minutes in length
				if (event.getMinutesSince(events.getLast()) <= 1) {
					events.removeLast();
					continue;
				}
				
				events.addLast(event);
				continue;
			}
		}
		
		return eventMap;
	}
	
}
