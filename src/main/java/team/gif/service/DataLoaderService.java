package team.gif.service;

import team.gif.exception.DataLoadException;
import team.gif.model.Day;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.LinkedList;

public class DataLoaderService {
	
	public LinkedList<Day> load(String filename) {
		try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
			
			LinkedList<Day> days = new LinkedList<>();
			
			long dayId = -1;
			String line;
			while ((line = br.readLine()) != null) {
				String[] columns = line.split(",");
				String event = columns[0];
				Long snowflake = Long.parseLong(columns[1]);
				ZonedDateTime time = Instant.ofEpochMilli(Long.parseLong(columns[2])).atZone(ZoneId.of("GMT-6"));
				
				// If we've crossed over into a new day, add a new day to the list
				if (dayId != 366 * time.getYear() + time.getDayOfYear()) {
					dayId = 366 * time.getYear() + time.getDayOfYear();
					days.addLast(new Day(time));
				}
				
				// Add event to last day
				Day day = days.getLast();
				if (event.equals("J")) {
					day.addJoin(snowflake, 60 * time.getHour() + time.getMinute());
				} else {
					day.addLeave(snowflake, 60 * time.getHour() + time.getMinute());
				}
			}
			
			return days;
		} catch (IOException e) {
			throw new DataLoadException(filename);
		}
	}
	
}
