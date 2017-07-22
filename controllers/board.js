'use strict';
var Board = require('../board/board');

module.exports = (req, res) => {
    const width = req.params.width;
    const height = req.params.height;

    const board = new Board(width, height);

    while(!board.isFull()){

    //     get word max length of space left on board
    //     place word on board
    //     shift arbitrary amount up/down on board
    }

}