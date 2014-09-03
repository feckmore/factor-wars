(function(){
  var app = angular.module('factorWars', []);

  app.controller('FactorController', function(){
    this.matrix = {};
    this.playerClass = ['info', 'danger'];
    this.score = [0, 0];
    this.turns = [0, 0];
    this.claimed = [0, 0];
    this.player = 0;
    this.totalCells = 30;

    this.select = function(value){
      if(this.addScore(value, this.player)){
        // keep track of the number of turns each player has made
        this.turns[this.player]++;
        // switch to the other player now
        this.player = this.otherPlayer(this.player);

        var factors = this.getFactors(value);
        for(index = 0; index < factors.length; index++){
          this.addScore(factors[index], this.player);
        }
      }
    };

    this.otherPlayer = function(player){
      return player === 0 ? 1: 0;
    };

    this.addScore = function(value, player){
      if(this.getClass(value) == undefined){
        this.claimed[player]++;
        this.matrix[value] = player;
        this.score[player] = this.score[player] + value;
        return true;
      } else {
        return false;
      }
    };

    this.getClass = function(value){
      return this.playerClass[this.matrix[value]];
    };

    this.getFactors = function(value){
      var factors = [];
      for(x = value - 1; x > 0; x--){
        if(value % x === 0){
          factors.push(x);
        }
      }
      return factors;
    };

    this.gameOver = function(){
      var size = 0, key;
      for (key in this.matrix) {
        if (this.matrix.hasOwnProperty(key)) size++;
      }
      return size === this.totalCells;
    };

    this.showTurn = function(player){
      return !this.gameOver() && this.player === player;
    };

    this.isWinner = function(player){
      return this.gameOver() && this.score[player] > this.score[this.otherPlayer(player)];
    };
  });

})();