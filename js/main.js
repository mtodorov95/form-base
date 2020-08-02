const questions = [
    {question: 'Enter your username'},
    {question: 'Enter your email', pattern: /\S+@\S+\.\S+/},
    {question: 'Enter your password', type: 'password'},
];

// transition duration
const shakeTime = 100;
const switchTime = 200;

// start position
let position = 0;


const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progressBar = document.querySelector('#progress-bar');


document.addEventListener('DOMContentLoaded', getQuestion);
nextBtn.addEventListener('click', validate);
inputField.addEventListener('keyup', e => {
    if (e.keyCode == 13){
        validate();
    }
})


function getQuestion(){
    inputLabel.innerHTML = questions[position].question;
    inputField.type = questions[position].type || 'text';
    inputField.value = questions[position].answer || '';
    inputField.focus();
    // progress bar width
    progressBar.style.width = (position *100) / questions.length + '%';

    // show user icon on first q
    prevBtn.className = position ? 'fas fa-arrow-left': 'fas fa-user';
    showQuestion();
}


function showQuestion(){
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}


function hideQuestion(){
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = '';
    inputGroup.style.border = null;
}


function transform(x,y){
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}


function validate(){
    // correct email & empty check
    if (!inputField.value.match(questions[position].pattern || /.+/)){
        inputFail();
    }else{
        inputPass();
    }
}


function inputFail(){
    formBox.className = 'error';
    for (let i =0;i < 6;i++){
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 -1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}


function inputPass(){
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);
    // save answer
    questions[position].answer = inputField.value;
    position++;
    // get next question
    if (questions[position]){
        hideQuestion();
        getQuestion();
    }else{
        // close and finish
        hideQuestion();
        formBox.className = 'close';
        progressBar.style.width = '100%';
        formComplete();
    }
}


function formComplete(){
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer}. Registration successful. Check your email.`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(()=> h1.style.opacity = 1, 50);
    }, 1000);
}