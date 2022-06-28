import './ErrorSnackbar.css';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../model/States';
import { clearError } from '../state/Actions';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

interface IProps {
	message: string;
	resetMessage: () => void;
}

const select = (state: AppState) => ({
	message: state.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
	resetMessage: () => dispatch(clearError())
});


function ConnectedErrorSnackbar(props: IProps) {

	const handleClose = (event, reason: string) => {
		if (reason === 'clickaway') {
			return;
		}

		this.props.resetMessage();
	};

	const handleButtonClose = (event) => {
		this.props.resetMessage();
	};

	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={props.message !== null}
				autoHideDuration={4000}
				onClose={handleClose}
				ContentProps={{
					'aria-describedby': 'message',
				}}
				message={
					<span id="message">
						<ErrorIcon id="errorIcon" />
						{props.message}
					</span>
				}
				action={
					<IconButton
						key="close"
						aria-label="close"
						color="inherit"
						onClick={handleButtonClose}
					>
						<CloseIcon />
					</IconButton>
				}
			/>
		</div>
	);
}

const ErrorSnackbar = connect(select, mapDispatchToProps)(ConnectedErrorSnackbar);
export default ErrorSnackbar;
