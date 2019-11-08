package team.gif.model;

import lombok.Data;

import java.util.List;

@Data
public class User {
	
	private String name;
	private List<Interval> joins;
	
}
