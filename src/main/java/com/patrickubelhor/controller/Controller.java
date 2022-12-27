package com.patrickubelhor.controller;

import com.patrickubelhor.model.Histogram;
import com.patrickubelhor.service.SnowflakeConverter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.patrickubelhor.model.day.Day;
import com.patrickubelhor.model.Request;
import com.patrickubelhor.model.Stats;
import com.patrickubelhor.service.DayService;
import com.patrickubelhor.service.EventService;
import com.patrickubelhor.service.HistogramService;
import com.patrickubelhor.service.StatService;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class Controller {
	
	private static final Logger logger = LogManager.getLogger(Controller.class);
	private final EventService eventService;
	private final DayService dayService;
	private final HistogramService histogramService;
	private final StatService statService;
	private final SnowflakeConverter snowflakeConverter = new SnowflakeConverter();
	
	
	@Autowired
	public Controller(
		EventService eventService,
		DayService dayService,
		HistogramService histogramService,
		StatService statService
	) {
		this.eventService = eventService;
		this.dayService = dayService;
		this.histogramService = histogramService;
		this.statService = statService;
	}
	
	
	@PostMapping("/join/{userSnowflake}")
	public void join(@PathVariable Long userSnowflake, @RequestBody Request request) {
		logger.info("JOIN " + userSnowflake);
		LocalDateTime now = LocalDateTime.now();
		int currentMinute = 60 * now.getHour() + now.getMinute();
		Long ms = Instant.now().toEpochMilli();
		eventService.saveJoinEvent(userSnowflake, ms, request.getJoiningChannelId());
		dayService.addJoinEvent(request.getJoiningChannelId(), userSnowflake, currentMinute);
	}
	
	
	@PostMapping("/move/{userSnowflake}")
	public void move(@PathVariable Long userSnowflake, @RequestBody Request request) {
		logger.info("MOVE " + userSnowflake);
		LocalDateTime now = LocalDateTime.now();
		int currentMinute = 60 * now.getHour() + now.getMinute();
		Long ms = Instant.now().toEpochMilli();
		eventService.saveMoveEvent(userSnowflake, ms, request.getJoiningChannelId(), request.getLeavingChannelId());
		dayService.addMoveEvent(request.getLeavingChannelId(), request.getJoiningChannelId(), userSnowflake, currentMinute);
	}
	
	
	@PostMapping("/leave/{userSnowflake}")
	public void leave(@PathVariable Long userSnowflake, @RequestBody Request request) {
		logger.info("LEAVE " + userSnowflake);
		LocalDateTime now = LocalDateTime.now();
		int currentMinute = 60 * now.getHour() + now.getMinute();
		Long ms = Instant.now().toEpochMilli();
		eventService.saveLeaveEvent(userSnowflake, ms, request.getLeavingChannelId());
		dayService.addLeaveEvent(request.getLeavingChannelId(), userSnowflake, currentMinute);
	}
	
	
	@GetMapping("/users")
	public List<String> getUsers() {
		logger.info("Received getUsers request");
		return snowflakeConverter.getAllUsers();
	}
	
	
	@GetMapping("/days")
	public List<Day> getDays(
		@RequestParam(defaultValue = "0") Integer newestDay,
		@RequestParam(defaultValue = "1000") Integer oldestDay
	) {
		LocalDateTime now = LocalDateTime.now();
		int currentMinute = 60 * now.getHour() + now.getMinute();
		List<Day> days = dayService.getDays(currentMinute);
		
		newestDay = Math.max(newestDay, 0);
		oldestDay = Math.min(oldestDay, days.size());
		return days.subList(newestDay, oldestDay);
	}
	
	
	@GetMapping("/histogram")
	public List<Histogram> getHistograms(
		@RequestParam(defaultValue = "28") Integer numDays,
		@RequestParam(defaultValue = "1") Integer minActiveDays
	) {
		return histogramService.computeHistograms(numDays, minActiveDays);
	}
	
	
	@GetMapping("/analysis/{username}")
	public List<Stats> getRelations(
		@PathVariable String username,
		@RequestParam(defaultValue = "30") Integer numDays
	) {
		return statService.getAnalysis(numDays, username);
	}
	
	
	@GetMapping("/start")
	public ResponseEntity<Void> reloadAllData() {
		logger.info("Loading data from file into database...");
		eventService.readEventsFromFile("vclog.csv");
		dayService.replaceDays(eventService.getAllDays());
		logger.info("Finished loading data");
		
		logger.info("Loading names...");
		snowflakeConverter.update("Snowflakes.txt");
		logger.info("Finished loading names");
		
		return ResponseEntity.status(HttpStatus.FOUND).header("Location", "/").build();
	}
	
}
