package team.gif.model;

import team.gif.service.SnowflakeConverter;

import java.util.LinkedList;

public class User {
	
	private final int COALESCE_TIME = 1;
	
	private final Long id; // Stored as Discord snowflake, returned as colloquial name
	private final LinkedList<Interval> intervals;
	private final SnowflakeConverter converter = new SnowflakeConverter();
	
	public User(Long snowflake) {
		this.id = snowflake;
		this.intervals = new LinkedList<>();
	}
	
	
	public String getId() {
		return converter.convert(id);
	}
	
	public LinkedList<Interval> getIntervals() {
		return intervals;
	}
	
	public void addJoin(int minute) {
		// Coalesce with last interval if they joined right after they left
		if (!intervals.isEmpty() && minute - intervals.getLast().getEnd() <= COALESCE_TIME) {
			intervals.getLast().setEnd(Interval.MAX_TIME);
			return;
		}
		
		// Create new interval
		Interval interval = new Interval();
		interval.setStart(minute);
		intervals.addLast(interval);
	}
	
	public void addLeave(int minute) {
		// Remove interval if user was only online for very short period
		if (!intervals.isEmpty() && minute - intervals.getLast().getStart() <= COALESCE_TIME) {
			intervals.removeLast();
			return;
		}
		
		// If interval exists, set end time accordingly
		if (!intervals.isEmpty() && intervals.getLast().getEnd() == Interval.MAX_TIME) {
			intervals.getLast().setEnd(minute);
			return;
		}
		
		// Create a new interval [0, minute]
		Interval interval = new Interval();
		interval.setEnd(minute);
		intervals.addLast(interval);
	}
	
}
