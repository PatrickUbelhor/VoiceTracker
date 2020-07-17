import axios from 'axios';

class Tracker {

	tracker = axios.create({
		// baseURL: '/api'
		baseURL: 'https://voicetracker.patrickubelhor.com/api'
	});


	getUsers = () => {
		return this.tracker.get('/users');
	}


	getDays = (newestDay, oldestDay) => {
		return this.tracker.get(`?newestDay=${newestDay}&oldestDay=${oldestDay}`);
	}


	getHistograms = (numDays, minActiveDays) => {
		return this.tracker.get(`/histogram?numDays=${numDays}&minActiveDays=${minActiveDays}`);
	}


	getAnalytics = (numDays, username1, username2) => {
		return this.tracker.get(`analytics?numDays=${numDays}&username1=${username1}&username2=${username2}`)
	}

}

export default new Tracker();
