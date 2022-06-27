import { ChannelResponse, DayResponse, IntervalResponse, StatsResponse, UserResponse } from './Responses';

export interface RefinedStats extends StatsResponse {
	numStdDevGivenTarget: number;
	numStdDevGivenOrigin: number;
}

export interface IntervalModel extends IntervalResponse {}

export interface UserModel extends UserResponse {
	intervals: IntervalModel[];
}

export interface ChannelModel extends ChannelResponse {
	users: UserModel[];
}

export interface DayModel extends DayResponse {
	channels: ChannelModel[];
}
