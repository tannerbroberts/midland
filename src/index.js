// A game that both generates a maze and allows a player to traverse it.
// The maze is generated using a depth-first search algorithm.
// The player is represented as a blue square
// The maze is represented as a grid of walls and paths (white and black squares)
// The goal is represented as a green square and is the deepest point in the maze

class Maze {
  constructor(height, width) {
    this.width = width;
    this.height = height;
    this.squares = this.generateSquares(width, height);
    this.setWalls();
    this.setPlayer();
  }

  hurtPlayer(direction) {
    this.player.square.style.backgroundColor = 'black';
    // make the player clip 1/4 of the way into the wall as well
    this.player.square.style.top = `${this.player.coordinates.y * document.getElementById('app').clientHeight / this.height + document.getElementById('app').clientHeight / this.height / 8}px`;
    setTimeout(() => {
      this.player.square.style.backgroundColor = 'red';
      this.player.square.style.top = `${this.player.coordinates.y * document.getElementById('app').clientHeight / this.height}px`;
      setTimeout(() => {
        this.player.square.style.backgroundColor = 'blue';
      }, 100);
    }, 100);
    this.lives.innerHTML = `Lives: ${this.lives - 1}`;
  }

  setGoal() {

  }

  setPlayer() {
    const app = document.getElementById('app');
    const player = document.createElement('div');
    this.player = {
      square: player,
      coordinates: {
        x: 0,
        y: 0,
      },
    };
    player.id = 'player';
    player.classList.add('square');
    player.style.backgroundColor = 'blue';
    player.style.width = `${app.clientWidth / this.width}px`;
    player.style.height = `${app.clientHeight / this.height}px`;
    player.style.top = '0px';
    player.style.left = '0px';
    player.style.zIndex = 1;
    document.addEventListener('keyup', (event) => {
      this.movePlayer(event.key);
    });
    document.getElementById('app').appendChild(player);
  }

  movePlayer(direction) {
    if (!this.canMovePlayer(direction)) this.hurtPlayer();
    else {
      switch (direction) {
        case 'ArrowUp':
          this.player.coordinates.y -= 1;
          this.player.square.style.top = `${this.player.coordinates.y * document.getElementById('app').clientHeight / this.height}px`;
          break;
        case 'ArrowDown':
          this.player.coordinates.y += 1;
          this.player.square.style.top = `${this.player.coordinates.y * document.getElementById('app').clientHeight / this.height}px`;
          break;
        case 'ArrowLeft':
          this.player.coordinates.x -= 1;
          this.player.square.style.left = `${this.player.coordinates.x * document.getElementById('app').clientWidth / this.width}px`;
          break;
          case 'ArrowRight':
          this.player.coordinates.x += 1;
          this.player.square.style.left = `${this.player.coordinates.x * document.getElementById('app').clientWidth / this.width}px`;
          break;
          default:
          break;
      }
    }
  }

  canMovePlayer(direction) {
    const { x, y } = this.player.coordinates;
    switch (direction) {
      case 'ArrowUp':
        return y > 0 && !this.getSquare(x, y).square.classList.contains('top-wall');
      case 'ArrowDown':
        return y < this.height - 1 && !this.getSquare(x, y).square.classList.contains('bottom-wall');
      case 'ArrowLeft':
        return x > 0 && !this.getSquare(x, y).square.classList.contains('left-wall');
      case 'ArrowRight':
        return x  < this.width - 1 && !this.getSquare(x, y).square.classList.contains('right-wall');
      default:
        return false;
    }
  }

  setWalls() {
    // Set the walls of the maze
    const squareStack = [];
    const visitedSquares = new Set();
    const startSquare = this.getSquare(0, 0);
    squareStack.push(startSquare);
    visitedSquares.add(startSquare);
    while (squareStack.length > 0) {
      // debugger
      const currentSquare = squareStack.pop();
      const neighbors = this.getNeighbors(currentSquare);
      const currentSquareCoordinates = `${currentSquare.coordinates.x},${currentSquare.coordinates.y}`;
      const unvisitedNeighborCoordinates = neighbors.filter(neighbor => !visitedSquares.has(neighbor)).map(neighbor => `${neighbor.coordinates.x},${neighbor.coordinates.y}`).join(', ');
      const unvisitedNeighbors = neighbors.filter(neighbor => !visitedSquares.has(neighbor));
      if (unvisitedNeighbors.length > 0) {
        squareStack.push(currentSquare);
        const randomNeighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        this.removeWall(currentSquare, randomNeighbor);
        visitedSquares.add(randomNeighbor);
        squareStack.push(randomNeighbor);
      }
    }
  }

  removeWall(square1, square2) {
    // debugger;
    const { square: element1 } = square1;
    const { square: element2 } = square2;
    const { x: x1, y: y1 } = square1.coordinates;
    const { x: x2, y: y2 } = square2.coordinates;
    if (x1 === x2) {
      if (y1 > y2) {
        element1.classList.remove('top-wall');
        element2.classList.remove('bottom-wall');
      } else {
        element1.classList.remove('bottom-wall');
        element2.classList.remove('top-wall');
      }
    } else {
      if (x1 > x2) {
        element1.classList.remove('left-wall');
        element2.classList.remove('right-wall');
      } else {
        element1.classList.remove('right-wall');
        element2.classList.remove('left-wall');
      }
  }
}

  getNeighbors(square) {
    const neighbors = [];
    const {x, y} = square.coordinates;
    if (x > 0) {
      neighbors.push(this.getSquare(x - 1, y));
    }
    if (x < this.width - 1) {
      neighbors.push(this.getSquare(x + 1, y));
    }
    if (y > 0) {
      neighbors.push(this.getSquare(x, y - 1));
    }
    if (y < this.height - 1) {
      neighbors.push(this.getSquare(x, y + 1));
    }
    const coords = `${x},${y}`;
    const neighborCoords = neighbors.map(neighbor => `${neighbor.coordinates.x},${neighbor.coordinates.y}`).join(', ');
    return neighbors;
  }

  generateSquares(width, height) {
    const squareReferences = [];
    const app = document.getElementById('app');
    app.classList.add('gapped');
    const squares = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const square = document.createElement('div');
        squareReferences.push({
          square,
          coordinates: {
            y,
            x
          },
        });

        square.id = `square-${x}-${y}`;
        square.classList.add('square');
        square.classList.add('left-wall');
        square.classList.add('right-wall');
        square.classList.add('top-wall');
        square.classList.add('bottom-wall');

        square.style.top = `${y * app.clientHeight / height}px`;
        square.style.height = `${app.clientHeight / height}px`;

        square.style.left = `${x * app.clientWidth / width}px`;
        square.style.width = `${app.clientWidth / width}px`;
        square.addEventListener('click', () => {
        });
        app.appendChild(square);
      }
    }
    return squareReferences;
  }

  getSquare(x, y) {
    return this.squares[y * this.width + x];
  }
}

const maze = new Maze(20, 20);
