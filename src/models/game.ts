export class Game{
    players:string[] = [];  
    stack:string[] = []; 
    playedCards:string[] = []; 
    currentPlayer:number = 0; 
    pickCardAnimation = false; 
    currentCard: string = "c01"; 

    /**
     * Constructor of the game component. Sets the card stack in random order. 
     */
    constructor(){ 
        for (let i = 1; i < 14; i++) {
            if(i<10){
                this.stack.push("c0" + i );   
                this.stack.push("d0" + i );    
                this.stack.push("h0" + i );    
                this.stack.push("s0" + i );        
            }
            else{
                this.stack.push("c" + i );   
                this.stack.push("d" + i );    
                this.stack.push("h" + i );    
                this.stack.push("s" + i );      
            }
        }
        this.stack = shuffle(this.stack); 
    }

    /**
     * Converts the game in a JSON structor.
     * @returns JSON String
     */
    public toJSON(){
        return {
            players: this.players, 
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer, 
            pickCardAnimation: this.pickCardAnimation, 
            currentCard: this.currentCard
        }
    }
}

/**
 * Shuffles the elemtents of an array and returns this in an random order. 
 * @param array - Array of cards 
 * @returns array in random order. 
 */
export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
};