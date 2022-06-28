import './FiltersModal.css';
import React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
	getUsers,
	setFilters
} from '../../state/Effects';

interface IProps {
	open: boolean;
	users: string[];
	filters: string[];
	onClose: () => void;
	getUsers: () => void;
	setFilters: (unchecked: Set<string>) => void;
}

const select = (state) => ({
	users: state.users,
	filters: state.filters
});


const mapDispatchToProps = (dispatch) => ({
	getUsers: () => dispatch(getUsers()),
	setFilters: (unchecked: Set<string>) => dispatch(setFilters([...unchecked]))
});


function ConnectedFiltersModal({ open, onClose, users, getUsers, filters, setFilters }: IProps) {

	const [unchecked, setUnchecked] = React.useState<Set<string>>(new Set());
	React.useEffect(() => {
		if (open) {
			getUsers();
			setUnchecked(new Set(filters));
		}
	}, [ open, getUsers, filters ]);

	const onCancel = () => {
		setUnchecked(new Set(filters));
		onClose();
	};

	const onSubmit = () => {
		setFilters(unchecked);
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

const FiltersModal = connect(select, mapDispatchToProps)(ConnectedFiltersModal);
export default FiltersModal;
