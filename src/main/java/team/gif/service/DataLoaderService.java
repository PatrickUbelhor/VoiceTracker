package team.gif.service;

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
				Long channelSnowflake = (columns.length > 3) ? Long.parseLong(columns[3]) : 0;
				
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
				if (event.equals("J")) {
					day.addJoin(channelSnowflake, userSnowflake, 60 * time.getHour() + time.getMinute());
				} else {
					day.addLeave(channelSnowflake, userSnowflake, 60 * time.getHour() + time.getMinute());
				}
			}
			
			return days;
		} catch (IOException e) {
			throw new DataLoadException(filename);
		}
	}
	
}
