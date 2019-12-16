package team.gif.service;

import team.gif.exception.DataParseException;
import team.gif.model.RawEvent;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class DataReader {
	
	public List<RawEvent> getData(String filename) {
		
		List<RawEvent> result;
		try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
			
			result = br.lines()
					.map(RawEvent::parse)
					.collect(Collectors.toList());
			
			result.sort(Comparator.comparing(RawEvent::getMillis));
			
		} catch (IOException e) {
			throw new DataParseException("Failed to read data from MyloBot!");
		}
		
		return result;
	}
	
}
