package com.patrickubelhor.model;

public class Interval {
	
	public static final int MAX_TIME = 1440; // Number of minutes in a day
	
	private int start; // Minute of day
	private int end;   // Minute of day
	private boolean isFinished; // Whether this is an actual end time
	// If the data is requested while people are logged in, we change end time to current time
	
	public Interval() {
		this.start = 0;
		this.end = MAX_TIME;
		this.isFinished = false;
	}
	
	
	public int getStart() {
		return start;
	}
	
	public int getEnd() {
		return end;
	}
	
	public boolean getFinished() {
		return isFinished;
	}
	
	public void setStart(int start) {
		this.start = start;
	}
	
	public void setEnd(int end) {
		this.end = end;
	}
	
	public void setFinished(boolean isFinished) {
		this.isFinished = isFinished;
	}
	
}
