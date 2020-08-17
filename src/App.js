import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ]
}
class App extends Component {

  state = initialState;
  

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.keepInArea();
    this.checkIfCrashed();
  }

  onKeyDown = (e) => {
    e = e || window.event;
      switch (e.keyCode) {
        case 37:
          this.setState({direction: 'LEFT'});
          break;
        case 38:
          this.setState({direction: 'UP'});
          break;
        case 39:
          this.setState({direction: 'RIGHT'});
          break;
        case 40:
          this.setState({direction: 'DOWN'});
          break;
      }
      
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let snakeHead = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        snakeHead = [snakeHead[0] + 2, snakeHead[1]];
          break;
      case 'LEFT':
        snakeHead = [snakeHead[0] - 2, snakeHead[1]];
          break;
      case 'DOWN':
        snakeHead = [snakeHead[0], snakeHead[1] + 2];
          break;
      case 'UP':
        snakeHead = [snakeHead[0], snakeHead[1] - 2];
          break; 
    }
    dots.push(snakeHead);
      dots.shift();
      this.setState({
        snakeDots: dots
      })
  }

  keepInArea() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0 ) {
        this.onGameOver();
      }
  }

  checkIfCrashed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }


  onGameOver() {
    alert(`Game Over, Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }  

  render() { 
    return (
      <div className="game-area">
      <Snake snakeDots={this.state.snakeDots} />
      <Food dot={this.state.food} />
    </div>
  );
}
}

export default App;
