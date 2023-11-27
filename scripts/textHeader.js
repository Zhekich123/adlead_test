'use strict';

const screenWidth = window.innerWidth;
const headerText = document.querySelector('.header_text');

if (screenWidth <=500) {
    headerText.innerHTML = 'Free GB <br/> for you'
} else {
    headerText.innerHTML = 'Free GB for you'
}