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

  constructor(){
 
  }

  ngOnInit(): void {
    this.game = new Game(); 
    console.log(this.game); 
  }

  

  pickCard(){
    console.log("pick card"); 
    this.pickCardAnimation = true; 
  }

}
