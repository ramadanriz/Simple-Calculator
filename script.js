const calculator = {
    displayNumber : "0",
    operator : null,
    firstNumber : null,
    waitingForSecondNumber : false
}

function updateDisplay(){
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator(){
    calculator.displayNumber = "0";
    calculator.operator = null,
    calculator.firstNumber = null,
    calculator.waitingForSecondNumber = false
}

function inputDigit(digit){
    if(calculator.displayNumber === "0"){
        calculator.displayNumber = digit;
    } else{
        calculator.displayNumber += digit;
    }
}

function inverseNumber(){
    if(calculator.displayNumber === "0"){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator){
    if(!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.firstNumber = calculator.displayNumber;
        calculator.waitingForSecondNumber = true;
        calculator.displayNumber = "0";
    } else{
        alert("operator telah ditetapkan!");
    }
}

function performCalculator(){
    if(calculator.firstNumber == null || calculator.operator == null){
        alert("anda belum menetapkan operator!");
    } 
    
    let result = 0;
    if(calculator.operator === "+"){
        result = parseFloat(calculator.firstNumber) + parseFloat(calculator.displayNumber);
    } else if(calculator.operator === "-"){
        result = parseFloat(calculator.firstNumber) - parseFloat(calculator.displayNumber);
    } else if(calculator.operator === "*"){
        result = parseFloat(calculator.firstNumber) * parseFloat(calculator.displayNumber);
    } else if(calculator.operator === "/"){
        result = parseFloat(calculator.firstNumber) / parseFloat(calculator.displayNumber);
    } else if(calculator.operator === "%"){
        result = parseFloat(calculator.firstNumber) % parseFloat(calculator.displayNumber);
    }

    const history = {
        firstNumber : calculator.firstNumber,
        secondNumber : calculator.displayNumber,
        operator : calculator.operator,
        result : result
    }

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

const buttons = document.querySelectorAll('.button');
for (let button of buttons) {
    button.addEventListener("click",function(event){

        const target = event.target;
        console.log(target);

        if(target.classList.contains("clear")){
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains("negative")){
            inverseNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains("operator")){
            handleOperator(target.innerText);
            return;
        }

        if(target.classList.contains("equals")){
            performCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains("hapus-history")){
            deleteHistory();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    })
}