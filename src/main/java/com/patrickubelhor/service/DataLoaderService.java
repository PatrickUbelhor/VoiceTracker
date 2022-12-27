package com.patrickubelhor.service;

import com.patrickubelhor.exception.DataLoadException;
import com.patrickubelhor.model.day.Day;
import com.patrickubelhor.model.event.Event;
import com.patrickubelhor.model.event.EventType;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;

@Service
public class DataLoaderService {
	
	private static final Logger logger = LogManager.getLogger(DataLoaderService.class);
	
	public LinkedList<Event> loadEventsFromFile(String filename) {
		LinkedList<Event> events = new LinkedList<>();
		try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
			String line;
			while ((line = br.readLine()) != null) {
				String[] columns = line.split(",");
				EventType eventType = EventType.from(columns[0]);
				Long userSnowflake = Long.parseLong(columns[1]);
				Long instant = Long.parseLong(columns[2]);
				Long primaryChannel = (columns.length > 3) ? Long.parseLong(columns[3]) : 0; // For LEAVE, JOIN, and MOVE
				Long secondaryChannel = (columns.length > 4) ? Long.parseLong(columns[4]) : null; // For MOVE
				
				events.add(new Event(eventType, userSnowflake, instant, primaryChannel, secondaryChannel));
			}
		} catch (IOException e) {
			throw new DataLoadException(filename);
		}
		
		return events;
	}
	
	public LinkedList<Day> load(String filename) {
		List<Event> events = loadEventsFromFile(filename);
		return convertEventsToDays(events);
	}
	
	
	public LinkedList<Day> convertEventsToDays(List<Event> events) {
		LinkedList<Day> days = new LinkedList<>();
		long dayId = -1;
		
		for (Event event : events) {
			ZonedDateTime time = event.getIsoTime();
			
			/* If we've crossed over into a new day, add a new day to the list.
			 * We don't care about getting exact days since 0 AD here. We just want
			 * to detect if two days are different. We use 366 because of leap years.
			 */
			if (dayId != 366L * time.getYear() + time.getDayOfYear()) {
				dayId = 366L * time.getYear() + time.getDayOfYear();
				days.addFirst(new Day(time));
			}
			
			// Add event to the latest day
			Day day = days.getFirst();
			int minute = 60 * time.getHour() + time.getMinute();
			switch (event.getEventType()) {
				case JOIN -> day.addJoin(event.getPrimaryChannel(), event.getUserSnowflake(), minute);
				case MOVE -> day.addMove(event.getPrimaryChannel(), event.getSecondaryChannel(), event.getUserSnowflake(), minute);
				case LEAVE -> day.addLeave(event.getPrimaryChannel(), event.getUserSnowflake(), minute);
				default -> logger.error("Encountered invalid event type: '{}'", event);
			}
		}
		
		return days;
	}
	
}
