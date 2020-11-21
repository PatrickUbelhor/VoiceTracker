import axios, { AxiosResponse } from 'axios';
import { DayResponse, HistogramResponse, StatsResponse } from '../model/Responses';

type TrackerResponse<T> = Promise<AxiosResponse<T>>;

class Tracker {

	tracker = axios.create({
		// baseURL: '/api'
		// baseURL: 'https://voicetracker.patrickubelhor.com/api'
		baseURL: process.env.REACT_APP_SERVER_URL
	});


	getUsers = (): TrackerResponse<string[]> => {
		console.log(process.env.REACT_APP_SERVER_URL);
		return this.tracker.get('/users');
	}


	getDays = (newestDay: number, oldestDay: number): TrackerResponse<DayResponse[]> => {
		return this.tracker.get(`?newestDay=${newestDay}&oldestDay=${oldestDay}`);
	}


	getHistograms = (numDays: number, minActiveDays: number): TrackerResponse<HistogramResponse[]> => {
		return this.tracker.get(`/histogram?numDays=${numDays}&minActiveDays=${minActiveDays}`);
	}


	getAnalytics = (numDays: number, username: string): TrackerResponse<StatsResponse[]> => {
		return this.tracker.get(`analytics?numDays=${numDays}&username=${username}`)
	}

}

export default new Tracker();
