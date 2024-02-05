const showRules = () => {
    const blur = document.getElementById('blur');
    const body = document.body;
    
    if (blur.style.width === '' || blur.style.width === '0px' || blur.style.width === '0') {
        blur.style.width = '100vw';
        blur.style.height = '100vh';
        blur.style.padding = '10%'

        body.style.overflow = 'hidden';

        blur.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        blur.style.width = '0px';
        blur.style.height = '0px';
        blur.style.padding = '';

        body.style.overflow = 'auto';
    }
    
    console.log('button pressed');
}

let isTimerActive = false;

class DailyConundrum {
    anagramArr = ['willygong','eatenturd','shaginbum'];
    answerArr = ['glowingly','untreated','ambushing'];

    constructor(){
        let i = Math.floor(Math.random() * this.anagramArr.length);
        this.anagram = this.anagramArr[i];
        this.answer = this.answerArr[i];
        this.listenToInput();
    }

    setAnagram() {
        const anagramElement = document.getElementById('anagram');
        anagramElement.innerText = this.anagram;
    }

    startTimer() {
        if (isTimerActive) {
            return;  
        }

        let countdown = 30;
        const timerElement = document.getElementById('timer');

        const timerInterval = setInterval(() => {
            timerElement.innerText = `Time left: ${countdown}` ;
            countdown--;

            if (countdown < 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                isTimerActive = false;  
                timerElement.style.pointerEvents = 'auto'; 
                timerElement.innerText = "You didn't get the word!" 
            }
        }, 1000);

        isTimerActive = true;  
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
        const userGuess = document.getElementById('userGuess').value.toLowerCase();

        if (userGuess === this.answer.toLowerCase()) {
            alert('Congratulations! You got the word!');
            // Additional actions for a correct answer, such as updating score or moving to the next level
        } else {
            alert('Oops! That\'s not the correct word. Try again!');
            // Additional actions for an incorrect answer, such as deducting points or giving another chance
        }

        // Reset the input field and start a new game (if needed)
        document.getElementById('userGuess').value = '';
        this.setAnagram();
        this.startTimer();
    }
}


const startGame = () => {
    const game = new DailyConundrum();
    game.setAnagram();
    game.startTimer();
}


const clearField = () => {
    const textfield = document.getElementById('userGuess');
    if(textfield.value === 'Type your guess here'){
        textfield.value = '';
    }else{
        return;
    }
  
}