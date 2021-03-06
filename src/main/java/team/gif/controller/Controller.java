package team.gif.controller;

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
import team.gif.model.Day;
import team.gif.model.Histogram;
import team.gif.model.Request;
import team.gif.model.Stats;
import team.gif.service.DataLoaderService;
import team.gif.service.DataStorageService;
import team.gif.service.SnowflakeConverter;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class Controller {
	
	private static final Logger logger = LogManager.getLogger(Controller.class);
	private final DataLoaderService loaderService;
	private final DataStorageService storage;
	private final SnowflakeConverter snowflakeConverter = new SnowflakeConverter();
	
	
	@Autowired
	public Controller(DataLoaderService loaderService, DataStorageService storage) {
		this.loaderService = loaderService;
		this.storage = storage;
	}
	
	
	@PostMapping("/join/{userSnowflake}")
	public void join(@PathVariable Long userSnowflake, @RequestBody Request request) {
		logger.info("JOIN " + userSnowflake);
		LocalDateTime now = LocalDateTime.now();
		storage.addJoinEvent(request.getJoiningChannelId(), userSnowflake, 60 * now.getHour() + now.getMinute());
	}
	
	
	@PostMapping("/move/{userSnowflake}")
	public void move(@PathVariable Long userSnowflake, @RequestBody Request request) {
		logger.info("MOVE " + userSnowflake);
		LocalDateTime now = LocalDateTime.now();
		storage.addMoveEvent(
				request.getLeavingChannelId(),
				request.getJoiningChannelId(),
				userSnowflake,
				60 * now.getHour() + now.getMinute()
		);
	}
	
	
	@PostMapping("/leave/{userSnowflake}")
	public void leave(@PathVariable Long userSnowflake, @RequestBody Request request) {
		logger.info("LEAVE " + userSnowflake);
		LocalDateTime now = LocalDateTime.now();
		storage.addLeaveEvent(request.getLeavingChannelId(), userSnowflake, 60 * now.getHour() + now.getMinute());
	}
	
	
	@GetMapping("/users")
	public List<String> getUsers() {
		logger.info("Received getUsers request");
		return snowflakeConverter.getAllUsers();
	}
	
	
	@GetMapping()
	public List<Day> getDays(
			@RequestParam(defaultValue = "0") Integer newestDay,
			@RequestParam(defaultValue = "1000") Integer oldestDay
	) {
		LocalDateTime now = LocalDateTime.now();
		List<Day> days = storage.getDays(60 * now.getHour() + now.getMinute());
		
		oldestDay = Math.min(oldestDay, days.size());
		return days.subList(newestDay, oldestDay);
	}
	
	
	@GetMapping("/histogram")
	public List<Histogram> getHistograms(
			@RequestParam(defaultValue = "30") Integer numDays,
			@RequestParam(defaultValue = "1") Integer minActiveDays
	) {
		// Get precomputed histogram list if applicable
		// TODO: Will have to recompute if minActiveDays is anything other than default for cached histograms
		if (numDays == 7) return storage.get7DayHistogram();
		if (numDays == 30) return storage.get30DayHistogram();
		
		return storage.computeHistograms(numDays, minActiveDays);
	}
	
	
	@GetMapping("/analysis/{username}")
	public List<Stats> getAnalysis(
			@PathVariable String username,
			@RequestParam(defaultValue = "30") Integer numDays
	) {
		return storage.getAnalysis(numDays, username);
	}
	
	
	@GetMapping("/start")
	public ResponseEntity<Void> reloadAllData() {
		logger.info("Loading data...");
		storage.replaceDays(loaderService.load("vclog.csv"));
		logger.info("Finished loading data");
		
		logger.info("Loading names...");
		snowflakeConverter.update("Snowflakes.txt");
		logger.info("Finished loading names");
		
		// Recompute histograms, since names and data were updated
		storage.updateHistogramCache();
		
		return ResponseEntity.status(HttpStatus.FOUND).header("Location", "/").build();
	}
	
}
