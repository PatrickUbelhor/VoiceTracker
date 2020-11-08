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


const select = (state) => ({
	users: state.users,
	filters: state.filters
});


function ConnectedFiltersModal({ open, onClose, users, filters }) {


	const checkBoxes = users.map(username => (
		<FormControlLabel
			name={username}
			control={
				<Checkbox
					checked={!filters.has(username)}
					size="small"
					color="primary"
					onChange={() => null}
				/>
			}
			label={username}
			labelPlacement="start"
		/>
	));

	return (
		<Dialog open={open} onEnter={() => null} onClose={onClose}>
			<DialogTitle>Filters</DialogTitle>
			<DialogContent>
				{checkBoxes}
			</DialogContent>
			<DialogActions>
				<Button autoFocus color="primary" onClick={onClose}>Cancel</Button>
				<Button color="primary" onClick={() => null}>Save</Button>
			</DialogActions>
		</Dialog>
	);
}

const FiltersModal = connect(select)(ConnectedFiltersModal);
export default FiltersModal;
