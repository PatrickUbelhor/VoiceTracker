import './FiltersModal.css';
import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getUsers, setFilters } from '../../state/Effects';
import { useAppDispatch, useAppSelector } from '../../state/Hooks';

interface IProps {
	open: boolean;
	onClose: () => void;
}

function FiltersModal({ open, onClose }: IProps) {
	// Inputs
	const users: string[] = useAppSelector<string[]>((state) => state.users);
	const filters: Set<string> = useAppSelector<Set<string>>(
		(state) => state.filters
	);

	// Outputs
	const dispatch = useAppDispatch();
	const updateFilters = useCallback(
		(unchecked: Set<string>) => dispatch(setFilters([...unchecked])),
		[dispatch]
	);

	const [unchecked, setUnchecked] = useState<Set<string>>(new Set());
	useEffect(() => {
		if (open) {
			dispatch(getUsers());
			setUnchecked(new Set(filters));
		}
	}, [dispatch, open, filters]);

	const onCancel = () => {
		setUnchecked(new Set(filters));
		onClose();
	};

	const onSubmit = () => {
		updateFilters(unchecked);
		onClose();
	};

	const handleCheckboxChange = (username: string) => (event) => {
		event.target.checked ? unchecked.delete(username) : unchecked.add(username);
		setUnchecked(new Set(unchecked));
	};

	const checkBoxes = users.map((username: string) => (
		<FormControlLabel
			key={ username }
			name={ username }
			control={
				<Checkbox
					checked={ !unchecked.has(username) }
					size="small"
					color="primary"
					onChange={ handleCheckboxChange(username) }
				/>
			}
			label={ <span className="oneLine">{ username }</span> }
			labelPlacement="end"
		/>
	));

	return (
		<Dialog open={ open } onClose={ onClose }>
			<DialogTitle>Filters</DialogTitle>
			<DialogContent>
				<div className="filters-usernames-div">{ checkBoxes }</div>
			</DialogContent>
			<DialogActions>
				<Button autoFocus color="primary" onClick={ onCancel }>
					Cancel
				</Button>
				<Button color="primary" onClick={ onSubmit }>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default FiltersModal;
