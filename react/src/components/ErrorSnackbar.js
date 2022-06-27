import './ErrorSnackbar.css';
import React from 'react';
import { connect } from 'react-redux';
import { clearError } from '../state/Actions';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';


const select = (state) => ({
	message: state.errorMessage
});


const mapDispatchToProps = (dispatch) => ({
	resetMessage: () => dispatch(clearError())
});


class ConnectedErrorSnackbar extends React.Component {

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.props.resetMessage();
	};

	render() {
		return (
			<div>
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={this.props.message !== null}
					autoHideDuration={4000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message',
					}}
					message={
						<span id="message">
							<ErrorIcon id="errorIcon" />
							{this.props.message}
						</span>
					}
					action={
						<IconButton
							key="close"
							aria-label="close"
							color="inherit"
							onClick={this.handleClose}
						>
							<CloseIcon />
						</IconButton>
					}
				/>
			</div>
		);
	}
}

const ErrorSnackbar = connect(select, mapDispatchToProps)(ConnectedErrorSnackbar);
export default ErrorSnackbar;
