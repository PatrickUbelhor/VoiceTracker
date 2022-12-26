package com.patrickubelhor.model;

public class Stats {
	
	private final String origin;
	private final String target;
	private final Integer targetTime;
	private final Integer jointTime;
	private final String probOrigin;
	private final String probTarget;
	private final String probJoint;
	private final String probOriginGivenTarget;
	private final String probTargetGivenOrigin;
	
	public Stats(
			String origin,
			String target,
			Integer targetTime,
			Integer jointTime,
			String probOrigin,
			String probTarget,
			String probJoint,
			String probOriginGivenTarget,
			String probTargetGivenOrigin
	) {
		this.origin = origin;
		this.target = target;
		this.targetTime = targetTime;
		this.jointTime = jointTime;
		this.probOrigin = probOrigin;
		this.probTarget = probTarget;
		this.probJoint = probJoint;
		this.probOriginGivenTarget = probOriginGivenTarget;
		this.probTargetGivenOrigin = probTargetGivenOrigin;
	}
	
	
	public String getOrigin() {
		return origin;
	}
	
	
	public String getTarget() {
		return target;
	}
	
	
	public Integer getTargetTime() {
		return targetTime;
	}
	
	
	public Integer getJointTime() {
		return jointTime;
	}
	
	
	public String getProbOrigin() {
		return probOrigin;
	}
	
	
	public String getProbTarget() {
		return probTarget;
	}
	
	
	public String getProbJoint() {
		return probJoint;
	}
	
	
	public String getProbOriginGivenTarget() {
		return probOriginGivenTarget;
	}
	
	
	public String getProbTargetGivenOrigin() {
		return probTargetGivenOrigin;
	}
	
}
