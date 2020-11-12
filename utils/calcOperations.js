import {factorial} from "mathjs";


const calculate = (operation, value, state) => {
    switch (operation) {
        case "digit":
            return handleDigits(value, state)
        case "AC":
            return handleAC()
        case "sign":
            return handleSign(state)
        case "comma":
            return handleComma(state)
        case "operator":
            return handleOp(value, state)
        case "port":
            return portCalc(state)
        case "land":
            return landCalc(value, state)
    }
}
export default calculate

const handleAC = () => {
    return {
        result: 0,
        part: '',
        operation: ''
    }
}

const handleDigits = (digit, state) => {
    if (state.result === 0 || state.result === "0") {
        return {result: digit}
    } else {
        return {result: state.result.toString() + digit}
    }
}

const handleComma = (state) => {
    let display = state.result.toString();
    if (!display.includes(".")) {
        return {result: display + '.'}
    } else if (display[display.length - 1] === '.') {
        return {result: display.substring(0, state.result.length - 1)}
    }
}

const handleSign = (state) => {
    let sign = parseFloat(state.result);
    return {result: -sign}
}

const handleOp = (op, state) => {
    let previous = parseFloat(state.result);
    if (state.operation === '') {
        return {result: 0, part: previous, operation: op}
    } else {
        return {operation: op}
    }
}

const portCalc = (state) => {
    let outcome;
    const {operation, result, part} = state;
    if (operation !== '') {
        switch (operation) {
            case '+':
                outcome = parseFloat(result) + part;
                break;
            case '-':
                outcome = part - parseFloat(result);
                break;
            case '*':
                outcome = parseFloat(result) * part;
                break;
            case '/':
                if (parseFloat(result) === 0) {
                    console.log("Dzielenie przez 0");
                    return;
                } else {
                    outcome = part / parseFloat(result);
                }
                break;
            case 'sqrt':
                if (parseFloat(part) < 0) {
                    console.log("Pieriwastek z liczby ujemnej");
                    return;
                } else {
                    outcome = Math.pow(part, 1 / result);
                }
                break;
        }
        return{result: outcome, second: 0, operation: ''}
    }
}


const landCalc = (op, state) => {
    let outcome;
    const {result, part, operation} = state;
    switch (op) {
        case 'x2':
            outcome = Math.pow(result, 2);
            break;
        case 'x3':
            outcome = Math.pow(result, 3);
            break;
        case 'ex':
            outcome = Math.E * result;
            break;
        case 'ln':
            if (result <= 0) {
                console.log("Logarytm z niedodatniej");
                return;
            } else {
                outcome = Math.log(result);
            }
            break;
        case 'e':
            outcome = Math.E;
            break;
        case 'pi':
            outcome = Math.PI.toPrecision(14);
            break;
        case 'x!':
            if (result <= 0) {
                console.log("Silnia z niedodatniej");
                return;
            } else {
                outcome = factorial(result);
            }
            break;
        case '10x':
            outcome = Math.pow(10, result);
            break;
        case 'log10':
            if (result <= 0) {
                console.log("Logarytm z niedodatniej");
                return;
            } else {
                outcome = Math.log10(result);
            }
            break;
        case '%':
            if (operation === "*" || operation === "/") {
                outcome = result / 100;
            } else {
                outcome = (part * result) / 100;
            }
    }
    return{result: outcome};
}