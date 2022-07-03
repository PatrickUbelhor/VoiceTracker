
export interface DayResponse {
	date: string;
	channels: ChannelResponse[]
}

export interface ChannelResponse {
	id: string;
	users: UserResponse[];
}

export interface HistogramResponse {
	name: string;
	data: number[];
}

export interface StatsResponse {
	origin: string;
	target: string;
	targetTime: number;
	jointTime: number;
	probOrigin: string;
	probTarget: string;
	probJoint: string;
	probOriginGivenTarget: string;
	probTargetGivenOrigin: string;
}

export interface UserResponse {
	id: string;
	color: string;
	intervals: IntervalResponse[];
}

export interface IntervalResponse {
	start: number;
	end: number;
	finished: boolean;
}
