package team.gif.model;

import java.util.Arrays;

public class Histogram {
	
	public final static int LENGTH_OF_HISTO_BAR = 5;
	private final String name;
	private final int[] data;
	
	public Histogram(String name) {
		this.name = name;
		this.data = new int[Interval.MAX_TIME / LENGTH_OF_HISTO_BAR];
		Arrays.fill(this.data, 0);
	}
	
	public void addInterval(Interval interval) {
		
		// Could start i = start % LENGTH_BAR to reduce resolution (and therefore processing time)
		for (int i = interval.getStart(); i < interval.getEnd(); i++) {
			data[i]++;
		}
	}
	
	public String getName() {
		return name;
	}
	
	public int[] getData() {
		return data;
	}
	
}
