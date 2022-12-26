package com.patrickubelhor.model;

public class Request {
	
	private Long leavingChannelId;
	private Long joiningChannelId;
	
	public Request() {}
	
	public void setLeavingChannelId(Long leavingChannelId) {
		this.leavingChannelId = leavingChannelId;
	}
	
	public void setJoiningChannelId(Long joiningChannelId) {
		this.joiningChannelId = joiningChannelId;
	}
	
	public Long getLeavingChannelId() {
		return this.leavingChannelId;
	}
	
	public long getJoiningChannelId() {
		return this.joiningChannelId;
	}
	
}
