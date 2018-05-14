import React from 'react';

export const Answer = (props) => {
    const handleOnClick = (event) => {
    let clickedNumber = event.target.innerHTML;
  props.unselectNumber(clickedNumber);
};
  return (
      <div className="col-5">
    {
    props.selectedNumbers.map(
        (number,i)=><span key={i} onClick={handleOnClick.bind(this)}>{number}</span>
    )}
  </div>
  );  
};