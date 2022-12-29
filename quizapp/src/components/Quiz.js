import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

function Questions() {
  const [question, setquestion] = useState([]);
  const [counter,setCounter] = useState(1)
  const [len,setLen]=useState(0);
  const [optionChosen, setOptionChosen] = useState(" ");
  const { score, setScore, gameState, setGameState } = useContext(
    GameStateContext
  );
const [currentans,setcurrentans]=useState("");
  useEffect(() => {
    qdata()
    q1data();
   

  },[counter] );

  const qdata = async () => {
    const { data } = await axios.get(`http://localhost:5000/quiz/${counter}`);
    setquestion(data);
    setcurrentans(data[0].answer)
    //  console.log(data);
    //  console.log(data[0].answer);
  };

  const q1data = async () => {
    const { data } = await axios.get(`http://localhost:5000/quiz`);
    // console.log(data);
    setLen( data.length)
    //  console.log(data.length);
  };
  const nextQuestion = () => {
    if(optionChosen!==" ")
    {
      if(optionChosen==currentans)
      {
       setScore(score+1)
       setOptionChosen(" ");
       setcurrentans(" ");
      }
      // console.log(score)
    }
     setCounter(counter+1);
    // console.log(counter);
  };
  const finishQuiz = () => {
    nextQuestion();
    setGameState("finished");
  };
 const setOption=(opt,ans)=>{
setOptionChosen(opt);
console.log("opt",optionChosen);
setcurrentans(ans);
console.log("ans",currentans);
 }

  return (
    <div>
          {question.map((eachData) =>(
             
           
       <div key={eachData._id}>
       <div>
       <h1>{eachData.prompt}</h1>
       <button onClick={() => {setOptionChosen("optionA") }} id="btn1">{eachData.optionA}</button><br></br>
       <button onClick={() => {setOptionChosen("optionB") }} id="btn2">{eachData.optionB}</button><br></br>
       <button onClick={() => {setOptionChosen("optionC") }} id="btn3">{eachData.optionC}</button><br></br>
       <button onClick={() =>{setOptionChosen("optionD") }} id="btn4">{eachData.optionD}</button><br></br>
       </div>
       </div>
      ) )
           }  
           {counter === len ? (
        <button  id="nextQuestion" onClick={finishQuiz}>
          Finish Quiz
        </button>
      ) : (
        <button onClick={nextQuestion} id="nextQuestion">
          Next Question
        </button>
      )}
    </div>
  );
}

export default Questions;