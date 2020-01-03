package team.gif.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class Day {
	
	private final String date;
	private final HashMap<Long, User> users;
	
	public Day() {
		this.date = LocalDate.now().format(DateTimeFormatter.ofPattern("eeee LLLL dd, yyyy"));
		this.users = new HashMap<>();
	}
	
	public Day(ZonedDateTime time) {
		this.date = time.format(DateTimeFormatter.ofPattern("eeee LLLL dd, yyyy"));
		this.users = new HashMap<>();
	}
	
	
	public String getDate() {
		return date;
	}
	
	public List<User> getUsers() {
		return new LinkedList<>(users.values());
	}
	
	@JsonIgnore
	public List<User> getOnlineUsers() {
		return users.values()
				.stream()
				.filter(User::isOnline)
				.collect(Collectors.toList());
	}
	
	public void addJoin(Long snowflake, int minute) {
		users.putIfAbsent(snowflake, new User(snowflake));
		users.get(snowflake).addJoin(minute);
	}
	
	public void addLeave(Long snowflake, int minute) {
		users.putIfAbsent(snowflake, new User(snowflake));
		users.get(snowflake).addLeave(minute);
	}
	
	public void truncateCurrentIntervals(int minute) {
		for (User user : users.values()) {
			user.truncateCurrentInterval(minute);
		}
	}
	
}
