import React, { useState, useEffect } from "react";
import "./App.css";
import Snake from "./Components/Snake";
import Food from "./Components/Food";

const getRandom = () => {
  let min = 1;
  let max = 98;
  let t = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let l = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [t, l];
};

function App() {
  const initialState = {
    snakeDots: [
      [0, 0],
      [0, 2],
      [0, 4],
    ],
    direction: "RIGHT",
  };
  const [snake, setSnake] = useState(initialState);
  const [food, setFood] = useState(getRandom());

  const handleKey = (e) => {
    e = e || window.event;
    let newState = snake;
    switch (e.keyCode) {
      case 38:
        newState.direction = "UP";
        setSnake(newState);
        break;
      case 40:
        newState.direction = "DOWN";
        setSnake(newState);
        break;
      case 37:
        newState.direction = "LEFT";
        setSnake(newState);
        break;
      case 39:
        newState.direction = "RIGHT";
        setSnake(newState);
        break;
      default:
        console.log("wrong key");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      let newSnakeDots = [...snake.snakeDots];
      let head = newSnakeDots[newSnakeDots.length - 1];
      switch (snake.direction) {
        case "RIGHT":
          head = [head[0], head[1] + 2];
          break;
        case "LEFT":
          head = [head[0], head[1] - 2];
          break;
        case "UP":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0] + 2, head[1]];
          break;
        default:
          console.log("wrong key");
      }
      newSnakeDots.push(head);
      if (head[0] !== food[0] || head[1] !== food[1]) {
        newSnakeDots.shift();
      } else {
        setFood(getRandom());
      }
      if (head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0) {
        alert("GAME OVER");
        setSnake({
          snakeDots: [
            [0, 0],
            [0, 2],
            [0, 4],
          ],
          direction: "RIGHT",
        });
        return;
      }
      setSnake({ ...snake, snakeDots: newSnakeDots });
      console.log(snake);
      return;
    }, 250);
  }, [snake, food]);

  document.onkeydown = handleKey;

  return (
    <div className="center">
      <h1>Snake-Game</h1>
      <div className="game-area">
        <Snake snakeDots={snake.snakeDots} />
        <Food food={food} />
      </div>
    </div>
  );
}

export default App;
