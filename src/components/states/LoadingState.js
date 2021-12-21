import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import './LoadingState.css';

const LoadingState = () => {
    return (
        <div className='loading-spinner'>
            <BeatLoader color='gray' size={40} />
        </div>
    )
}

export default LoadingState
