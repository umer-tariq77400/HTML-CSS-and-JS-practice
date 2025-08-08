/************************************************************
 * WORKING CALCULATOR 
 * Supports: digits, ., + - × ÷, clear (C), delete (Del), Ans recall, =
 ************************************************************/

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');     // digits + '.'
const operatorButtons = document.querySelectorAll('.sign-btn'); // + - × ÷
const delButtons = document.querySelectorAll('.del-btn');       // C and Del
const equalsButton = document.querySelector('.equal-btn');
const ansButton = document.querySelector('.ans-btn');

let expression = '0';
let lastResult = null;
let overwrite = false;

updateDisplay();

/* --- Event bindings --- */
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => handleNumber(btn.textContent.trim()));
});
operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => handleOperator(btn.textContent.trim()));
});
delButtons.forEach(btn => {
    const label = btn.textContent.trim();
    if (label === 'C') btn.addEventListener('click', handleClearAll);
    else if (label === 'Del') btn.addEventListener('click', handleBackspace);
});
equalsButton.addEventListener('click', handleEquals);
ansButton.addEventListener('click', handleAnswerRecall);

/* Optional keyboard support */
document.addEventListener('keydown', e => {
    const k = e.key;
    // Prevent native input so we don't get double characters
    if (/^[0-9]$/.test(k)) { e.preventDefault(); handleNumber(k); }
    else if (k === '.') { e.preventDefault(); handleNumber('.'); }
    else if (['+', '-', '*', '/'].includes(k)) { e.preventDefault(); handleOperator(k); }
    else if (k === 'Enter' || k === '=') { e.preventDefault(); handleEquals(); }
    else if (k === 'Backspace') { e.preventDefault(); handleBackspace(); }
    else if (k === 'Escape') { e.preventDefault(); handleClearAll(); }
});

/* --- Handlers --- */
function handleNumber(d) {
    if (overwrite || expression === 'Error') {
        expression = (d === '.') ? '0.' : d;
        overwrite = false;
        return updateDisplay();
    }

    if (d === '.') {
        const seg = currentSegment();
        if (seg.includes('.')) return; // prevent second decimal in segment
        if (/[^0-9]$/.test(expression)) {
            expression += '0.'; // operator followed by '.'
        } else if (expression === '0') {
            expression = '0.';  // starting with decimal
        } else {
            expression += '.';
        }
        return updateDisplay();
    }

    if (expression === '0') {
        expression = d;
    } else {
        expression += d;
    }
    overwrite = false;
    updateDisplay();
}

function handleOperator(opRaw) {
    if (expression === 'Error') expression = '0';
    const op = opRaw === '×' ? '*' : opRaw === '÷' ? '/' : opRaw;

    if (overwrite) overwrite = false;

    if (/[+\-*/]$/.test(expression)) {
        expression = expression.slice(0, -1) + op; // replace last operator
    } else {
        expression += op;
    }
    updateDisplay();
}

function handleClearAll() {
    expression = '0';
    overwrite = false;
    updateDisplay();
}

function handleBackspace() {
    if (overwrite || expression === 'Error') {
        expression = '0';
        overwrite = false;
    } else {
        expression = expression.slice(0, -1) || '0';
    }
    updateDisplay();
}

function handleAnswerRecall() {
    if (lastResult !== null) {
        expression = String(lastResult);
        overwrite = true;
        updateDisplay();
    }
}

function handleEquals() {
    if (/[+\-*/]$/.test(expression)) {
        // trim trailing operator(s)
        expression = expression.replace(/([+\-*/])+$/,'');
    }
    evaluateExpression();
}

/* --- Core evaluation --- */
function evaluateExpression() {
    const sanitized = expression.replace(/[^0-9+\-*/.]/g, '');
    if (!sanitized) {
        expression = '0';
        return updateDisplay();
    }
    try {
        // eslint-disable-next-line no-eval
        let result = eval(sanitized);
        if (!isFinite(result)) {
            expression = 'Error';
        } else {
            // Normalize very long / floating outputs
            if (typeof result === 'number') {
                const asStr = String(result);
                expression = (asStr.length > 14)
                    ? Number(result.toPrecision(12)).toString()
                    : asStr;
            } else {
                expression = String(result);
            }
            lastResult = expression;
        }
    } catch {
        expression = 'Error';
    }
    overwrite = true;
    updateDisplay();
}

/* --- Helpers --- */
function currentSegment() {
    // part after the last operator
    const parts = expression.split(/([+\-*/])/);
    return parts[parts.length - 1];
}

function updateDisplay() {
    display.value = expression;
}
