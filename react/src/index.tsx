import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state/Store';
import App from './components/App';

// Initialize theme
const theme = localStorage.getItem('theme');
document.body.classList.add(theme ? theme : 'dark');

// Prevents white flash when initializing dark theme
setTimeout(() => {
	document.body.classList.add('body-transition');
}, 100);

// Render the component
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.querySelector('#root')
);
