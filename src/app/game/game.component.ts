import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, docData  } from '@angular/fire/firestore';
import { collection, doc, getDoc, setDoc , getFirestore, onSnapshot} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';




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

    const db = getFirestore();
    const unsub = onSnapshot(doc(db, "games", this.gameID), (doc:any) => {
      console.log("Current data: ", doc.data());
      this.game.currentPlayer = doc.data().currentPlayer; 
      this.game.playedCards = doc.data().playedCards; 
      this.game.players = doc.data().players; 
      this.game.stack = doc.data().stack; 
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
