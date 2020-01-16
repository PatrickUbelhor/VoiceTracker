package team.gif.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import team.gif.model.Day;
import team.gif.model.Histogram;
import team.gif.model.Interval;
import team.gif.model.User;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@Service
public class DataStorageService {
	
	private static final Logger logger = LogManager.getLogger(DataStorageService.class);
	private LinkedList<Day> days;
	private LinkedList<Histogram> histograms;
	
	public DataStorageService() {
		this.days = new LinkedList<>();
		this.histograms = null;
		
		days.add(new Day());
	}
	
	
	public List<Day> getDays(int currentMinute) {
		synchronized (this) {
			days.getFirst().truncateCurrentIntervals(currentMinute);
		}
		
		return days;
	}
	
	public List<Histogram> getHistograms() {
		if (histograms == null) {
			computeHistograms();
		}
		
		return histograms;
	}

	@Scheduled(cron = "0 0 0 ? * *")
	public void addNewDay() {
		// Any intervals that haven't explicitly been given an end time will default to 1440 (end of day)
		// We don't need to start new intervals for each user that's logged in
		// When they leave, the event will create a new interval with default start of 0
		logger.info("Adding new day");
		synchronized (this) {
			Day yesterday = days.getFirst(); // Day that just ended
			Day today = new Day(); // Day that is just starting
			
			// For each user still on at end of day, make sure they appear at start of new day
			// Not necessary, but is useful for live reporting on front end (don't have to wait
			// until they leave to create an interval for that session)
			for (User user : yesterday.getOnlineUsers()) {
				today.addJoin(user.getSnowflake(), 0);
			}
			
			yesterday.truncateCurrentIntervals(Interval.MAX_TIME);
			days.addFirst(today);
		}
		
		computeHistograms();
	}
	
	public void computeHistograms() {
		// TODO: Make this an iterative process: remove day 31 data, add yesterday's data
		// How would this be impacted by name changes?
		HashMap<String, Histogram> histograms = new HashMap<>();
		List<Day> days = this.days.subList(1, 31); // Only get data for last 30 finished days
		
		// Add each interval to the respective user's histogram
		for (Day day : days) {
			for (User user : day.getUsers()) {
				histograms.putIfAbsent(user.getId(), new Histogram(user.getId()));
				
				Histogram histogram = histograms.get(user.getId());
				for (Interval interval : user.getIntervals()) {
					histogram.addInterval(interval);
				}
			}
		}
		
		this.histograms = new LinkedList<>(histograms.values());
	}
	
	public void addJoinEvent(Long snowflake, int minute) {
		synchronized (this) {
			days.getFirst().addJoin(snowflake, minute);
		}
	}
	
	public void addLeaveEvent(Long snowflake, int minute) {
		synchronized (this) {
			days.getFirst().addLeave(snowflake, minute);
		}
	}
	
	public void replaceDays(LinkedList<Day> days) {
		synchronized (this) {
			this.days = days;
		}
	}
	
}
