package com.patrickubelhor.exception;

public class DataLoadException extends RuntimeException {
	
	public DataLoadException(String filename) {
		super(String.format("Failed to load data from '%s'", filename));
	}
	
}
