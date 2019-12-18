package team.gif.service;

import org.springframework.scheduling.annotation.Scheduled;
import team.gif.model.Day;

import java.util.LinkedList;
import java.util.List;

public class DataStorageService {
	
	private final LinkedList<Day> days;
	
	public DataStorageService() {
		this.days = new LinkedList<>();
		days.add(new Day());
	}
	
	
	public List<Day> getDays() {
		return days;
	}

	@Scheduled(cron = "0 0 0 ? * * *")
	public void addNewDay() {
		// Any intervals that haven't explicitly been given an end time will default to 1440 (end of day)
		// We don't need to start new intervals for each user that's logged in
		// When they leave, the event will create a new interval with default start of 0
		synchronized (days) {
			days.addLast(new Day());
		}
	}
	
	public void addJoinEvent(Long snowflake, int minute) {
		synchronized (days) {
			days.getLast().addJoin(snowflake, minute);
		}
	}
	
	public void addLeaveEvent(Long snowflake, int minute) {
		synchronized (days) {
			days.getLast().addLeave(snowflake, minute);
		}
	}
	
}
