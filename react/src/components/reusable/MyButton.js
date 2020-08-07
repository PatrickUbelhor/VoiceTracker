import '../../css/reusable/Button.css'
import React from 'react';

export default function(props) {
	return (
		<button className="my-button">
			{props.children}
		</button>
	);
}
