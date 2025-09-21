import './ErrorSnackbar.css';
import React, { useCallback } from 'react';
import { clearError } from '../state/Actions';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { useAppDispatch, useAppSelector } from '../state/Hooks';


function ErrorSnackbar() {

	const message: string = useAppSelector<string>(state => state.errorMessage);
	const dispatch = useAppDispatch();
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
			anchorOrigin={ {
				vertical: 'top',
				horizontal: 'center',
			} }
			open={ message !== null }
			autoHideDuration={ 4000 }
			onClose={ handleClose }
			slotProps={{
				content: {
					'aria-describedby': 'message'
				}
			}}
			message={
				<span id="message">
					<ErrorIcon id="errorIcon" />
					{ message }
				</span>
			}
			action={
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					onClick={ handleButtonClose }
				>
					<CloseIcon />
				</IconButton>
			}
		/>
	);
}

export default ErrorSnackbar;
