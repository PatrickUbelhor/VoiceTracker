package team.gif.model;

public class RawEvent {
	
	private String action;
	private Long snowflake;
	private Long millis;
	
	public static RawEvent parse(String line) {
		String[] data = line.split(",");
		return new RawEvent(data[0], Long.parseLong(data[1]), Long.parseLong(data[2]));
	}
	
	public RawEvent(String action, Long snowflake, Long millis) {
		this.action = action;
		this.snowflake = snowflake;
		this.millis = millis;
	}
	
	
	public String getAction() {
		return action;
	}
	
	public Long getSnowflake() {
		return snowflake;
	}
	
	public long getMillis() {
		return millis;
	}
	
}
