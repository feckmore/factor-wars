(function(){
  var app = angular.module('factorWars', []);

  app.controller('FactorController', function(){
    this.classes = {};
    this.playerClass = ['info', 'danger'];
    this.score = [0, 0];
    this.player = 0;

    this.select = function(value){
      if(this.addScore(value, this.player)){
        this.player = this.player === 0 ? 1: 0;

        var factors = this.getFactors(value);
        for(index = 0; index < factors.length; index++){
          this.addScore(factors[index], this.player);
        }
      }
    };

    this.addScore = function(value, player){
      if(this.getClass(value) == undefined){
        this.classes[value] = player;
        this.score[player] = this.score[player] + value;
        return true;
      } else {
        return false;
      }
    };

    this.getClass = function(value){
      return this.playerClass[this.classes[value]];
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
  });

})();