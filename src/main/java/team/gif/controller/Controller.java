package team.gif.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.gif.model.Interval;
import team.gif.model.RawData;
import team.gif.service.DataReader;

import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

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
	public void getData() {
		List<RawData> rawData = dataReader.getData("VoiceTracker.csv");
		
		// Iterate through list of keys in Map to create User object (this is where you resolve users' names).
		// Split data into days at some point?
		
		// Make list of intervals. Place them in HashMap with snowflake as key.
		HashMap<Long, LinkedList<Interval>> intervals = new HashMap<>();
		for (RawData rd : rawData) {
			intervals.putIfAbsent(rd.getSnowflake(), new LinkedList<>());
			LinkedList<Interval> list = intervals.get(rd.getSnowflake());
			
			if (rd.getAction().equals("J")) { // User joined VC
				if (list.isEmpty() || list.getLast().getEnd() != Interval.MAX_TIME) {
					list.addLast(new Interval());
				}
				
				list.getLast().setStart(rd.getInstant().atZone(ZoneOffset.UTC).getMinute()
						+ 60 * rd.getInstant().atZone(ZoneOffset.UTC).getHour());
			} else { // User left VC
				if (list.isEmpty()) {
					list.addLast(new Interval());
				}
				
				list.getLast().setEnd(rd.getInstant().atZone(ZoneOffset.UTC).getMinute()
						+ 60 * rd.getInstant().atZone(ZoneOffset.UTC).getHour());
			}
		}
		
		// Run through each list of intervals. Remove if length = 0. Coalesce if end0 = start1.
		for (Long snowflake : intervals.keySet()) {
			LinkedList<Interval> list = intervals.get(snowflake);
			LinkedList<Interval> refinedList = new LinkedList<>();
			
			for (int i = 0; i < list.size(); i++) {
				Interval interval = list.get(i);
				
				// Ignore if length = 0
				if (interval.getEnd() - interval.getStart() == 0) {
					continue;
				}
				
				// If this interval ends at the same time the next one starts, then coalesce
				if (i + 1 < list.size() && interval.getEnd() == list.get(i + 1).getStart()) {
					list.get(i + 1).setStart(interval.getStart());
					continue;
				}
				
				refinedList.addLast(interval);
			}
		}
		
	}
	
}
