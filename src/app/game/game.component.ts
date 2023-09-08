import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, doc, updateDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  
  game: Game = new Game(); 
  firestore: Firestore = inject(Firestore); 
  games$!: Observable<any[]>;
  gameID:string = ""; 
  data: any;

  constructor(private route: ActivatedRoute , public dialog: MatDialog){
    
  }


  async ngOnInit(): Promise<void> {
    this.game = new Game(); 

    this.route.params.subscribe((param) => {
      this.gameID = this.route.snapshot.params['id'];
      console.log(param);
    }); 

    if(this.firestore){
      const unsub = onSnapshot(doc(this.firestore, "games", this.gameID), (doc:any) => {
      console.log("Current data: ", doc.data());
      this.game.currentPlayer = doc.data().currentPlayer; 
      this.game.playedCards = doc.data().playedCards; 
      this.game.players = doc.data().players; 
      this.game.stack = doc.data().stack; 
      this.game.pickCardAnimation = doc.data().pickCardAnimation;
      this.game.currentCard = doc.data().currentCard;
    });
  }

  }
  
  pickCard(){
    if(!this.game.pickCardAnimation){

      console.log("pick card"); 
      this.game.currentCard = this.game.stack.pop() ?? ''; 
      this.game.pickCardAnimation = true; 
      this.saveGameInFirestore(); 
     
      setTimeout(() => {
        this.game.pickCardAnimation = false; 
        this.game.playedCards.push(this.game.currentCard);
        this.game.currentPlayer++; 
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; 
        console.log(this.game.currentPlayer); 
        this.saveGameInFirestore(); 
      }, 3000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.length > 0){
        this.game.players.push(result); 
        this.saveGameInFirestore(); 
      }
    });
  }

  async saveGameInFirestore(){
    const gameDocRef = doc(this.firestore, "games", this.gameID);
    await updateDoc(gameDocRef, this.game.toJSON() );
  }

}
