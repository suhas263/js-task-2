import React from 'react';
import './EmptyResults.css';

const EmptyResults = (props) => {
    return <div className='no-results'>{props.message}</div>;
}

export default EmptyResults

EmptyResults.defaultProps = {
	message: 'No results for this data set',
};
