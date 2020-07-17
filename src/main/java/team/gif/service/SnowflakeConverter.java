package team.gif.service;

import team.gif.exception.ConfigParseException;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class SnowflakeConverter {
	
	private static final ConcurrentHashMap<Long, String> converter = new ConcurrentHashMap<>();
	private static final ConcurrentHashMap<Long, String> colorPicker = new ConcurrentHashMap<>();
	
	public SnowflakeConverter() {}
	
	/**
	 * Converts a Discord snowflake into a user's name (as used in real life)
	 *
	 * @param snowflake The user's Discord snowflake
	 * @return The name of the user
	 */
	public String convert(Long snowflake) {
		return converter.getOrDefault(snowflake, "Other");
	}
	
	public String getColor(Long snowflake) {
		return colorPicker.getOrDefault(snowflake, "#757575");
	}
	
	
	public void update(String filename) {
		converter.clear();
		
		try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
		
			br.lines().forEach(line -> {
				String[] split = line.split("=");
				converter.put(Long.valueOf(split[0]), split[1]);
				colorPicker.put(Long.valueOf(split[0]), split[2]);
			});
			
		} catch (IOException e) {
			throw new ConfigParseException("Failed to read from config '" + filename + "'");
		}
	}
	
	
	public List<String> getAllUsers() {
		return converter.values().stream().sorted().collect(Collectors.toList());
	}
	
}
