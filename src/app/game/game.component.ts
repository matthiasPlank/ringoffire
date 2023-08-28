import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false; 
  game: Game = new Game(); 
  currentCard: string = "c01"; 

  constructor(){
 
  }


  ngOnInit(): void {
    this.game = new Game(); 
    console.log(this.game); 
  }

  

  pickCard(){
    if(!this.pickCardAnimation){

      console.log("pick card"); 
      this.currentCard = this.game.stack.pop() ?? ''; 
      this.pickCardAnimation = true; 
     
      setTimeout(() => {
        this.pickCardAnimation = false; 
        this.game.playedCards.push(this.currentCard);
      }, 3000);
    }
  }

}
