import React from 'react';
import { Stars } from './Stars';
import { Button } from "./Button";
import { Answer } from "./Answer";
import { DoneFrame } from "./DoneFrame";
import { Numbers } from "./Numbers";
import './include/bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import _ from 'lodash';
  // following function is copied from http://bit.ly/s-pcs
  var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };
export default class Game extends React.Component {
	static randomNumber = () => {
  	return 1+ Math.floor(Math.random()*9);
  };
  static initialState = () => {
  	return {
      selectedNumbers : [],
      randomNumOfStars : Game.randomNumber(),
      answerIsCorrect: null,
      usedNumbers: [],
      redraws:5,
      doneStatus: null,
    };
 	 };
	state = Game.initialState();
  
  resetGame = () => {
  	this.setState(Game.initialState());
  };
  
  possibleSolutions = ({randomNumOfStars,usedNumbers}) => {
  	const possibleNumbers = _.range(1,10).filter( number =>
    	usedNumbers.indexOf(number) === -1
    );
  	return possibleCombinationSum(possibleNumbers,randomNumOfStars);
  };
  
  updateDoneStatus = () => {
  	this.setState(prevState=>{
	  	if(prevState.usedNumbers.length === 9) {
      	return {doneStatus: 'Done, Nice!' };
      }
	  	if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
      	return {doneStatus: 'Game Over!' };
      }      
  	});
  };
  checkAnswer = () => {
  	this.setState(prevState=>({
    	answerIsCorrect:prevState.randomNumOfStars ===
      	prevState.selectedNumbers.reduce((acc,n) => acc + n, 0)
    }));
  };
  
  acceptAnswer = () => {
  	this.setState(
    	(prevState)=> ({
      	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumOfStars : Game.randomNumber(),
      }),this.updateDoneStatus
    );
  };
  
  
  selectNumber = (clickedNumber) => {
    if(this.state.usedNumbers.indexOf(clickedNumber)>=0) {
    	return;
    }
    if(this.state.selectedNumbers.indexOf(clickedNumber)>=0) {
    	return;
    }
  	this.setState(
    	(prevState)=> ({
        answerIsCorrect: null,
      	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      })
    );
  };
  
  unselectNumber = (clickedNumber) => {
    this.setState(
        (prevState)=> ({
          answerIsCorrect: null,
        	selectedNumbers: prevState.selectedNumbers.filter(number => (number != clickedNumber))
        })
    );
  };

	redraw = () => {
  	if(this.state.redraws === 0)  {
    	return;
    }
  	this.setState(
    	(prevState)=> ({
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumOfStars : Game.randomNumber(),
        redraws: prevState.redraws - 1,
      }),this.updateDoneStatus
    );
  
  
  };

	render() {
    const {selectedNumbers, randomNumOfStars, answerIsCorrect, usedNumbers,redraws,doneStatus} = this.state;
  	return (
  		<div className="container">
      	<h1>Play Nine </h1>
        <hr/>
        <div className="row">
        	<Stars numOfStars={randomNumOfStars}/>
        	<Button selectedNumbers={selectedNumbers} 
          	checkAnswer={this.checkAnswer}
          	answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}/>
        	<Answer selectedNumbers={selectedNumbers} 
          unselectNumber={this.unselectNumber}/>
        </div>
        <br />
        {doneStatus ? 
        <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/>
	       : 
        <Numbers selectedNumbers={selectedNumbers}
        selectNumber={this.selectNumber}
        usedNumbers={usedNumbers}/>        
        }
        <br />
      </div>
  	);  
  }
}