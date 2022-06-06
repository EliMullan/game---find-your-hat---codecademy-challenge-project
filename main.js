const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field, x = 0) {
     this.rowLength = field[0].length + 1;
     this.field = field.map(line => line.join('')).join('\n');
     this.userPosition = x;      
    } 

    // generate an array with x rows and y columns
    static generateField(x, y) {
      let arr = [];
      let options = [ fieldCharacter, hole, fieldCharacter]; 
      let randomHatIndexX = Math.ceil(Math.random() * x - 1); 
      let randomHatIndexY = Math.ceil(Math.random() * y - 1) ;   
      for(let i = 0; i < y; i++) {  
        let yArr = [];       
        for(let j = 0; j < x; j++) {
         let randomIndex = Math.floor(Math.random() * 3);
          yArr.push(options[randomIndex]);          
        }     
        arr.push(yArr);     
       }  
       arr[randomHatIndexY][randomHatIndexX] = hat;
       arr[0][0] = pathCharacter;            
       return arr;     
   }

   // Replace current position symbol with pathCharacter
    replaceAt(position, newCharacter) {
      this.field = this.field.substring(0, position) + newCharacter + this.field.substring(position + 1); 
    }

    // print the game field
    print() {
      process.stdout.write(this.field);
    } 

    // check current position against field and determine win or loose
    checkWin (userPosition) {   
        let symbol = this.field[userPosition] ;    
        if (symbol == hat) { 
          process.stdout.write(`\n Congrats! You found your hat ! \n`);          
          process.exit();
        }
        else if (symbol == hole) {          
          process.stdout.write(`\n You fell into a whole\n`);            
          process.exit();
        }
        else if (symbol !== fieldCharacter) {           
          process.stdout.write(`\n You are out of bounds \n`);          
          process.exit();
        }
        else {
          this.replaceAt(this.userPosition, pathCharacter) 
          this.print();
          process.stdout.write('\n Which way?  ')                         
        }     
    }

    // handle user input
    handleInput (userInput) {
      const input = userInput.toString().trim();                  
      if (input === 'U' || input === 'u') {
        this.userPosition = this.userPosition - this.rowLength;        
        this.checkWin(this.userPosition);
      }
      else if (input === 'D' || input === 'd') {
        this.userPosition = this.userPosition + this.rowLength;
        this.checkWin(this.userPosition);
      }
      else if (input === 'R' || input === 'r') {
        this.userPosition = this.userPosition + 1; 
        this.checkWin(this.userPosition);
      }
      else if (input === 'L' || input === 'l') {
        this.userPosition = this.userPosition - 1;
        this.checkWin(this.userPosition);
      } 
      else {
        process.stdout.write('U is up, D is down, R is right, L is left \n');
      }
    }

    //play game , called only once 
    play() {
      this.print();
      process.stdout.write('\n Which way?  ')
      process.stdin.on('data', e => this.handleInput(e))
    }
  }
 
  //generate a field with x rows and y columns 
 let arr2 =  Field.generateField(9, 10);

 //generate a game from class
 const gameFiled = new Field(arr2);

 //play game 
 gameFiled.play();
 

