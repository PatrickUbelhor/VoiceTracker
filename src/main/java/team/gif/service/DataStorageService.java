package team.gif.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import team.gif.model.Day;
import team.gif.model.Histogram;
import team.gif.model.Interval;
import team.gif.model.User;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@Service
public class DataStorageService {
	
	private static final Logger logger = LogManager.getLogger(DataStorageService.class);
	private LinkedList<Day> days;
	private LinkedList<Histogram> histograms7;  // Histograms of last 7 days
	private LinkedList<Histogram> histograms30; // Histograms of last 30 days
	
	public DataStorageService() {
		this.days = new LinkedList<>();
		this.histograms7 = new LinkedList<>();
		this.histograms30 = new LinkedList<>();
		
		days.add(new Day());
	}
	
	
	public List<Day> getDays(int currentMinute) {
		synchronized (this) {
			days.getFirst().truncateCurrentIntervals(currentMinute);
		}
		
		return days;
	}
	
	
	public List<Histogram> get7DayHistogram() {
		return histograms7;
	}
	
	
	public List<Histogram> get30DayHistogram() {
		return histograms30;
	}
	
	
	public String getAnalysis(int numDays, String username1, String username2) {
		int totalTime1 = 0;
		int totalTime2 = 0;
		int totalTimeBoth = 0;
		int totalTime = 1440 * numDays;
		
		numDays = Math.min(numDays, this.days.size());
		List<Day> days = this.days.subList(1, numDays + 1);
		for (Day day : days) {
			User user1 = null;
			User user2 = null;
			for (User user : day.getUsers()) {
				if (user.getId().equals(username1)) {
					user1 = user;
				}
				
				if (user.getId().equals(username2)) {
					user2 = user;
				}
			}
			
			if (user1 != null) {
				for (Interval interval : user1.getIntervals()) {
					totalTime1 += interval.getEnd() - interval.getStart();
				}
			}
			
			if (user2 != null) {
				for (Interval interval : user2.getIntervals()) {
					totalTime2 += interval.getEnd() - interval.getStart();
				}
			}
			
			if (user1 == null || user2 == null) continue;
			
			// Calculate time that both were online
			int[] userDay1 = new int[1440];
			Arrays.fill(userDay1, 0);
			for (Interval interval : user1.getIntervals()) {
				for (int i = interval.getStart(); i < interval.getEnd(); i++) {
					userDay1[i] = 1;
				}
			}
			
			int[] userDay2 = new int[1440];
			Arrays.fill(userDay2, 0);
			for (Interval interval : user2.getIntervals()) {
				for (int i = interval.getStart(); i < interval.getEnd(); i++) {
					userDay2[i] = 1;
				}
			}
			
			for (int i = 0; i < 1440; i++) {
				totalTimeBoth += (userDay1[i] + userDay2[i]) / 2;
			}
		}
		
		double probOne = ((double) totalTime1) / ((double) totalTime);
		double probTwo = ((double) totalTime2) / ((double) totalTime);
		double probBoth = ((double) totalTimeBoth) / ((double) totalTime);
		double probOneGivenTwo = probBoth / probTwo;
		double probTwoGivenOne = probBoth / probOne;
		
		String output =
				String.format("P(%s) = %f\n", username1, probOne)
				+ String.format("P(%s) = %f\n", username2, probTwo)
				+ String.format("P(%s, %s) = %f\n", username1, username2, probBoth)
				+ String.format("P(%s | %s) = %f\n", username1, username2, probOneGivenTwo)
				+ String.format("P(%s | %s) = %f\n", username2, username1, probTwoGivenOne)
				;
		
		return output;
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
		
		updateHistogramCache();
	}
	
	
	public void updateHistogramCache() {
		this.histograms7 = computeHistograms(7, 2);
		this.histograms30 = computeHistograms(30, 5);
		logger.info("Updated histogram cache");
	}
	
	
	public LinkedList<Histogram> computeHistograms(int numDays) {
		return computeHistograms(numDays, 1);
	}
	
	
	public LinkedList<Histogram> computeHistograms(int numDays, int minActiveDays) {
		HashMap<String, Histogram> histograms = new HashMap<>();
		HashMap<String, Integer> numActiveDays = new HashMap<>(); // Number of days each user was in call
		List<Day> days = this.days.subList(1, numDays + 1); // Only get data for last 30 finished days (excludes today)
		
		// Add each interval to the respective user's histogram
		for (Day day : days) {
			for (User user : day.getUsers()) {
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
		
		// Remove users that weren't on for enough days
		for (String user : numActiveDays.keySet()) {
			if (numActiveDays.get(user) < minActiveDays) {
				histograms.remove(user);
			}
		}
		
		return new LinkedList<>(histograms.values());
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
