import axios from 'axios';

export default axios.create({
	baseURL: '/api'
	// baseURL: 'https://voicetracker.patrickubelhor.com:81/api'
});
