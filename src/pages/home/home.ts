import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, IonicPage, Content, Button } from 'ionic-angular';
import { ColorChangeDirective } from '../../directives/color-change/color-change';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChildren(ColorChangeDirective) buttons: QueryList<ColorChangeDirective>;
  validMoves = {
    0:[1,3,4],
    1:[0,4,2],
    2:[1,4,5],
    3:[0,4,6],
    4:[0,1,2,3,5,6,7,8],
    5:[2,4,8],
    6:[3,4,7],
    7:[6,4,8],
    8:[5,4,7]
  };
  currentPlayer:number = 0;
  noOfMoves:number = 0;
  color = Array(9).fill(null);
  squares = Array(9).fill(null);
  teamA = Array(3).fill(null);
  teamB = Array(3).fill(null);
  previousIndex:number = 0;
  currentIndex:number = 0;
  gameFinished:boolean = false;
  constructor(public navCtrl: NavController) {

  }

  restart() {
    this.currentPlayer = 0;
    this.noOfMoves = 0;
    this.color = Array(9).fill(null);
    this.squares = Array(9).fill(null);
    this.teamA = Array(3).fill(null);
    this.teamB = Array(3).fill(null);
    this.previousIndex = 0;
    this.currentIndex = 0;
    this.gameFinished = false;
    this.buttons.forEach((button,i) => {
      button.border("#000000");
      button.color = null;
      button.highlight(null);

    });
  }

  isAvailable(value, index, ar) {
    return this[value] == null;
  }

  isValidMove(index) {
    if(this.noOfMoves > 5) {
      //odd: first selection
      if(this.noOfMoves%2 == 0) {
        return (this.squares[index] == this.currentPlayer && this.validMoves[index].some(this.isAvailable,this.squares));
      }
      else {
        return (this.squares[index] == null && this.validMoves[this.previousIndex].indexOf(index)!=-1)
      }
    }
    else {
      return (this.squares[index] == null)
    }
   
  }

  fillPlayers(index) {
    this.currentIndex = index;
    this.color[index] = this.currentPlayer?"tomato":"green";
    this.squares[index] = this.currentPlayer;
    this.buttons.forEach((button,i) => {
      button.color = this.color[i];
      button.highlight(button.color);
    });
    
    if(this.calculateWinner()==null){
      this.currentPlayer = this.currentPlayer?0:1;
    }
      
  }

  continueGame(index) {
    if(this.noOfMoves%2 == 0){
      this.currentIndex = index;
      this.color[index] = this.currentPlayer?"tomato":"green";
      this.color[this.previousIndex] = null;
      this.squares[this.previousIndex] = null;
      this.squares[index] = this.currentPlayer;
      this.buttons.forEach((button,i) => {
        if(i == this.previousIndex) {
          button.border("#000000");
        }
        button.color = this.color[i];
        button.highlight(button.color);

      });
      if(this.calculateWinner()==null){
        this.currentPlayer = this.currentPlayer?0:1;
      }
    }
    else {
      this.previousIndex = index;
      this.buttons.forEach((button,i) => {
        if(i == index) {
          button.border("#0000FF");
        }
      });
    }
  }

  checkStatus(index) {
    if(!this.gameFinished && this.isValidMove(index)) {
      this.noOfMoves++;
      if(this.noOfMoves > 6) {
        this.continueGame(index);
      }
      else {
        this.fillPlayers(index);
      }
    }
  }

  calculateWinner() {
    let squares = this.squares;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a]!=null && squares[a] === squares[b] && squares[a] === squares[c]) {
        this.gameFinished = true;
        return squares[a];
      }
    }
    return null;
  }

  getNextPossiblePlaces() {

  }

}
