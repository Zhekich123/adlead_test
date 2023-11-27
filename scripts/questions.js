'use strict';

let isOver18 = false;
const disclaimer = document.querySelector('.question_disclaimer');
const buttonStart = document.querySelector('.question_button-start');
const question = document.querySelector('.question_text');
const questionButtons = document.querySelector('.question_buttons');
const yes = document.querySelector('.button_yes');
const no = document.querySelector('.button_no');
const congratsText = document.querySelector('.question_congrats-text');
const counter = document.querySelector('.question_body-counter');
const continueButton = document.querySelector('.question_button-continue');

let intervalId;
let durationInSeconds = 4 * 60 + 45;

// Counter
function startTimer() {
    let minutesElement = document.querySelector('.counter_minutes');
    let secondsElement = document.querySelector('.counter_seconds');

    let timer = durationInSeconds;
    let minutes, seconds;

    intervalId = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);

        if (--timer < 0) {
            clearInterval(intervalId);
            resetTimer();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(intervalId);
    durationInSeconds = 4 * 60 + 45; 
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

// questions & answers
function positiveAnswer() {
    if (!isOver18) {
        question.textContent = 'Are you over 18 years old?';
        isOver18 = true;
    } else {
        question.textContent = 'Congratulations!';
        question.style.marginTop = '60px';
        congratsText.classList.add('active');
        counter.classList.remove('active');
        questionButtons.classList.remove('active');
        continueButton.classList.add('active');
    }
}

function negativeAnswer() {
    buttonStart.classList.remove('inactive');
    counter.classList.remove('active');
    questionButtons.classList.remove('active');
    disclaimer.classList.remove('inactive');
    question.textContent = 'Answer two short questions to receive your gift!';
    yes.removeEventListener('click', positiveAnswer);
    resetTimer();
}

function continueToHome() {
    buttonStart.classList.remove('inactive');
    counter.classList.remove('active');
    questionButtons.classList.remove('active');
    disclaimer.classList.remove('inactive');
    question.textContent = 'Answer two short questions to receive your gift!';
    continueButton.classList.remove('active');
    congratsText.classList.remove('active');
    question.style.marginTop = '';
    isOver18 = false;
    yes.removeEventListener('click', positiveAnswer);
    no.removeEventListener('click', negativeAnswer);
    resetTimer();
}

buttonStart.addEventListener('click', () => {
    startTimer();
    buttonStart.classList.add('inactive');
    counter.classList.add('active');
    questionButtons.classList.add('active');
    disclaimer.classList.add('inactive');
    question.textContent = 'Do you use the Internet often?';

    if (yes) {
        yes.addEventListener('click', positiveAnswer);
    }

    continueButton.addEventListener('click', continueToHome);

    no.addEventListener('click', negativeAnswer);
});
