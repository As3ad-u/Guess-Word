// setting game name 
let gameName="Guess The Word";
document.title=gameName;
document.querySelector('h1').innerHTML=gameName;
document.querySelector('footer').innerHTML=`${gameName} Game Created By As3ad`;

// setting game options 

let numberOfTries=6;
let numberOfLetters=6;
let currentTry=1;
let numberOfHints=2;


// generate array of words and random word 

let wordToGuess="";
const words=['Greate','Update','Delete','Master','Branch','Mainly','School','Laptop'];
wordToGuess=words[Math.floor(Math.random()*words.length)].toLowerCase();
let messageArea=document.querySelector(".message");


// manage hints 
document.querySelector('.hint span').innerHTML=numberOfHints;
const getHintButton=document.querySelector('.hint');
getHintButton.addEventListener('click',getHint);


function generateInput(){
    const inputsContainer=document.querySelector('.inputs');
    
    // this line for create tries 

    for(let i=1;i<=numberOfTries;i++){
        const tryDiv=document.createElement('div');
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try ${i}</span>`;
        
        if(i!==1) tryDiv.classList.add('disabled-inputs');


        // this line for create inputs 
        for(let j=1;j<=numberOfLetters;j++){
            const input=document.createElement('input');
            input.type='text';
            input.id=`guess-${i}-letter${j}`;
            input.setAttribute('maxlength',"1");
            tryDiv.appendChild(input);

        }
        inputsContainer.appendChild(tryDiv);
    }

inputsContainer.children[0].children[1].focus();

//disabled allinputs expext first one 
const inputsInDisabledDivs=document.querySelectorAll('.disabled-inputs input');
inputsInDisabledDivs.forEach( input => input.setAttribute('disabled','true') )

//make all letters capital
const inputs=document.querySelectorAll('input');

inputs.forEach((input,index)=>{
    input.addEventListener('input',function(){
        this.value=this.value.toUpperCase();
        const nextInput=inputs[index+1];
        if(nextInput) nextInput.focus();
    });

    input.addEventListener('keydown',function(e){
        // console.log(e); 
        const currentIndex=Array.from(inputs).indexOf(e.target);  //e.target=this
        
        if(e.key==="ArrowRight"){
            const nextInput=currentIndex+1;
            if(nextInput<inputs.length) inputs[nextInput].focus();
        }
        if(e.key==="ArrowLeft"){
            const previousInput=currentIndex-1;
            if(previousInput>=0) inputs[previousInput].focus();
        }
    })
})
}

const guessButton=document.querySelector('.check');

guessButton.addEventListener('click',handleGuesses);
console.log(wordToGuess)

function handleGuesses(){
    let successGuess=true;
    for(let i =1;i<=numberOfLetters;i++){
    const inputField=document.querySelector(`#guess-${currentTry}-letter${i}`);
    const letter=inputField.value.toLowerCase();
    const actualLetter=wordToGuess[i-1];
    //logic
        if(letter==actualLetter){
            inputField.classList.add('yes-in-place');
        }
        else if(wordToGuess.includes(letter)&& letter!==""){
            inputField.classList.add('not-in-place');
            successGuess=false;
        }
        else{
            inputField.classList.add('no');
            successGuess=false;
        }
}

// check if win or lose 

if(successGuess){
    messageArea.innerHTML=`You Win The Word IS <span>${wordToGuess}</span>`;
    
    if(numberOfHints==2){
        messageArea.innerHTML=='<p> Congrate You Didnt Use Hints </p> ';
    }
    //  add disable class to div inside .inputs  
    let tries=document.querySelectorAll('.inputs > div');
    tries.forEach((ele)=>{
        ele.classList.add('disabled-inputs');
    })
    guessButton.setAttribute('disabled','true');
    getHintButton.disabled=true;

}
else{
    document.querySelector(`.try-${currentTry}`).classList.add('disabled-inputs');
    const currentTryInputs=document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach(input=>input.disabled=true)
    
    currentTry++;


    const nextTryInput=document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInput.forEach(input=>input.disabled=false);

    let el=document.querySelector(`.try-${currentTry}`);
    
    if(el){
    document.querySelector(`.try-${currentTry}`).classList.remove('disabled-inputs');
        el.children[1].focus();
    }

    else{
    guessButton.setAttribute('disabled','true');
    getHintButton.disabled=true;
    messageArea.innerHTML=`You Lose The Word IS <span>${wordToGuess}</span>`;
    }
}
}

//hint function

function getHint(){
    if(numberOfHints>0){
        numberOfHints--;
    document.querySelector('.hint span').innerHTML=numberOfHints;

    }
    if(numberOfHints==0){
        document.querySelector('.hint').setAttribute('disabled','true');
    }


    // get enabled inputs only 
    const enabledInputs=document.querySelectorAll(`input:not([disabled])`);
    const emptyEnableInputs=Array.from(enabledInputs).filter(input=>input.value==="");

    // console.log(emptyEnableInputs);
    if(emptyEnableInputs.length>0){
        const randomIndex=Math.floor(Math.random()*emptyEnableInputs.length);
        // console.log(randomIndex)
        const randomInput=emptyEnableInputs[randomIndex];
        // console.log(randomInput);

        const indexToFill=Array.from(enabledInputs).indexOf(randomInput);

        if(indexToFill!==-1){
            randomInput.value=wordToGuess[indexToFill].toUpperCase();
        }
    }

}


let handleBackSpace=function(e){
    if(e.key==="Backspace"){
    const inputs=document.querySelectorAll('input:not([disabled])');
    // console.log(inputs)
    // active input 
    const currentIndex=Array.from(inputs).indexOf(document.activeElement);
    if(currentIndex>0){
        const currentInput=inputs[currentIndex];
        const previousInput=inputs[currentIndex-1];
        currentInput.value="";
        previousInput.value="";
        previousInput.focus();
    }

        // const currentIndex=Array.from(inputs)


    }

}
document.addEventListener('keydown',handleBackSpace);

window.onload= function(){
    generateInput();
}