class DailyConundrum {
    anagramArr = ['willygong','eatenturd','shaginbum'];
    answerArr = ['glowingly','untreated','ambushing'];
    isTimerActive;

    constructor(){
        let i = Math.floor(Math.random() * this.anagramArr.length);
        this.anagram = this.anagramArr[i];
        this.answer = this.answerArr[i];
        this.listenToInput();
        this.isTimerActive = false;
    }

    setAnagram() {
        const anagramElement = document.getElementById('anagram');
        anagramElement.innerText = this.anagram;
    }

    startTimer() {
        if (this.isTimerActive) {
            return;  
        }

        let countdown = 30;
        const timerElement = document.getElementById('startButton');

        const timerInterval = setInterval(() => {
            timerElement.innerText = `Time left: ${countdown}` ;
            countdown--;

            if (countdown < 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                this.isTimerActive = false;  
                timerElement.style.pointerEvents = 'auto'; 
                timerElement.innerText = "You didn't get the word!";
            }
        }, 1000);

        this.isTimerActive = true;  
        timerElement.style.pointerEvents = 'none';
    }

    listenToInput() {
        const submitButton = document.getElementById('checkGuess');
        submitButton.addEventListener('click', () => {
            this.handleGuess();
        });

        const userGuessInput = document.getElementById('userGuess');
        userGuessInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.handleGuess();
            }
        });
    }

    handleGuess() {
        const userGuess = document.getElementById('userGuess').value.trim().toLowerCase();
        const correctAnswer = this.answer.toLowerCase().trim();
    
        if (userGuess === correctAnswer) {
            alert('Congratulations! You got the word!');
            const score = this.countdown;
        } else {
            alert('Oops! That\'s not the correct word. Try again!');
        }
    
        document.getElementById('userGuess').value = '';
    }

    saveScore() {
        const score = document.querySelectorAll('.score');
        localStorage.setItem('items', JSON.stringify(itemsData));
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const game = new DailyConundrum();
    const startButton = document.getElementById('startButton');
    const startGame = () => {
        game.setAnagram();
        game.startTimer();
    }

    startButton.addEventListener('click', () => {startGame()});
});

const clearField = () => {
    const textfield = document.getElementById('userGuess');
    if(textfield.value === 'Type your guess here'){
        textfield.value = '';
    }else{
        return;
    }
  
}

const loadName = () => {
    const storedName = JSON.parse(localStorage.getItem('storedName'));
    if (storedName) {
        const playerName = document.getElementById('playerName');
        playerName.innerText = storedName;
    }
}

window.addEventListener('load', () => {
    loadName();
});