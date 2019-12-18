package team.gif.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.gif.model.Day;
import team.gif.service.DataStorageService;
import team.gif.service.SnowflakeConverter;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/tracker/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class Controller {
	
	private static final Logger logger = LogManager.getLogger(Controller.class);
	private final DataStorageService storage = new DataStorageService();
	private final SnowflakeConverter snowflakeConverter = new SnowflakeConverter();
	
	@PostMapping("/join/{snowflake}")
	public void join(@PathVariable Long snowflake) {
		logger.info("JOIN " + snowflake);
		LocalDateTime now = LocalDateTime.now();
		storage.addJoinEvent(snowflake, 60 * now.getHour() + now.getMinute());
	}
	
	@PostMapping("/leave/{snowflake}")
	public void leave(@PathVariable Long snowflake) {
		logger.info("LEAVE " + snowflake);
		LocalDateTime now = LocalDateTime.now();
		storage.addLeaveEvent(snowflake, 60 * now.getHour() + now.getMinute());
	}
	
	@GetMapping()
	public List<Day> getDays() {
		return storage.getDays();
	}
	
	@GetMapping("/refresh")
	public void updateSnowflakes() {
		snowflakeConverter.update("Snowflakes.txt");
	}
	
}
