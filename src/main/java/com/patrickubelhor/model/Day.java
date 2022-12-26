package com.patrickubelhor.model;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

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
		
		// If this resulted in all users being removed (for intervals that were too short), remove the channel
		if (channels.get(channelSnowflake).getUsers().size() == 0) {
			channels.remove(channelSnowflake);
		}
	}
	
	public void truncateCurrentIntervals(int minute) {
		for (Channel channel : channels.values()) {
			channel.truncateCurrentIntervals(minute);
		}
	}
	
}
