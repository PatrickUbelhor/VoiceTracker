package team.gif.model;

import lombok.Data;

@Data
public class Interval {
	
	public static final long MAX_TIME = 1440; // Number of minutes in a day
	
	private long start;
	private long end;
	
	public Interval() {
		this.start = 0;
		this.end = MAX_TIME;
	}
	
}
