import {evaluate} from "mathjs";


const calculate = (operation, value, state) => {
    switch (operation) {
        case "digit":
            return handleDigits(value, state)
        case "AC":
            return handleAC()
        case "backspace":
            return handleBack(state)
        case "comma":
            return handleComma(state)
        case "operator":
            return handleOp(value, state)
        case "land":
            return landCalc(value, state)
        case "eval":
            return evalExpression(state)
        case "bracket":
            return handleBrackets(value, state)
    }
}
export default calculate

const handleAC = () => {
    return {
        result: '0',
        part: '',
        operation: false
    }
}

const evalExpression = (state) => {
    return validateExpression(state) && {result: evaluate(state.result.toString()), part: '', operation: false}
}

const validateExpression = (state) => {
    let signsArr = ['+', '-', '/', '*', '('];
    return !signsArr.includes(state.result.toString().slice(-1));

}

const validateBrackets = (state) => {
    let opened = true;
    for (let i = 0; i < state.result.length; i++) {
        if (state.result.charAt(i) === '(') {
            opened = false
        }
        if (state.result.charAt(i) === ')') {
            opened = true
        }
    }
    return opened
}

const handleBrackets = (bracket, state) => {
    const {result} = state
    if (state.result === 0 || state.result === "0") {
        if (validateBrackets(state) && bracket === '(') {
            return {result: bracket, part: bracket, operation: false}
        }
    } else {
        if (!validateBrackets(state) && bracket === ')' && state.result.toString().slice(-1) !== '(') {
            return {result: result.toString() + bracket, part: result.toString() + bracket, operation: false}
        } else if (validateBrackets(state) && bracket === '(') {
            return {result: result.toString() + bracket, part: result.toString() + bracket, operation: false}
        }
    }
}

const handleDigits = (digit, state) => {
    if (state.result === 0 || state.result === "0") {
        return {result: digit.toString(), part: digit.toString()}
    } else {
        return {result: state.result.toString() + digit, part: state.part.toString() + digit, operation: false}
    }
}

const handleComma = (state) => {
    const {result, part} = state
    if (!part.includes(".") && result !== '') {
        return {result: result + '.', part: part + '.'}
    }
}

const handleBack = (state) => {
    const {part} = state
    let result = state.result.toString()
    let op = state.operation
    if (!['+', '-', '/', '*'].includes(result.slice(-2, -1))) {
        op = false//TODO rozjebałem
        console.log("chuj")
    }else if(['+', '-', '/', '*'].includes(result.slice(-2, -1))){
        console.log("pizda")
        op = true
    }
    return {result: result.substring(0, result.length - 1), part: part.substring(0, part.length - 1) ,operation:op}
}

const handleOp = (op, state) => {
    if (state.operation === false) {
        return {result: state.result.toString() + op, part: '', operation: true}

    } else {
        return {result: state.result.toString().substring(0, state.result.length - 1) + op, part: ''}
    }
}
const landCalc = (op, state) => {
    let outcome;//TODO działa . działaja operacje tak o, dziala usuwanie, zabezpieczenia z () jakies sa, usuwanie pojedyncze sprawdza czy operacja usunieta, pi, e
    let result = (validateExpression(state) && evaluate(state.result))
    switch (op) {
        case 'ex':
            outcome = Math.pow(Math.E, result)
            break
        case 'ln':
            if (result <= 0) {
                console.log("Logarytm z niedodatniej")
                return
            } else {
                outcome = Math.log(parseFloat(result))
            }
            break
        case 'log10':
            if (result <= 0) {
                console.log("Logarytm z niedodatniej")
                return
            } else {
                outcome = Math.log10(result);
            }
    }
    return {result: outcome, part: '', operation: false}
}