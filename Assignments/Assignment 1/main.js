// Create an object with the excercise and the answer.
const ex = {
    excercise: '',
    answer: 0
}

// Create an object with the stats.
const stats = {
    correct: 0,
    incorrect: 0
}

// Call upon functions to start excercises.
generate();
addKeypress();

// Changes the inner values from the object ex.
function generate() {
    let type = Math.ceil((Math.random()) * 4);
    // Prevent getting 0 out of Math.random().
    type === 0 ? type++ : false;

    let num1 = Math.ceil((Math.random()) * 20);
    let num2 = Math.ceil((Math.random()) * 20);
    
    switch (type) {
        case (1):
            // Addition.
            ex.excercise = num1 + ' + ' + num2;
            ex.answer = num1 + num2;
            break;
        case (2):
            // Substraction. Prevent negative numbers here.
            if (num1 >= num2) {
                ex.excercise = num1 + ' - ' + num2;
                ex.answer = num1 - num2;
                break;
            } else {
                ex.excercise = num2 + ' - ' + num1;
                ex.answer = num2 - num1;
                break;
            }
        case (3):
            // Multiplication.
            ex.excercise = num1 + ' * ' + num2;
            ex.answer = num1 * num2;
            break;
        case (4):
            // Division. Prevent negative numbers here.
            if (num1 >= num2) {
                ex.excercise = num1 + ' / ' + num2;
                ex.answer = num1 / num2;
                break;
            } else {
                ex.excercise = num2 + ' / ' + num1;
                ex.answer = num2 / num1;
                break;
            }
        }

        // Generate a new excercise if the answer has decimals.
        if (!Number.isInteger(ex.answer)) {
            generate();
        }

        document.getElementById('question').innerHTML = ex.excercise;
}

// Add a keypress event for checking the submission.
function addKeypress() {
    let answer = document.getElementById('answer');
    answer.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            val = document.getElementById('answer').value; 
            check(parseInt(val));
            reset();
        }
    });
}

// Checks answer from input. Adds the whole excersise to history.
function check(answer) {
    let correct = answer === ex.answer ? true : false;
    let span = document.createElement('span');
    const br = document.createElement('br');

    // Add properties to the new span element.
    span.innerHTML = ex.excercise + ' = ' + ex.answer;
    span.style.color = correct ? 'green' : 'red';

    // Append history.
    document.getElementById('history').prepend(br);
    document.getElementById('history').prepend(span);

    updateStats(correct);
}

// Update the stats for current session.
function updateStats(bool) {
    bool ? stats.correct++ : stats.incorrect++;
    id = bool ? 'correct' : 'incorrect';
    amount = bool ? stats.correct : stats.incorrect;
    perc = Math.round(stats.correct / (stats.correct + stats.incorrect) * 100);

    // Update DOM.
    document.getElementById(id).innerHTML = amount;
    document.getElementById('percentage').innerHTML = perc;
}

// Reset input and generate a new excersise.
function reset() {
    ex.excercise = '';
    ex.answer = 0;
    generate();
    document.getElementById('answer').value = null;
}