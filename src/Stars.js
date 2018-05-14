import React from 'react';
import _ from 'lodash';

export const Stars = (props) => {
	//let numOfStars = 1+ Math.floor(Math.random()*9);
  // let stars =[];
  // for(let i=0; i<numOfStars; i++) {
  // 	stars.push(<i key={i} className="fa fa-star"></i>);
  // }
  
  
  	return (
  		<div className="col-5">
      	<div>
        	{_.range(props.numOfStars).map(
          	(i) => <i key={i} className="fa fa-star"></i>
          )}
        </div>
      </div>
  	);  
};