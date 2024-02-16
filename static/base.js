const showRules = () => {
    const blur = document.getElementById('blur');
    const body = document.body;
    
    if (blur.style.width === '' || blur.style.width === '0px' || blur.style.width === '0') {
        blur.style.width = '100vw';
        blur.style.height = '100vh';
        blur.style.padding = '10%';

        body.style.overflow = 'hidden';

        blur.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {    
        blur.style.width = '0px';
        blur.style.height = '0px';
        blur.style.padding = '';

        body.style.overflow = 'auto';
    }
}

class titleAnimation {
    title;
    titleDisplayed;
    constructor() {
        this.title = "Welcome to Daily Conundrum";
        this.titleDisplayed = '';
    }

    shuffleAndUnshuffle() {
        let i = 100;
        let correct = true;
        this.titleDisplayed = this.title;
        const headerH1Element = document.getElementById('headerH1');
        setInterval(()=>{
            if(i>=100){
                i++
                if(i>200){
                    i=this.title.length;
                }
            }
            if(correct && i <= this.title.length){
                const titleDisplayedArr = this.titleDisplayed.split('');
                const s = Math.floor(Math.random()*(i+1));
                const temp = titleDisplayedArr[i];
                titleDisplayedArr[i] = titleDisplayedArr[s];
                titleDisplayedArr[s] = temp;
                i--
                this.titleDisplayed = titleDisplayedArr.join('');
                headerH1Element.innerText = this.titleDisplayed;
                if(i < 0){
                    correct = false;
                    i = 0;
                }
            }else{
                const targetIndex = this.titleDisplayed.indexOf(this.title[i], i);
                const DisplayedTitleArr = this.titleDisplayed.split('');
                const temp = DisplayedTitleArr[i];
                DisplayedTitleArr[i] = DisplayedTitleArr[targetIndex];
                DisplayedTitleArr[targetIndex] = temp;
                this.titleDisplayed = DisplayedTitleArr.join('');
                headerH1Element.innerText = this.titleDisplayed;
                i++;
                if (i % 70 === 0 && correct === false) {
                    i = this.title.length;
                    correct = true;
                }
            }
        }, 250);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const titleAni = new titleAnimation();
    titleAni.shuffleAndUnshuffle();
})