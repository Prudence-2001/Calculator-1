const display = document.getElementById('display');
const historyList = document.getElementById('historyList');

// Add values
function appendValue(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = '';
}

// Calculate
function calculate() {

    if (display.value === '') {
        return;
    }

    try {

        let expression = display.value;

        // Replace x with *
        expression = expression.replace(/x/g, '*');

        // Solve expression
        const result = Function('"use strict"; return (' + expression + ')')();

        // Add to history
        historyList.innerHTML += `
            <li>${display.value} = ${result}</li>
        `;

        // Display result
        display.value = result;

    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard Support
document.addEventListener('keydown', function (e) {

    const key = e.key;

    // Numbers and operators
    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
        appendValue(key);
    }

    // Enter
    else if (key === 'Enter' || key === '=') {
        calculate();
    }

    // Backspace
    else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }

    // Escape
    else if (key === 'Escape') {
        clearDisplay();
    }
});

// Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle('dark');
}