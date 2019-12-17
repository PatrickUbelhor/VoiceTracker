package team.gif.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;

public class Day {
	
	private final String date;
	private final HashMap<Long, User> users;
	
	public Day() {
		this.date = LocalDate.now().format(DateTimeFormatter.ofPattern("c dd LLLL yyyy"));
		this.users = new HashMap<>();
	}
	
	
	public String getDate() {
		return date;
	}
	
	public HashMap<Long, User> getUsers() {
		return users;
	}
	
	public void addJoin(Long snowflake, int minute) {
		users.putIfAbsent(snowflake, new User(snowflake));
		users.get(snowflake).addJoin(minute);
	}
	
	public void addLeave(Long snowflake, int minute) {
		users.putIfAbsent(snowflake, new User(snowflake));
		users.get(snowflake).addLeave(minute);
	}
	
}
