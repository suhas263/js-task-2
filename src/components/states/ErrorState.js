import React from 'react';
import './ErrorState.css';

const ErrorState = (props) => {
	return <div className='error'>{props.errorMessage}</div>;
};

export default ErrorState;

ErrorState.defaultProps = {
	errorMessage: 'Loading data from the server failed',
};
