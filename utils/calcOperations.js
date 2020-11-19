import {evaluate} from "mathjs";


const calculate = (operation, value, state) => {
    switch (operation) {
        case "digit":
            return handleDigits(value, state)
        case "eval":
            return evalExpression(state)
        case "operator":
            return handleOp(value, state)
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
        return !validateBrackets(state) && validateExpression(state) && {
            result: evaluate(state.result.toString()).toString(), part: '', operation: false
        }

    } catch (e) {
        return {result: '', part: '', operation: false, isError: true, errMess: e.message}
    }
}

const validateExpression = (state) => {
    return !signs.includes(state.result.toString().slice(-1));

}
const validateBrackets = (state) => {
    let op = 0;
    let cl = 0;

    Array.from(state.result).map(value => {
        if (value === '(') {
            op++;
        }
        if (value === ')') {
            cl++;
        }
    })

    return op > cl
}

const handleBrackets = (bracket, state) => {
    const {result} = state
    if (state.result === 0 || state.result === "0") {
        if (bracket === '(') {
            return {result: bracket, part: bracket, operation: false}
        }
    } else {
        if (validateBrackets(state) && bracket === ')' && !['+', '-', '/', '*', '^'].includes(state.result.toString().slice(-1))) {
            return {result: result.toString() + bracket, part: state.part.toString() + bracket, operation: false}
        } else if (bracket === '(') {
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

