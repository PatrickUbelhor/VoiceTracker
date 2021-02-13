package team.gif.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import team.gif.exception.DataLoadException;
import team.gif.model.Day;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.LinkedList;

@Service
public class DataLoaderService {
	
	private static final Logger logger = LogManager.getLogger(DataStorageService.class);
	
	public LinkedList<Day> load(String filename) {
		try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
			
			LinkedList<Day> days = new LinkedList<>();
			
			long dayId = -1;
			String line;
			while ((line = br.readLine()) != null) {
				String[] columns = line.split(",");
				String event = columns[0];
				Long userSnowflake = Long.parseLong(columns[1]);
				ZonedDateTime time = Instant.ofEpochMilli(Long.parseLong(columns[2])).atZone(ZoneId.of("GMT-6"));
				Long primaryChannelSnowflake = (columns.length > 3) ? Long.parseLong(columns[3]) : 0; // For LEAVE, JOIN, and MOVE
				Long secondaryChannelSnowflake = (columns.length > 4) ? Long.parseLong(columns[4]) : 0; // For MOVE
				
				/* If we've crossed over into a new day, add a new day to the list.
				 * We don't care about getting exact days since 0 AD here. We just want
				 * to detect if two days are different. We use 366 because of leap years.
				 */
				if (dayId != 366L * time.getYear() + time.getDayOfYear()) {
					dayId = 366L * time.getYear() + time.getDayOfYear();
					days.addFirst(new Day(time));
				}
				
				// Add event to latest day
				Day day = days.getFirst();
				int minute = 60 * time.getHour() + time.getMinute();
				switch (event) {
					case "J":
						day.addJoin(primaryChannelSnowflake, userSnowflake, minute);
						break;
					case "M":
						day.addMove(primaryChannelSnowflake, secondaryChannelSnowflake, userSnowflake, minute);
						break;
					case "L":
						day.addLeave(primaryChannelSnowflake, userSnowflake, minute);
						break;
					default:
						logger.error("Encountered invalid event type: '{}'", event);
						break;
				}
			}
			
			return days;
		} catch (IOException e) {
			throw new DataLoadException(filename);
		}
	}
	
}
