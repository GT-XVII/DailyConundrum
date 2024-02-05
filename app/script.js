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

const startTimer = () => {
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
        }
    }, 1000);

    isTimerActive = true;  
    timerElement.style.pointerEvents = 'none';
}
