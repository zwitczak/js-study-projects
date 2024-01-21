const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.querySelector('.winning-message');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton')
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn = true;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once:true});
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show');

}

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // place mark
    placeMark(cell, currentClass)
    
    if (checkWin(currentClass)){
        // chcek for win
        console.log('winner')
        endGame(false)
    } else if(isDraw()){
        // check for draw
        endGame(true)
    } else{
        // switch turn
        swapTurn()
        setBoardHoverClass()
    }
}


function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(isDraw){
    if (isDraw){
        winningMessageTextElement.innerText = `Draw!`

    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurn(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    boardElement.classList.remove(X_CLASS)
    boardElement.classList.remove(CIRCLE_CLASS)

    if(circleTurn){
        boardElement.classList.add(CIRCLE_CLASS)
    }else{
        boardElement.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}