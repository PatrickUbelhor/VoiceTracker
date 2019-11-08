package team.gif.service;

import team.gif.exception.DataParseException;
import team.gif.model.RawData;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class DataReader {
	
	public List<RawData> getData(String filename) {
		
		List<RawData> result;
		try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
			
			result = br.lines()
					.map(RawData::parse)
					.collect(Collectors.toList());
			
		} catch (IOException e) {
			throw new DataParseException("Failed to read data from MyloBot!");
		}
		
		return result;
	}
	
}
