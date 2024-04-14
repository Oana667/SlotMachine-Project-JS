// Deposit some money
// Det a nr of lines to bet on
// Collect a bet amount
// Spin slot
// Check if user won
// Give user their winnings
// Play again

const prompt = require("prompt-sync")();

const rows = 3;
const cols =3;

const symbols_count ={
    A:2,
    B:4,
    C:6,
    D:8
}

const symbols_values ={
    A:5,
    B:4,
    C:3,
    D:2
}

//1
const deposit = () =>{
    while(true){
    const depositAmount = prompt("Enter a deposit ammount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit, try again");
    }
    else{return numberDepositAmount;}
    }
};
//2
const getNumberOfLines = () =>{
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);
    
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number, try again");
        }
        else{return numberOfLines;}
        }
};
//3
const getBet = (balance,lines) => {
    while(true){
        const bet = prompt("Enter the total bet per line: ");
        const numberBet = parseFloat(bet);
        // the bet * nr of lines that you bet on should be <= balance
        if(isNaN(numberBet) || numberBet <= 0 || numberBet >balance/lines){
            console.log("Invalid bet, try again");
        }
        else{return numberBet;}
        }
};
// 4
const spin = () =>{
    //generate an array of all the availabe symbols we can pick from
    const symbols = [];
    for(const [symbol, count] of Object.entries(symbols_count)){
        for(let i=0;i<= count; i++){
            symbols.push(symbol);
        }
    }
    // loop through all reals represented by the number of cols
    const reels =[];
    for( let i =0; i<cols; i++){
        reels.push([]);
        //copy all the available symbols that we have
        const reelSymbols = [...symbols];
        // loop all of the rows and randomly generate one of the availabe symbols to push it into reels
        for(let j=0; j<rows; j++){
            const random = Math.floor( Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[random];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(random,1);
        }
    }
    return reels;
};
// 5
const transpose = (reels) => {
    const transposedRows = [];

    for (let i = 0; i < rows; i++) {
        transposedRows.push([]);
        for (let j = 0; j < cols; j++) {
            transposedRows[i].push(reels[j][i]);
        }
    }
    return transposedRows;
};

const printSlot =(Rows) => {
    for( const row of Rows){
        let rowString ="";
        for( const [i,symbol] of row.entries()){
            rowString += symbol
            if (i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}
// 6
const getWin =(Rows,bet,lines) => {
    let win=0;
    for(let row =0; row< lines;row++){
        const symbols =Rows[row]
        let allSame=true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            win += bet*symbols_values[symbols[0]]
        }

    }
    return win;
}


const game = () => {
    let balance = deposit();
while(true){
   console.log("Balance: " +balance +"$")
   
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance,numberOfLines);
    balance -= bet * numberOfLines;
    const reels=spin();
    const Rows =transpose(reels);
    printSlot(Rows);
    const winnings= getWin(Rows,bet,numberOfLines);
    console.log("You won $" +winnings.toString())
    balance += winnings;
    if(balance<=0){
        console.log("You ran out of money!")
        break;
    }
    const playAgain =prompt("Do you want to play again?(y/n)");
    if(playAgain != "y") break;
};

}
game();