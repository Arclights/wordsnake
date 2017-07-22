var request = require('supertest');
var Board = require('../board/board');

describe('Board', () => {
  it('should generate board', (done) => {
    const board = new Board(3, 4);

    console.log(board.possiblePositions)

    done();
  });
});
