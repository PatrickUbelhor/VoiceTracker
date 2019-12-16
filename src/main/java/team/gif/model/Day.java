package team.gif.model;

import java.time.ZonedDateTime;
import java.time.format.TextStyle;
import java.util.LinkedList;
import java.util.Locale;

public class Day {
	
	private final int day;          // Day of month (0-30)
	private final int month;        // Month of year (0-11)
	private final int year;         // Year (eg. 2019)
	private final String weekday;   // Day of week (Monday, Tuesday, ...)
	private final LinkedList<Interval> intervals;
	
	public Day(ZonedDateTime time) {
		this(time.getDayOfMonth(),
				time.getMonthValue(),
				time.getYear(),
				time.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.US)
		);
	}
	
	public Day(int day, int month, int year, String weekday) {
		this.day = day;
		this.month = month;
		this.year = year;
		this.weekday = weekday;
		this.intervals = new LinkedList<>();
	}
	
	
	public int getDay() {
		return day;
	}
	
	public int getMonth() {
		return month;
	}
	
	public int getYear() {
		return year;
	}
	
	public String getWeekday() {
		return weekday;
	}
	
	public LinkedList<Interval> getIntervals() {
		return intervals;
	}
	
	public void addEvent(ProcessedEvent event) {
		if (event.getEventType() == EventType.JOIN) {
			Interval interval = new Interval();
			interval.setStart(event.getMinuteOfDay());
			intervals.addLast(interval);
			return;
		}
		
		// Otherwise, it's a LEAVE event
		// If this is the first event of the day, make new interval
		if (intervals.isEmpty()) {
			Interval interval = new Interval();
			interval.setEnd(event.getMinuteOfDay());
			return;
		}
		
		// Otherwise, this marks the end of an existing interval
		intervals.getLast().setEnd(event.getMinuteOfDay());
	}
	
	
	public boolean isSameDay(ZonedDateTime time) {
		return this.day == time.getDayOfMonth()
				&& this.month == time.getMonthValue()
				&& this.year == time.getYear();
	}
	
}
