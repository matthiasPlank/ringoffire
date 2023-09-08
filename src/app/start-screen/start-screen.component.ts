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

  async startGame(){

    let game = new Game();   

    if(this.firestore){
      console.log("Firestore exists");
      try{
        const docRef = await addDoc(collection(this.firestore, "games"), game.toJSON() );
        console.log("Document written with ID: ", docRef.id);
        this.router.navigateByUrl("game/"+ docRef.id); 
      }
      catch{
        console.log("ERROR by get docRef!");
      }
    }  
    else{
      console.log("Firestore nicht gefunden!");
    }

  }

}
