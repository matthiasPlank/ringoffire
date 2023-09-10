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

  /**
   * Constructor of the GameComponent. 
   * @param route - Router
   * @param dialog - MaterialDesigne Dialog
   */
  constructor(private route: ActivatedRoute , public dialog: MatDialog){
    
  }

  /**
   * Game initializing. Get Game ID from Router and load Game from firestore. 
   */
  async ngOnInit(): Promise<void> {
    this.game = new Game(); 

    this.route.params.subscribe((param) => {
      this.gameID = this.route.snapshot.params['id'];
    }); 

    if(this.firestore){
      const unsub = onSnapshot(doc(this.firestore, "games", this.gameID), (doc:any) => {
      this.game.currentPlayer = doc.data().currentPlayer; 
      this.game.playedCards = doc.data().playedCards; 
      this.game.players = doc.data().players; 
      this.game.stack = doc.data().stack; 
      this.game.pickCardAnimation = doc.data().pickCardAnimation;
      this.game.currentCard = doc.data().currentCard;
      });
    }
  }
  
  /**
   * Pick card from Stack
   */
  pickCard(){
    if(!this.game.pickCardAnimation && this.game.stack.length > 0){
      this.game.currentCard = this.game.stack.pop() ?? ''; 
      this.game.pickCardAnimation = true; 
      this.saveGameInFirestore(); 
     
      setTimeout(() => {
        this.game.pickCardAnimation = false; 
        this.game.playedCards.push(this.game.currentCard);
        isNaN(this.game.currentPlayer) ? this.game.currentPlayer = 0 : "" ; 
        this.game.currentPlayer++; 
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;         
        this.saveGameInFirestore(); 
      }, 3000);
    }
    else if(this.game.stack.length == 0){
      this.game.stack =this.game.playedCards; 
      this.pickCard(); 
    } 
  }

  /**
   * Open "AddNewPlayer" Dialog
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.length > 0){
        this.game.players.push(result); 
        this.saveGameInFirestore(); 
      }
    });
  }

  /**
   * Save current Game in firestore. 
   */
  async saveGameInFirestore(){
    const gameDocRef = doc(this.firestore, "games", this.gameID);
    await updateDoc(gameDocRef, this.game.toJSON() );
  }
}
