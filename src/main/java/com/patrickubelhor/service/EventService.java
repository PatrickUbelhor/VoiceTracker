package com.patrickubelhor.service;

import com.patrickubelhor.model.Day;
import com.patrickubelhor.model.Event;
import com.patrickubelhor.model.EventType;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.patrickubelhor.repository.EventRepository;

import java.util.LinkedList;
import java.util.List;

@Service
public class EventService {
	
	private static final Logger logger = LogManager.getLogger(EventService.class);
	
	private final EventRepository eventRepository;
	private final DataLoaderService dataLoaderService;
	
	@Autowired
	EventService(EventRepository eventRepository, DataLoaderService dataLoaderService) {
		this.eventRepository = eventRepository;
		this.dataLoaderService = dataLoaderService;
	}
	
	
	public LinkedList<Day> getAllDays() {
		List<Event> events = eventRepository.findAllEvents();
		return dataLoaderService.convertEventsToDays(events);
	}
	
	
	public void saveJoinEvent(Long userSnowflake, Long instant, Long channelSnowflake) {
		Event event = new Event(EventType.JOIN, userSnowflake, instant, channelSnowflake);
		eventRepository.save(event);
	}
	
	
	public void saveLeaveEvent(Long userSnowflake, Long instant, Long channelSnowflake) {
		Event event = new Event(EventType.LEAVE, userSnowflake, instant, channelSnowflake);
		eventRepository.save(event);
	}
	
	
	public void saveMoveEvent(Long userSnowflake, Long instant, Long joinChannelSnowflake, Long leaveChannelSnowflake) {
		Event event = new Event(EventType.MOVE, userSnowflake, instant, joinChannelSnowflake, leaveChannelSnowflake);
		eventRepository.save(event);
	}
	
	
	public void readEventsFromFile(String filename) {
		eventRepository.deleteAll();
		List<Event> events = dataLoaderService.loadEventsFromFile(filename);
		eventRepository.saveAll(events);
	}
	
}
