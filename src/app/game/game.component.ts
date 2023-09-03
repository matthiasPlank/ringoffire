import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData  } from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false; 
  game: Game = new Game(); 
  currentCard: string = "c01"; 

  firestore: Firestore = inject(Firestore); 
  games$!: Observable<any[]>;

  constructor(public dialog: MatDialog){
 
  }


  ngOnInit(): void {
    this.game = new Game(); 
    //console.log(this.game); 
    const gameCollection = collection(this.firestore, 'games'); 
    const gameJSON = JSON.stringify(this.game) ; 
    setDoc(doc(gameCollection), this.game.toJSON() );  

    this.games$ = collectionData(gameCollection)
    this.games$.subscribe((games) => {
      console.log(games); 
    }); 
  }

  pickCard(){
    if(!this.pickCardAnimation){

      console.log("pick card"); 
      this.currentCard = this.game.stack.pop() ?? ''; 
      this.pickCardAnimation = true; 
     
      setTimeout(() => {
        this.pickCardAnimation = false; 
        this.game.playedCards.push(this.currentCard);
        this.game.currentPlayer++; 
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; 
        console.log(this.game.currentPlayer); 
      }, 3000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.length > 0){
        this.game.players.push(result); 
      }
    });
  }

}
