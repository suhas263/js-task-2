import React from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import './InfoBox.css';

const InfoBox = (props) => {
    return (
        <div className="info-box">
          <div className="close-icon" onClick={props.handleClose}><AiOutlineCloseSquare /></div>
          {props.content}
      </div>
    )
}

export default InfoBox
