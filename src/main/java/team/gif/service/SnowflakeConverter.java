package team.gif.service;

import team.gif.exception.ConfigParseException;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

public class SnowflakeConverter {
	
	public SnowflakeConverter() {}
	
	/**
	 * Converts a Discord snowflake into a user's name (as used in real life)
	 *
	 * @param snowflake The user's Discord snowflake
	 * @return The name of the user
	 */
	public String convert(Long snowflake) {
		// TODO: get config on app initialization (this is just hack-job because I'm just trying to get this done)
		return parseConfig("Snowflakes.txt").getOrDefault(snowflake, "Other");
	}
	
	
	public HashMap<Long, String> parseConfig(String filename) {
		HashMap<Long, String> result = new HashMap<>();
		
		try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
		
			br.lines().forEach(line -> {
				String[] split = line.split("=");
				result.put(Long.valueOf(split[0]), split[1]);
			});
			
		} catch (IOException e) {
			throw new ConfigParseException("Failed to read from config '" + filename + "'");
		}
		
		return result;
	}
	
}
