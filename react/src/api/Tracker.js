import axios from 'axios';

export default axios.create({
	baseURL: '/tracker/api'
	// baseURL: 'https://patrickubelhor.com:81/tracker/api'
});
