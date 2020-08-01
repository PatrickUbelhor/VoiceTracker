package team.gif.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import team.gif.model.Day;
import team.gif.model.Histogram;
import team.gif.model.Interval;
import team.gif.model.Stats;
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
	
	
	public List<Stats> getAnalysis(int numDays, String username) {
		HashMap<String, Integer> time = new HashMap<>(); // Time each individual user is in call
		HashMap<String, Integer> jointTime = new HashMap<>(); // Time users have spent with origin user
		
		numDays = Math.min(numDays, this.days.size());
		List<Day> days = this.days.subList(1, numDays + 1);
		for (Day day : days) {
			HashMap<String, Integer[]> schedules = new HashMap<>();
			
			// Get all users' schedules as arrays
			for (User user : day.getUsers()) {
				Integer[] schedule = new Integer[1440];
				Arrays.fill(schedule, 0);
				
				for (Interval interval : user.getIntervals()) {
					Arrays.fill(schedule, interval.getStart(), interval.getEnd(), 1);
				}
				
				schedules.put(user.getId(), schedule);
			}
			
			// Compute daily time and joint time
			Integer[] zeros = new Integer[1440];
			Arrays.fill(zeros, 0);
			Integer[] originSchedule = schedules.getOrDefault(username, zeros);
			for (String key : schedules.keySet()) {
				Integer[] schedule = schedules.get(key);
				int subTime = 0;
				int subJointTime = 0;
				time.putIfAbsent(key, 0);
				jointTime.putIfAbsent(key, 0);
				
				for (int i = 0; i < 1440; i++) {
					subTime += schedule[i];
					subJointTime += (schedule[i] + originSchedule[i]) / 2;
				}
				
				time.put(key, time.get(key) + subTime);
				jointTime.put(key, jointTime.get(key) + subJointTime);
			}
		}
		
		// Compute dependent statistics for origin user
		// NOTE: this is the only part that needs to be altered to efficiently get stats for evey user to every other user
		int totalTime = 1440 * numDays;
		double probOrigin = ((double) time.get(username)) / ((double) totalTime);
		LinkedList<Stats> stats = new LinkedList<>();
		for (String key : time.keySet()) {
			if (username.equals(key)) continue; // Skip origin user
			
			double probTarget = ((double) time.get(key)) / ((double) totalTime);
			double probJoint = ((double) jointTime.get(key)) / ((double) totalTime);
			double probOriginGivenTarget = probJoint / probTarget;
			double probTargetGivenOrigin = probJoint / probOrigin;
			String data = String.format("%.4f\n", probOrigin)
					+ String.format("%.4f\n", probTarget)
					+ String.format("%.4f\n", probJoint)
					+ String.format("%.4f\n", probOriginGivenTarget)
					+ String.format("%.4f\n", probTargetGivenOrigin)
			;
			
			stats.push(new Stats(username, key, data));
		}
		
		return stats;
	}
	
	
	public void updateHistogramCache() {
		this.histograms7 = computeHistograms(7, 2);
		this.histograms30 = computeHistograms(30, 5);
		logger.info("Updated histogram cache");
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
