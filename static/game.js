class DailyConundrum {
    wordArr;
    wordsPlayed;
    isTimerActive;
    countdown;
    storedScores;
    playerName;
    score;
    

    constructor(){
        this.wordArr = [
            'glowingly','untreated','ambushing','paparazzi','embezzled','frustrate',
            'untwisted','suffering','mightiest','flickered','pointless','bothering',
            'postponed','itchyness','positions','provinces','rebooting','quickened',
            'insurance','righteous','answering','waterfall','dragonfly','fractured',
            'ducklings','godparent','proposing','dangerous','ponytails','dentistry',
            'megawatts','battering','numbering','pendulums','thrusting','downstage'
        ];
        this.wordsPlayed = [];
        this.word = this.setWord();
        this.isTimerActive = false;
        this.countdown = 60;
        this.storedScores = this.loadScores();
        this.playerName = this.loadName();
        this.score = 0;

        this.listenToInput();
    }

    setWord() {
        const i = Math.floor(Math.random()*(this.wordArr.length-1));
        const word = this.wordArr[i];
        if(this.wordsPlayed.length === this.wordArr.length){
            this.countdown = -1;
        }
        if(this.wordsPlayed.includes(word)){
            console.log('ping');
            this.setWord();
        }
        return word
    }

    storeWordPlayed() {
        this.wordsPlayed.push(this.word);
        console.log(this.wordsPlayed);
    }

    showAnagram() {
        const anagram = document.getElementById('anagram');
        const wordArr = this.word.split('');
        for(let i = wordArr.length; i > 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            
            const temp = wordArr[i];
            wordArr[i] = wordArr[j];
            wordArr[j] = temp;
        }
        anagram.innerText = wordArr.join('');
    }

    showRightAnswer() {
        const anagram = document.getElementById('anagram');
        anagram.innerHTML = `The right answer was: ${this.word}`;
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
                this.isTimerActive = false;  
                timerElement.style.pointerEvents = 'auto';
                timerElement.innerText = "Restart the game";
                this.showRightAnswer();
                this.saveScore(this.playerName, this.score);
            }
        }, 1000);

        this.isTimerActive = true;  
        timerElement.style.pointerEvents = 'none';
    }

    listenToInput() {
        const submitButton = document.getElementById('checkGuess');
        submitButton.addEventListener('click', () => {
            if(this.countdown >= 0){
                this.handleGuess();
            }else{
                return;
            }
                
        });

        const userGuessInput = document.getElementById('userGuess');
        userGuessInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                if(this.countdown >= 0){
                    this.handleGuess();
                }else{
                    return;
                }
            }
        });
    }

    handleGuess() {
        const userGuess = document.getElementById('userGuess').value.trim().toLowerCase();
        const correctAnswer = this.word.toLowerCase().trim();
        const scoreElement = document.getElementById('score');
    
        if (userGuess === correctAnswer) {
            this.score += this.countdown;
            scoreElement.innerText = `Score: ${this.score}`;
            this.countdown = 60;
            this.storeWordPlayed();
            this.word = this.setWord();
            this.showAnagram();
        }
    
        document.getElementById('userGuess').value = '';
    }

    saveScore(playerName, score) {
        if(score > 0){
        this.storedScores.push({ name: playerName, score: score });
        localStorage.setItem('scores', JSON.stringify(this.storedScores));
        }
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

    startGame() {
        this.startTimer();
        this.wordsPlayed = [];
        this.countdown = 60;
        this.word = this.setWord();
        this.showAnagram();
        this.score = 0;
        const scoreElement = document.getElementById('score');
        scoreElement.innerHTML = `Score: ${this.score}`;
    }  
}


document.addEventListener('DOMContentLoaded', function () {
    const game = new DailyConundrum();
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {game.startGame();});
});

const clearField = () => {
    const textfield = document.getElementById('userGuess');
    if(textfield.value === 'Type your guess here'){
        textfield.value = '';
    }else{
        return;
    }
  
}