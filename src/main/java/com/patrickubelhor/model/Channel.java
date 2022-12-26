package com.patrickubelhor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class Channel {
	
	private final Long id; // Discord snowflake
	private final HashMap<Long, User> users;
	
	public Channel(Long snowflake) {
		this.id = snowflake;
		this.users = new HashMap<>();
	}
	
	
	public String getId() {
		return Long.toString(this.id);
	}
	
	public List<User> getUsers() {
		return new LinkedList<>(users.values());
	}
	
	@JsonIgnore
	public Long getSnowflake() {
		return id;
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
		
		// If this leave event resulted in the only interval being removed, remove the user
		if (users.get(snowflake).getIntervals().size() == 0) {
			users.remove(snowflake);
		}
	}
	
	public void truncateCurrentIntervals(int minute) {
		for (User user : users.values()) {
			user.truncateCurrentInterval(minute);
		}
	}
	
}
