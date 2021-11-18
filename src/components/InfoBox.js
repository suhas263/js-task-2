import React from 'react';
import './InfoBox.css';

const InfoBox = (props) => {
	return <div className='info-box'>{props.errorMessage}</div>;
};

export default InfoBox;

InfoBox.defaultProps = {
	errorMessage: 'Loading data from the server failed.',
};
