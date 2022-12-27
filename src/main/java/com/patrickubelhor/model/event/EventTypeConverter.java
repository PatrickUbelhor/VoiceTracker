package com.patrickubelhor.model.event;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class EventTypeConverter implements AttributeConverter<EventType, String> {

	@Override
	public String convertToDatabaseColumn(EventType eventType) {
		return eventType.getValue();
	}
	
	
	@Override
	public EventType convertToEntityAttribute(String value) {
		return EventType.from(value);
	}

}
