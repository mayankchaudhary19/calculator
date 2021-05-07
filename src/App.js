import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";  // useState is a hook- anything occuring at a particular time, used to create a state and change that state (React now uses functional component earlier it used class component)

function App() {
  let [oldExpression, setOldExpression] = useState("");
  let [expression, setExpression] = useState("0");
  let [prev, setPrev] = useState("");

  let numberics = new Set("0123456789.");   // set has unique values
  let operators = new Set("+-/*%");
  let brackets = new Set("()");

  let buttons = ["(", ")", "%", "AC", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

  let evalateExpression = () => {
    if (prev != "OP") {
      let evaluatedValue = eval(expression);
      setOldExpression(expression + " = ");
      setExpression(String(evaluatedValue));
      setPrev("ANS");
    }
  };

  let putNumerics = (value) => {
    if (prev == "ANS") {
      setOldExpression("Ans = " + expression);
      setExpression(value);
    } else {
      if (expression != "0") {
        setExpression(expression + value);
      } else {
        setOldExpression("Ans = " + expression);
        setExpression(value);
      }
    }
    setPrev("NUM");
  };

  let putOperators = (value) => {
    if (prev != "OP") {
      setExpression(expression + value);
    } else {    // if we want to change the operator 
      if (expression.length >= 1) {
        setExpression(expression.slice(0, -1) + value);
      }
    }
    setPrev("OP");
  };

  let putBack = () => {
    if (expression.length >= 1) {
      setExpression(expression.slice(0, -1));
    }
    setPrev("DEL");
  };

  let putBrackets = (value) => {
    setExpression(expression + value);
  };

  let onKeyUpHandler = function (event) {
    // console.log(event.key);
    if (event.key === "Enter" || event.key === "=") {
      evalateExpression();
    } else if (event.key === "Backspace") {
      putBack();
    } else if (numberics.has(event.key)) {
      putNumerics(event.key);
    } else if (operators.has(event.key)) { // checks if the set has the values or not
      putOperators(event.key);
    } else if (brackets.has(event.key)) {
      putBrackets(event.key);
    }
  };
  return (
    <div className="App" tabIndex={0} onKeyUp={onKeyUpHandler}>
      {/* in html it's class="name" */}
      <div
        style={{
          background: "#ffffff",
          width: "400px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "cener",
          alignItems: "flex-end",
          padding: "20px",
          margin: "20px",
          overflow: "hidden"   //to hide the text going out of <div>
        }}
      >
        <h4>{oldExpression}</h4>
        <h1>{expression}</h1>
      </div>
      <div style={{
        background: "#ffffff",
        width: "400px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "cener",
        alignItems: "center",
        padding: "20px"
      }}>
        {
          buttons.map((buttonValue, idx) => {
            return (
              <button style={{
                width: "90px",
                padding: "5px",
                margin: "5px"
              }}
                onClick={function () {
                  if (buttonValue === "=") {
                    evalateExpression();
                  } else if (buttonValue === "AC") {
                    putBack();
                  } else if (numberics.has(buttonValue)) {
                    putNumerics(buttonValue);
                  } else if (operators.has(buttonValue)) {
                    putOperators(buttonValue);
                  } else if (brackets.has(buttonValue)) {
                    putBrackets(buttonValue);
                  }
                }}
              >{buttonValue}</button>
            );
          })
        }
      </div>
    </div>
  );
}
export default App;
