package team.gif.model;

public enum EventType {
	JOIN("J"),
	LEAVE("L"),
	MOVE("M");
	
	public static EventType from(String value) {
		for (EventType e : EventType.values()) {
			if (e.value.equals(value)) {
				return e;
			}
		}
		
		throw new IllegalArgumentException("No EventType with value " + value + " found");
	}
	
	public final String value;
	
	EventType(String type) {
		this.value = type;
	}
	
}
