import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const theme = localStorage.getItem('theme');
document.body.classList.add(theme ? theme : 'dark');

// Prevents white flash when initializing dark theme
setTimeout(() => {
	document.body.classList.add('body-transition');
}, 100);

// Render the component
ReactDOM.render(
	<App/>,
	document.querySelector('#root')
);
