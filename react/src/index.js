import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const theme = localStorage.getItem('theme');
document.body.classList.add(theme ? theme : 'dark');

// Render the component
ReactDOM.render(
	<App/>,
	document.querySelector('#root')
);
