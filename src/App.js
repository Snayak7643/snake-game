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
    speed: 280,
  };
  const [snake, setSnake] = useState(initialState);
  const [food, setFood] = useState(getRandom());
  const [count, setCount] = useState(0);
  const [best, setBest] = useState(0);

  const gameOver = (head) => {
    let t = false;
    snake.snakeDots.forEach((dots) => {
      if (dots[0] === head[0] && dots[1] === head[1]) {
        t = true;
      }
    });
    console.log(t);
    return t;
  };

  const handleKey = (e) => {
    e = e || window.event;
    let newState = snake;
    switch (e.keyCode) {
      case 38:
        if (snake.direction !== "DOWN") {
          newState.direction = "UP";
        }
        setSnake(newState);
        break;
      case 40:
        if (snake.direction !== "UP") {
          newState.direction = "DOWN";
        }
        setSnake(newState);
        break;
      case 37:
        if (snake.direction !== "RIGHT") {
          newState.direction = "LEFT";
        }
        setSnake(newState);
        break;
      case 39:
        if (snake.direction !== "LEFT") {
          newState.direction = "RIGHT";
        }
        setSnake(newState);
        break;
      default:
        console.log("wrong key");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      let newSnakeDots = [...snake.snakeDots];
      let newSpeed = snake.speed;
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
        if (count + 1 > best) {
          setBest(count + 1);
        }
        setCount(count + 1);
        if (newSpeed > 50) {
          newSpeed = snake.speed - 20;
        }
      }
      if (head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0) {
        alert("GAME OVER");
        setCount(0);
        setSnake({
          snakeDots: [
            [0, 0],
            [0, 2],
            [0, 4],
          ],
          direction: "RIGHT",
          speed: 280,
        });
        return;
      }
      if (gameOver(head) === false) {
        setSnake({ ...snake, snakeDots: newSnakeDots, speed: newSpeed });
      } else {
        alert("GAME OVER");
        setCount(0);
        setSnake({
          snakeDots: [
            [0, 0],
            [0, 2],
            [0, 4],
          ],
          direction: "RIGHT",
          speed: 280,
        });
      }
      console.log(snake);
      return;
    }, snake.speed);
  }, [snake]);

  document.onkeydown = handleKey;

  return (
    <div className="center">
      <h1>Snake-Game</h1>
      <div className="game-area">
        <Snake snakeDots={snake.snakeDots} />
        <Food food={food} />
      </div>
      <div className="result">
        <h2>Count: {count}</h2>
        <h2>Best: {best}</h2>
      </div>
    </div>
  );
}

export default App;
