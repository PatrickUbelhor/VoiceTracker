package team.gif.exception;

public class DataLoadException extends RuntimeException {
	
	public DataLoadException(String filename) {
		super(String.format("Failed to load data from '%s'", filename));
	}
	
}
