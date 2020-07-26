import '../css/ErrorSnackbar.css';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

class ErrorSnackbar extends React.Component {

	constructor(props) {
		super(props);
	}

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.props.resetMessage(null);
	};

	render() {
		return (
			<div>
				<SnackbarContent
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

export default ErrorSnackbar;
