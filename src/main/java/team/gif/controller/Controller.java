package team.gif.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.gif.model.Day;
import team.gif.service.DataStorageService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/tracker/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class Controller {
	
	private DataStorageService storage = new DataStorageService();
	
	@PostMapping("/join")
	public void join(Long snowflake) {
		LocalDateTime now = LocalDateTime.now();
		storage.addJoinEvent(snowflake, 60 * now.getHour() + now.getMinute());
	}
	
	@PostMapping("/leave")
	public void leave(Long snowflake) {
		LocalDateTime now = LocalDateTime.now();
		storage.addLeaveEvent(snowflake, 60 * now.getHour() + now.getMinute());
	}
	
	@GetMapping()
	public List<Day> getDays() {
		return storage.getDays();
	}
	
}
