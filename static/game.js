class DailyConundrum {
    anagramArr = ['willygong','eatenturd','shaginbum'];
    answerArr = ['glowingly','untreated','ambushing'];
    isTimerActive;
    countdown;
    storedScores;
    playerName;

    constructor(){
        let i = Math.floor(Math.random() * this.anagramArr.length);
        this.anagram = this.anagramArr[i];
        this.answer = this.answerArr[i];
        this.listenToInput();
        this.isTimerActive = false;
        this.countdown = 30;
        this.storedScores = this.loadScores();
        this.playerName = this.loadName();
    }
    setAnagram() {
        const anagramElement = document.getElementById('anagram');
        anagramElement.innerText = this.anagram;
    }

    startTimer() {
        if (this.isTimerActive) {
            return;  
        }

        const timerElement = document.getElementById('startButton');

        const timerInterval = setInterval(() => {
            timerElement.innerText = `Time left: ${this.countdown}` ;
            this.countdown--;

            if (this.countdown < 0) {
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
        const scoreElement = document.getElementById('score');
    
        if (userGuess === correctAnswer) {
            alert('Congratulations! You got the word!');
            const score = this.countdown;
            scoreElement.innerText = `Score: ${score}`;
            this.saveScore(this.playerName, score);
        } else {
            alert('Oops! That\'s not the correct word. Try again!');
        }
    
        document.getElementById('userGuess').value = '';
    }

    saveScore(playerName, score) {
        this.storedScores.push({ name: playerName, score: score });
        localStorage.setItem('scores', JSON.stringify(this.storedScores));
    }

    loadScores() {
        return JSON.parse(localStorage.getItem('scores')) || [];
    }
    
    loadName() {
        const storedName = JSON.parse(localStorage.getItem('storedName'));
        if (storedName) {
            const playerName = document.getElementById('playerName');
            playerName.innerText = storedName;
            return playerName.innerText;
        }
        
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


