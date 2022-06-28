import './ErrorSnackbar.css';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../model/States';
import { clearError } from '../state/Actions';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';


function ErrorSnackbar() {

	const message: string = useSelector<AppState, string>(state => state.errorMessage);
	const dispatch = useDispatch();
	const resetMessage = useCallback(
		() => dispatch(clearError()),
		[dispatch]
	);

	const handleClose = (event, reason: string) => {
		if (reason === 'clickaway') {
			return;
		}

		resetMessage();
	};

	const handleButtonClose = () => {
		resetMessage();
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			open={message !== null}
			autoHideDuration={4000}
			onClose={handleClose}
			ContentProps={{
				'aria-describedby': 'message',
			}}
			message={
				<span id="message">
					<ErrorIcon id="errorIcon" />
					{message}
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
	);
}

export default ErrorSnackbar;
