import { Component, Input, OnChanges, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'his person is the thumb master until another player draws another 6. This means that everytime the thumb master puts his/her thumb on the floor or table that everyone has to do the same and the last to do so has to drink.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'You are the Quizmaster! If someone answered a Question from you, these person has to drink' },
    { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title: string = ""; 
  description: string = ""; 
  @Input() card = ""; 
  @Input() firstCardPlayed = false;    

  ngOnChanges():void{
    if(this.firstCardPlayed){
      let cardNumber : number = 0; 
      this.card.substring(1,2) == "0" ? cardNumber = +this.card.substring(2,3) : cardNumber = +this.card.substring(1,3) ; 
      console.log("Cardnumber: " + cardNumber);  
      this.title = this.cardAction[cardNumber-1].title; 
      this.description = this.cardAction[cardNumber-1].description; 
    }
    else{
      this.title = "Pick a Card";
      this.description = "Add all Players to the Game. The first player can pick a card and follow the instructions.";
    }
  }

}
