package team.gif.model;

public class Stats {
	
	private String origin;
	private String target;
	private String data;
	
	public Stats(String origin, String target, String data) {
		this.origin = origin;
		this.target = target;
		this.data = data;
	}
	
	
	public String getOrigin() {
		return origin;
	}
	
	
	public String getTarget() {
		return target;
	}
	
	
	public String getData() {
		return data;
	}
	
}
