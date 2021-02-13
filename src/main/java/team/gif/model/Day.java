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
	private final HashMap<Long, Channel> channels;
	
	public Day() {
		this.date = LocalDate.now().format(DateTimeFormatter.ofPattern("eeee LLLL dd, yyyy"));
		this.channels = new HashMap<>();
	}
	
	public Day(ZonedDateTime time) {
		this.date = time.format(DateTimeFormatter.ofPattern("eeee LLLL dd, yyyy"));
		this.channels = new HashMap<>();
	}
	
	
	public String getDate() {
		return date;
	}
	
	public List<Channel> getChannels() {
		return new LinkedList<>(channels.values());
	}
	
	@JsonIgnore
	public List<User> getOnlineUsers() {
		return users.values()
				.stream()
				.filter(User::isOnline)
				.collect(Collectors.toList());
	}
	
	public void addJoin(Long channelSnowflake, Long userSnowflake, int minute) {
		channels.putIfAbsent(channelSnowflake, new Channel(channelSnowflake));
		channels.get(channelSnowflake).addJoin(userSnowflake, minute);
	}
	
	public void addMove(Long exitChannelSnowflake, Long enterChannelSnowflake, Long userSnowflake, int minute) {
		this.addLeave(exitChannelSnowflake, userSnowflake, minute);
		this.addJoin(enterChannelSnowflake, userSnowflake, minute);
	}
	
	public void addLeave(Long channelSnowflake, Long userSnowflake, int minute) {
		channels.putIfAbsent(channelSnowflake, new Channel(channelSnowflake));
		channels.get(channelSnowflake).addLeave(userSnowflake, minute);
	}
	
	public void truncateCurrentIntervals(int minute) {
		for (Channel channel : channels.values()) {
			channel.truncateCurrentIntervals(minute);
		}
	}
	
}
