package com.patrickubelhor.service;

import com.patrickubelhor.model.day.Channel;
import com.patrickubelhor.model.day.Day;
import com.patrickubelhor.model.Histogram;
import com.patrickubelhor.model.Interval;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import com.patrickubelhor.model.day.User;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@Service
public class HistogramService {
	
	private static final Logger logger = LogManager.getLogger(HistogramService.class);
	private final DayService dayService;
	
	public HistogramService(DayService dayService) {
		this.dayService = dayService;
	}
	
	
	public LinkedList<Histogram> computeHistograms(int numDays, int minActiveDays) {
		logger.debug("computeHistograms({}, {})", numDays, minActiveDays);
		
		HashMap<String, Histogram> histograms = new HashMap<>();
		HashMap<String, Integer> numActiveDays = new HashMap<>(); // Number of days each user was in call
		List<Day> days = dayService.getDays(1440).subList(1, numDays + 1); // Only get data for last 30 finished days (excludes today)
		logger.debug("Got list of days with {} entries", days.size());
		
		// Add each interval to the respective user's histogram
		for (Day day : days) {
			
			// TODO: account for users being in two channels simultaneously
			for (Channel channel : day.getChannels()) {
				for (User user : channel.getUsers()) {
					histograms.putIfAbsent(user.getId(), new Histogram(user.getId()));
					
					// Add intervals to user's histogram
					Histogram histogram = histograms.get(user.getId());
					for (Interval interval : user.getIntervals()) {
						histogram.addInterval(interval);
					}
					
					// Increment number of active days for user
					numActiveDays.putIfAbsent(user.getId(), 0);
					numActiveDays.put(user.getId(), numActiveDays.get(user.getId()) + 1);
				}
			}
		}
		
		// Remove users that weren't on for enough days
		for (String user : numActiveDays.keySet()) {
			if (numActiveDays.get(user) < minActiveDays) {
				histograms.remove(user);
			}
		}
		
		return new LinkedList<>(histograms.values());
	}
	
}
