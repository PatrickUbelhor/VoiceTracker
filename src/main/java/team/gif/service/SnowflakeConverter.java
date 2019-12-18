package team.gif.service;

import team.gif.exception.ConfigParseException;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class SnowflakeConverter {
	
	private static ConcurrentHashMap<Long, String> converter = new ConcurrentHashMap<>();
	
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
	
	
	public void update(String filename) {
		converter.clear();
		
		try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
		
			br.lines().forEach(line -> {
				String[] split = line.split("=");
				converter.put(Long.valueOf(split[0]), split[1]);
			});
			
		} catch (IOException e) {
			throw new ConfigParseException("Failed to read from config '" + filename + "'");
		}
	}
	
}
