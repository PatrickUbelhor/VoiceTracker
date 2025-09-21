import './StatsRequestForm.css';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../state/Effects';
import { useAppDispatch, useAppSelector } from '../../../state/Hooks';


interface IProps {
	handleSubmit: (numDays: number, username: string) => (event) => void;
}

export default function StatsRequestForm(props: IProps) {

	const [username, setUsername] = useState<string>('');
	const [numDays, setNumDays] = useState<number>(30);

	const dispatch = useAppDispatch();
	const users = useAppSelector<string[]>(state => state.users.filter(username => !state.filters.has(username)));

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const handleSubmit = props.handleSubmit(numDays, username);

	const userListItems = users.map(name => (
		<MenuItem key={ name } value={ name }>{ name }</MenuItem>
	));

	return (
		<Card className="analytics-card" elevation={ 4 }>
			<CardContent>
				<div className="analytics-form-div">
					<form className="analytics-form" onSubmit={ handleSubmit }>
						<FormControl variant="outlined" margin="normal">
							<InputLabel id="analytics-username-label">Username</InputLabel>
							<Select
								name="username"
								value={ username }
								labelId="analytics-username-label"
								label="Username"
								onChange={ (event) => setUsername(event.target.value) }
							>
								{ userListItems }
							</Select>
						</FormControl>
						<TextField
							name="numDays"
							value={ numDays }
							placeholder="Number of Days"
							label="Number of Days"
							variant="outlined"
							type="number"
							margin="normal"
							onChange={ (event) => setNumDays(Number(event.target.value)) }
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
	);
}
