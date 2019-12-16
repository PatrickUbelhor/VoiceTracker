package team.gif.model;

import team.gif.service.SnowflakeConverter;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

public class ProcessedEvent {
	
	private static final long MILLIS_IN_MINUTE = 60000;
	private final long unixTimestampMinutes;
	private final ZonedDateTime time;   // Time the event occurred (UTC)
	private final String name;          // Real name of the user
	private final EventType eventType;  // JOIN or LEAVE event
	
	public static ProcessedEvent process(RawEvent rawEvent) {
		return new ProcessedEvent(
				rawEvent.getMillis(),
				new SnowflakeConverter().convert(rawEvent.getSnowflake()),
				rawEvent.getAction().equals("J") ? EventType.JOIN : EventType.LEAVE
		);
	}
	
	public ProcessedEvent(Long millis, String name, EventType eventType) {
		this.unixTimestampMinutes = millis / MILLIS_IN_MINUTE;
		this.time = Instant.ofEpochMilli(millis).atZone(ZoneOffset.UTC);
		this.name = name;
		this.eventType = eventType;
	}
	
	
	/**
	 * @return Time at which the event occurred (in UTC).
	 */
	public ZonedDateTime getTime() {
		return time;
	}
	
	public int getMinuteOfDay() {
		return time.getMinute() + 60 * time.getHour();
	}
	
	/**
	 * @return The real name of the user.
	 */
	public String getName() {
		return name;
	}
	
	/**
	 * @return The type of the event that occurred (JOIN or LEAVE).
	 */
	public EventType getEventType() {
		return eventType;
	}
	
	public long getMinutesSince(ProcessedEvent event) {
		return this.unixTimestampMinutes - event.unixTimestampMinutes;
	}
	
}
