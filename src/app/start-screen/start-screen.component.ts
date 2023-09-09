import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { Firestore , collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  firestore: Firestore = inject(Firestore); 
 
  constructor(private router: Router){

  }

  /**
   * Creates a new Game and save it in the firebase. Sets Router to the new GameID. 
   */
  async startGame(){

    let game = new Game();   

    if(this.firestore){
      try{
        const docRef = await addDoc(collection(this.firestore, "games"), game.toJSON() );
        this.router.navigateByUrl("game/"+ docRef.id); 
      }
      catch{
        console.warn("Could not get docmentReference from firestore!");
      }
    }  
    else{
      console.warn("Could not connect to firestore!");
    }
  }
}
