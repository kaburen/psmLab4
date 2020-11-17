import {evaluate} from "mathjs";


const calculate = (operation, value, state) => {
    switch (operation) {
        case "digit":
            return handleDigits(value, state)
        case "eval":
            return evalExpression(state)
        case "operator":
            return handleOp(value, state)
        case "land":
            return landCalc(value, state)
        case "backspace":
            return handleBack(state)
        case "comma":
            return handleComma(state)
        case "AC":
            return handleAC()
        case "bracket":
            return handleBrackets(value, state)
    }
}
export default calculate

const signs = ['+', '-', '/', '*', '(', '^'];

const handleAC = () => {
    return {

        result: '0',
        part: '',
        operation: false
    }
}

const evalExpression = (state) => {
    try {
        if(!JSON.stringify(evaluate(state.result.toString())).startsWith("{")) {
            return validateBrackets(state) && validateExpression(state) && {
                result: evaluate(state.result.toString()), part: '', operation: false
            }
        }else {
            return {result: '', part: '', operation: false, isError: true, errMess: "Wrong input"}
        }
    } catch (e) {
        return {result: '', part: '', operation: false, isError: true, errMess: e.message}
    }
}

const validateExpression = (state) => {
    return !signs.includes(state.result.toString().slice(-1));

}

const validateBrackets = (state) => {
    let opened = true;

    Array.from(state.result).map(value => {
        if (value === '(') {
            opened = false
        }
        if (value === ')') {
            opened = true
        }
    })
    return opened
}

const handleBrackets = (bracket, state) => {
    const {result} = state
    if (state.result === 0 || state.result === "0") {
        if (validateBrackets(state) && bracket === '(') {
            return {result: bracket, part: bracket, operation: false}
        }
    } else {
        if (!validateBrackets(state) && bracket === ')' && !signs.includes(state.result.toString().slice(-1))) {
            return {result: result.toString() + bracket, part: state.part.toString() + bracket, operation: false}
        } else if (validateBrackets(state) && bracket === '(') {
            return {result: result.toString() + bracket, part: state.part.toString() + bracket, operation: false}
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
    const {part} = state
    let result = state.result.toString()
    if (!part.includes(".") && result !== '' && !signs.includes(result.slice(-1))) {
        return {result: result + '.', part: part + '.'}
    }
}

const handleBack = (state) => {
    const {part} = state
    let result = state.result.toString()
    let op = state.operation
    if (!['+', '-', '/', '*', '^'].includes(result.slice(-2, -1))) {
        op = false
    } else if (['+', '-', '/', '*', '^'].includes(result.slice(-2, -1))) {
        op = true
    }
    return {result: result.substring(0, result.length - 1), part: part.substring(0, part.length - 1), operation: op}
}

const handleOp = (op, state) => {
    if (state.operation === false) {
        return {result: state.result.toString() + op, part: '', operation: true}

    } else {
        return {result: state.result.toString().substring(0, state.result.length - 1) + op, part: ''}
    }
}
const landCalc = (op, state) => {
    let outcome;
    try {
        let result = (validateExpression(state) && validateBrackets(state) && evaluate(state.result))

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
        return {result: outcome.toString(), part: '', operation: false}
    } catch (e) {
        return {result: '', part: '', operation: false, isError: true, errMess: e.message}
    }
}