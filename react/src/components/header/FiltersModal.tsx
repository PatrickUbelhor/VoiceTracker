import './FiltersModal.css';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AppState } from '../../model/States';
import {
	getUsers,
	setFilters
} from '../../state/Effects';

interface IProps {
	open: boolean;
	onClose: () => void;
}

function FiltersModal({ open, onClose }: IProps) {

	// Inputs
	const users: string[] = useSelector<AppState, string[]>(state => state.users);
	const filters: Set<string> = useSelector<AppState, Set<string>>(state => state.filters);

	// Outputs
	const dispatch = useDispatch();
	const updateFilters = useCallback(
		(unchecked: Set<string>) => dispatch(setFilters([...unchecked]) as any),
		[dispatch]
	);

	const [unchecked, setUnchecked] = React.useState<Set<string>>(new Set());
	React.useEffect(() => {
		if (open) {
			dispatch(getUsers() as any);
			setUnchecked(new Set(filters));
		}
	}, [ dispatch, open, filters ]);

	const onCancel = () => {
		setUnchecked(new Set(filters));
		onClose();
	};

	const onSubmit = () => {
		updateFilters(unchecked);
		onClose();
	};

	const handleCheckboxChange = (username: string) => (event) => {
		event.target.checked
			? unchecked.delete(username)
			: unchecked.add(username);
		setUnchecked(new Set(unchecked));
	};

	const checkBoxes = users.map((username: string) => (
		<FormControlLabel
			key={username}
			name={username}
			control={
				<Checkbox
					checked={!unchecked.has(username)}
					size="small"
					color="primary"
					onChange={handleCheckboxChange(username)}
				/>
			}
			label={username}
			labelPlacement="end"
		/>
	));

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Filters</DialogTitle>
			<DialogContent>
				<div className="filters-usernames-div">
					{checkBoxes}
				</div>
			</DialogContent>
			<DialogActions>
				<Button autoFocus color="primary" onClick={onCancel}>Cancel</Button>
				<Button color="primary" onClick={onSubmit}>Save</Button>
			</DialogActions>
		</Dialog>
	);
}

export default FiltersModal;
