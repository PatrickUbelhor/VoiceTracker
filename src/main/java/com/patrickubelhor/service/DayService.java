package com.patrickubelhor.service;

import com.patrickubelhor.model.Channel;
import com.patrickubelhor.model.Day;
import com.patrickubelhor.model.Interval;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.patrickubelhor.model.User;

import java.util.LinkedList;
import java.util.List;

@Service
public class DayService {
	
	private static final Logger logger = LogManager.getLogger(DayService.class);
	
	private LinkedList<Day> days;
	
	public DayService() {
		this.days = new LinkedList<>();
		days.add(new Day());
	}
	
	
	public List<Day> getDays(int currentMinute) {
		synchronized (this) {
			days.getFirst().truncateCurrentIntervals(currentMinute);
		}
		
		return days;
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
		
		// TODO: update histogram cache
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
