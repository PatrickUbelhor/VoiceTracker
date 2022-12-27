package com.patrickubelhor.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EventType {
	JOIN("J"),
	LEAVE("L"),
	MOVE("M");
	
	private final String value;
	
	public static EventType from(String value) {
		for (EventType e : EventType.values()) {
			if (e.value.equals(value)) {
				return e;
			}
		}
		
		throw new IllegalArgumentException("No EventType with value " + value + " found");
	}
	
	EventType(String type) {
		this.value = type;
	}
	
	@JsonValue
	public String getValue() {
		return value;
	}
	
}
