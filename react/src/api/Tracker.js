import axios from 'axios';

class Tracker {

	tracker = axios.create({
		// baseURL: '/api'
		// baseURL: 'https://voicetracker.patrickubelhor.com/api'
		baseURL: process.env.REACT_APP_SERVER_URL
	});


	getUsers = () => {
		console.log(process.env.REACT_APP_SERVER_URL);
		return this.tracker.get('/users');
	}


	getDays = (newestDay, oldestDay) => {
		return this.tracker.get(`?newestDay=${newestDay}&oldestDay=${oldestDay}`);
	}


	getHistograms = (numDays, minActiveDays) => {
		return this.tracker.get(`/histogram?numDays=${numDays}&minActiveDays=${minActiveDays}`);
	}


	getAnalytics = (numDays, username) => {
		return this.tracker.get(`analytics?numDays=${numDays}&username=${username}`)
	}

}

export default new Tracker();
