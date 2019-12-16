package team.gif.model;

import java.util.LinkedList;

public class User {
	
	private final String name;
	private final LinkedList<Day> days;
	
	public User(String name) {
		this.name = name;
		this.days = new LinkedList<>();
	}
	
	
	public String getName() {
		return name;
	}
	
	public LinkedList<Day> getDays() {
		return days;
	}
	
	public Day getLastDay() {
		return days.getLast();
	}
	
	public void addDay(Day day) {
		days.addLast(day);
	}
	
	public void addEvent(ProcessedEvent event) {
		
		// If this is a new day, put a new day in the list
		if (days.isEmpty() || !days.getLast().isSameDay(event.getTime())) {
			days.addLast(new Day(event.getTime()));
		}
		
		days.getLast().addEvent(event);
	}
	
}
