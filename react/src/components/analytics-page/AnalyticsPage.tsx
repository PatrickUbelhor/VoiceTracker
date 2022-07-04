import './AnalyticsPage.css';
import React, { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../state/Hooks';
import StatsComponentSelector from './stats-component-selector/StatsComponentSelector';
import {
	getAnalytics,
	getUsers
} from '../../state/Effects';
import { calculateEntourage } from '../../service/AnalyticsService';


export default function AnalyticsPage() {

	const [username, setUsername] = useState<string>('');
	const [numDays, setNumDays] = useState<number>(30);
	const [loading, setLoading] = useState<boolean>(false);

	const users = useAppSelector(state => state.users.filter(username => !state.filters.has(username)));
	const analytics = useAppSelector(state => calculateEntourage(state.analytics.filter(data => !state.filters.has(data.target))));
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		await dispatch(getAnalytics(numDays, username));
		setLoading(false);
	};

	const userListItems = users.map(name => (
		<MenuItem key={name} value={name}>{name}</MenuItem>
	));

	return (
		<Fragment>
			<Card className="analytics-card" elevation={4}>
				<CardContent>
					<div className="analytics-form-div">
						<form className="analytics-form" onSubmit={handleSubmit}>
							<FormControl variant="outlined" margin="normal">
								<InputLabel id="analytics-username-label">Username</InputLabel>
								<Select
									name="username"
									value={username}
									labelId="analytics-username-label"
									label="Username"
									onChange={(event) => setUsername(event.target.value)}
								>
									{ userListItems }
								</Select>
							</FormControl>
							<TextField
								name="numDays"
								value={numDays}
								placeholder="Number of Days"
								label="Number of Days"
								variant="outlined"
								type="number"
								margin="normal"
								onChange={(event) => setNumDays(Number(event.target.value))}
							/>
							<Button
								className="analytics-submit-button"
								color="primary"
								type="submit"
								variant="contained"
							>
								Submit
							</Button>
						</form>
					</div>
				</CardContent>
			</Card>
			{ loading ? <div>Loading</div> : null }
			<StatsComponentSelector stats={analytics}/>
		</Fragment>
	);
}
