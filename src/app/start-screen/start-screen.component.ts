import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { Firestore, collectionData, docData  } from '@angular/fire/firestore';
import { collection, doc, getDoc, setDoc , getFirestore, onSnapshot, addDoc} from 'firebase/firestore';



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
    const gameCollection = collection(this.firestore, 'games');
    
    const docRef = await addDoc(collection(this.firestore, "games"), game.toJSON() );
    console.log("Document written with ID: ", docRef.id);

/* 

    await setDoc(doc(gameCollection), game.toJSON()).then((data) => {
      console.log("Successful: " + data)})
    .catch((error) => {
      console.log(`Unsuccessful returned error ${error}`)
    });

    debugger; 
     */

    this.router.navigateByUrl("game/"+ docRef.id); 
  }

}
