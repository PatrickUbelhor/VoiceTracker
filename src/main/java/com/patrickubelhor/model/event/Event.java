package com.patrickubelhor.model.event;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Table(name = "events")
public class Event {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "events_seq")
	@SequenceGenerator(name = "events_seq", initialValue = 1, allocationSize = 1)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private Long id;
	
	@Column(nullable = false)
	private EventType eventType;
	
	@Column(nullable = false)
	private Long userSnowflake;
	
	@Column(nullable = false)
	private Long instant;
	
	@Column(nullable = false)
	private Long primaryChannel = 0L;
	
	@Column(nullable = true)
	private Long secondaryChannel;
	
	
	public Event() {
		this(null, null, null);
	}
	
	public Event(EventType eventType, Long userSnowflake, Long instant) {
		this(eventType, userSnowflake, instant, null);
	}
	
	public Event(
		EventType eventType,
		Long userSnowflake,
		Long instant,
		Long primaryChannel
	) {
		this(eventType, userSnowflake, instant, primaryChannel, null);
	}
	
	public Event(
		EventType eventType,
		Long userSnowflake,
		Long instant,
		Long primaryChannel,
		Long secondaryChannel
	) {
		setEventType(eventType);
		setUserSnowflake(userSnowflake);
		setInstant(instant);
		setPrimaryChannel(primaryChannel);
		setSecondaryChannel(secondaryChannel);
	}
	
	public Long getId() {
		return this.id;
	}
	
	public EventType getEventType() {
		return this.eventType;
	}
	
	public Long getUserSnowflake() {
		return this.userSnowflake;
	}
	
	public Long getInstant() {
		return this.instant;
	}
	
	@JsonIgnore
	public ZonedDateTime getIsoTime() {
		return Instant.ofEpochMilli(instant).atZone(ZoneId.of("GMT-6"));
	}
	
	public Long getPrimaryChannel() {
		return this.primaryChannel;
	}
	
	public Long getSecondaryChannel() {
		return this.secondaryChannel;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public void setEventType(EventType eventType) {
		this.eventType = eventType;
	}
	
	public void setUserSnowflake(Long userSnowflake) {
		this.userSnowflake = userSnowflake;
	}
	
	public void setInstant(Long instant) {
		this.instant = instant;
	}
	
	public void setPrimaryChannel(Long primaryChannel) {
		this.primaryChannel = primaryChannel;
	}
	
	public void setSecondaryChannel(Long secondaryChannel) {
		this.secondaryChannel = secondaryChannel;
	}
	
}
