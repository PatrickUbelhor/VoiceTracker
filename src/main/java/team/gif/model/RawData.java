package team.gif.model;

import java.time.Instant;

public class RawData {
	
	private String action;
	private Long snowflake;
	private Instant instant;
	
	public static RawData parse(String line) {
		String[] data = line.split(",");
		return new RawData(data[0], Long.parseLong(data[1]), Long.parseLong(data[2]));
	}
	
	public RawData(String action, Long snowflake, Long instant) {
		this.action = action;
		this.snowflake = snowflake;
		this.instant = Instant.ofEpochMilli(instant);
	}
	
	
	public String getAction() {
		return action;
	}
	
	public Long getSnowflake() {
		return snowflake;
	}
	
	public Instant getInstant() {
		return instant;
	}
	
}
