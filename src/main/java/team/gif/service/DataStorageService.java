package team.gif.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import team.gif.model.Channel;
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
			for (Channel channel : yesterday.getChannels()) {
				for (User user : channel.getOnlineUsers()) {
					today.addJoin(channel.getSnowflake(), user.getSnowflake(), 0);
				}
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
	
	
	public List<Stats> getAnalysis(int numDays, String username) {
		HashMap<String, Integer> time = new HashMap<>(); // Time each individual user is in call
		HashMap<String, Integer> jointTime = new HashMap<>(); // Time users have spent with origin user
		
		numDays = Math.min(numDays, this.days.size());
		List<Day> days = this.days.subList(1, numDays + 1);
		for (Day day : days) {
			HashMap<String, HashMap<String, Integer[]>> schedulesByChannel = getSchedulesAsArraysByChannel(day);
			
			// Calculate aggregate daily time for users
			HashMap<String, Integer[]> aggregateSchedules = new HashMap<>();
			for (String channelId : schedulesByChannel.keySet()) {
				for (String userId : schedulesByChannel.get(channelId).keySet()) {
					aggregateSchedules.putIfAbsent(userId, createEmptySchedule());
					addToAggregate(aggregateSchedules.get(userId), schedulesByChannel.get(channelId).get(userId)); // TODO: Make this more concise?
				}
			}
			
			// Add this day's aggregate time to total time
			for (String userId : aggregateSchedules.keySet()) {
				int subTime = sumSchedule(aggregateSchedules.get(userId));
				time.put(userId, subTime + time.getOrDefault(userId, 0));
			}
			
			// Calculate aggregate joint time
			HashMap<String, Integer[]> jointSchedules = new HashMap<>();
			for (String channelId : schedulesByChannel.keySet()) {
				
				HashMap<String, Integer[]> schedulesByUser = schedulesByChannel.get(channelId);
				for (String userId : schedulesByUser.keySet()) {
					jointSchedules.putIfAbsent(userId, createEmptySchedule());
					
					if (!schedulesByUser.containsKey(username)) {
						continue;
					}
					
					Integer[] jointSchedule = jointSchedules.get(userId);
					Integer[] targetSchedule = schedulesByUser.get(userId);
					Integer[] originSchedule = schedulesByUser.get(username);
					addToJointAggregate(jointSchedule, targetSchedule, originSchedule);
				}
			}
			
			// Sum minutes in all joint schedules
			for (String userId : jointSchedules.keySet()) {
				int subJointTime = sumSchedule(jointSchedules.get(userId));
				jointTime.put(userId, subJointTime + jointTime.getOrDefault(userId, 0));
			}
		}
		
		// Compute dependent statistics for origin user
		return computeStats(time, jointTime, numDays, username);
	}
	
	
	private HashMap<String, HashMap<String, Integer[]>> getSchedulesAsArraysByChannel(Day day) {
		HashMap<String, HashMap<String, Integer[]>> schedulesByChannel = new HashMap<>();
		
		// Get all users' schedules as arrays
		for (Channel channel : day.getChannels()) {
			schedulesByChannel.putIfAbsent(channel.getId(), new HashMap<>());
			HashMap<String, Integer[]> schedules = schedulesByChannel.get(channel.getId());
			
			for (User user : channel.getUsers()) {
				Integer[] schedule = convertScheduleToArray(user.getIntervals());
				schedules.put(user.getId(), schedule);
			}
		}
		
		return schedulesByChannel;
	}
	
	
	private Integer[] convertScheduleToArray(List<Interval> schedule) {
		Integer[] result = createEmptySchedule();
		
		for (Interval interval : schedule) {
			Arrays.fill(result, interval.getStart(), interval.getEnd(), 1);
		}
		
		return result;
	}
	
	
	private void addToAggregate(Integer[] accumulator, Integer[] next) {
		for (int min = 0; min < 1440; min++) {
			// Bitwise OR. This forces aggregate value to be either 0 or 1.
			// Otherwise if we just added, a user could log into two channels in different guilds simultaneously,
			// leading to an aggregate sum greater than 1440. This would mess up the stats calculation.
			accumulator[min] = accumulator[min] | next[min];
		}
	}
	
	
	private void addToJointAggregate(Integer[] accumulator, Integer[] leftSchedule, Integer[] rightSchedule) {
		for (int min = 0; min < 1440; min++) {
			// Bitwise logic same as above for aggregateOriginSchedule.
			// Two users could theoretically each be in two different channels together in two guilds.
			accumulator[min] = accumulator[min] | (leftSchedule[min] & rightSchedule[min]);
		}
	}
	
	
	private Integer[] createEmptySchedule() {
		Integer[] schedule = new Integer[1440];
		Arrays.fill(schedule, 0);
		return schedule;
	}
	
	
	private int sumSchedule(Integer[] schedule) {
		return Arrays.stream(schedule)
				.reduce(Integer::sum)
				.get();
	}
	
	
	private LinkedList<Stats> computeStats(HashMap<String, Integer> time, HashMap<String, Integer> jointTime, int numDays, String username) {
		final int totalTime = 1440 * numDays;
		double probOrigin = ((double) time.get(username)) / ((double) totalTime);
		LinkedList<Stats> stats = new LinkedList<>();
		for (String key : time.keySet()) {
			if (username.equals(key)) continue; // Skip origin user
			
			double probTarget = ((double) time.get(key)) / ((double) totalTime);
			double probJoint = ((double) jointTime.get(key)) / ((double) totalTime);
			double probOriginGivenTarget = probJoint / probTarget;
			double probTargetGivenOrigin = probJoint / probOrigin;
			
			stats.push(
					new Stats(
							username,
							key,
							time.get(key),
							jointTime.get(key),
							String.format("%.4f", probOrigin),
							String.format("%.4f", probTarget),
							String.format("%.4f", probJoint),
							String.format("%.4f", probOriginGivenTarget),
							String.format("%.4f", probTargetGivenOrigin)
					)
			);
		}
		
		return stats;
	}
	
	
	public LinkedList<Histogram> computeHistograms(int numDays, int minActiveDays) {
		HashMap<String, Histogram> histograms = new HashMap<>();
		HashMap<String, Integer> numActiveDays = new HashMap<>(); // Number of days each user was in call
		List<Day> days = this.days.subList(1, numDays + 1); // Only get data for last 30 finished days (excludes today)
		
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
	
	
	public void addJoinEvent(Long channelSnowflake, Long userSnowflake, int minute) {
		synchronized (this) {
			days.getFirst().addJoin(channelSnowflake, userSnowflake, minute);
		}
	}
	
	
	public void addMoveEvent(Long leaveChannelSnowflake, Long joinChannelSnowflake, Long userSnowflake, int minute) {
		synchronized (this) {
			days.getFirst().addMove(leaveChannelSnowflake, joinChannelSnowflake, userSnowflake, minute);
		}
	}
	
	
	public void addLeaveEvent(Long channelSnowflake, Long userSnowflake, int minute) {
		synchronized (this) {
			days.getFirst().addLeave(channelSnowflake, userSnowflake, minute);
		}
	}
	
	
	public void replaceDays(LinkedList<Day> days) {
		synchronized (this) {
			this.days = days;
		}
	}
	
}
