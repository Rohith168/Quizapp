import React from "react";
import "../App.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";
import { Questions } from "../helpers/Questions";
let greeting;
const EndScreen = () => {
  const { score, setScore, setGameState, userName } = useContext(
    GameStateContext
  );
  

  const restartQuiz = () => {
    setScore(0);
    setGameState("menu");
    if(score<0)
    {
       greeting="sorry";
    }
    else{
      greeting="congrulations"
    }
  };
  return (
    
    <div className="EndScreen">
      <h1>Quiz Finished</h1>
      <h3>{greeting} {userName} your score is</h3>
      <h1>
        {score} / {Questions.length}
      </h1>
      <button id="nextQuestion" onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default EndScreen;