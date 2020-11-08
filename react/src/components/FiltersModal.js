import '../css/FiltersModal.css';
import React from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel
} from '@material-ui/core';
import { setFilters } from '../state/Actions';


const select = (state) => ({
	users: state.users,
	filters: state.filters
});


const mapDispatchToProps = (dispatch) => ({
	setFilters: (unchecked) => dispatch(setFilters([...unchecked]))
});


function ConnectedFiltersModal({ open, onClose, users, filters, setFilters }) {

	const [unchecked, setUnchecked] = React.useState(new Set(filters));

	const onCancel = () => {
		setUnchecked(new Set(filters));
		onClose();
	}

	const onSubmit = () => {
		setFilters(unchecked);
		onClose();
	}

	const handleCheckboxChange = (username) => (event) => {
		event.target.checked
			? unchecked.delete(username)
			: unchecked.add(username)
		;
		setUnchecked(new Set(unchecked));
	}

	const checkBoxes = users.map(username => (
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
		<Dialog open={open} onEnter={() => null} onClose={onClose}>
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
