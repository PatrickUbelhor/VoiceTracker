package team.gif.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import team.gif.model.Channel;
import team.gif.model.Day;
import team.gif.model.Interval;
import team.gif.model.Stats;
import team.gif.model.User;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@Service
public class StatService {
	
	private static final Logger logger = LogManager.getLogger(StatService.class);
	private final DayService dayService;
	
	public StatService(DayService dayService) {
		this.dayService = dayService;
	}
	
	
	public List<Stats> getAnalysis(int numDays, String username) {
		HashMap<String, Integer> time = new HashMap<>(); // Time each individual user is in call
		HashMap<String, Integer> jointTime = new HashMap<>(); // Time users have spent with origin user
		
		List<Day> days = dayService.getDays(1440);
		numDays = Math.min(numDays, days.size());
		days = days.subList(1, numDays + 1);
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
	
}
