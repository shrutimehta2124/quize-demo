const questions = [
    {
        "question": "What does HTML stand for?",
        "options": ["A) Hyper Transfer Markup Language", "B) Hyper Text Markup Language", "C) High Text Machine Language", "D) Hyperlink and Text Markup Language"],
        "answer": "B) Hyper Text Markup Language"
    },
    {
        "question": "Which HTML tag is used to create a hyperlink?",
        "options": ["A) <link>", "B) <a>", "C) <href>", "D) <nav>"],
        "answer": "B) <a>"
    },
    {
        "question": "Which HTML element is used to define the title of a document?",
        "options": ["A) <meta>", "B) <head>", "C) <title>", "D) <header>"],
        "answer": "C) <title>"
    },
    {
        "question": "What is the correct HTML tag for inserting a line break?",
        "options": ["A) <br>", "B) <lb>", "C) <break>", "D) <nl>"],
        "answer": "A) <br>"
    },
    {
        "question": "Which attribute is used to specify the source of an image in HTML?",
        "options": ["A) src", "B) href", "C) alt", "D) img"],
        "answer": "A) src"
    },
    {
        "question": "What does CSS stand for?",
        "options": ["A) Creative Style Sheets", "B) Cascading Style Sheets", "C) Computer Style Sheets", "D) Colorful Style Sheets"],
        "answer": "B) Cascading Style Sheets"
    },
    {
        "question": "How do you apply an external CSS file to an HTML document?",
        "options": ["A) <style src='styles.css'>", "B) <link rel='stylesheet' href='styles.css'>", "C) <css href='styles.css'>", "D) <script src='styles.css'>"],
        "answer": "B) <link rel='stylesheet' href='styles.css'>"
    },
    {
        "question": "Which property is used to change the background color in CSS?",
        "options": ["A) color", "B) background-color", "C) bgcolor", "D) background"],
        "answer": "B) background-color"
    },
    {
        "question": "How do you make a text bold using CSS?",
        "options": ["A) font-weight: bold;", "B) text-bold: true;", "C) style: bold;", "D) text-weight: bold;"],
        "answer": "A) font-weight: bold;"
    },
    {
        "question": "What is the default position of an HTML element?",
        "options": ["A) relative", "B) fixed", "C) absolute", "D) static"],
        "answer": "D) static"
    },
    {
        "question": "Which keyword is used to declare a variable in JavaScript?",
        "options": ["A) var", "B) let", "C) const", "D) All of the above"],
        "answer": "D) All of the above"
    },
    {
        "question": "How do you write 'Hello, World!' in an alert box?",
        "options": ["A) msg('Hello, World!');", "B) alert('Hello, World!');", "C) prompt('Hello, World!');", "D) message('Hello, World!');"],
        "answer": "B) alert('Hello, World!');"
    },
    {
        "question": "Which symbol is used for single-line comments in JavaScript?",
        "options": ["A) //", "B) /* */", "C) #", "D) --"],
        "answer": "A) //"
    },
    {
        "question": "What is the output of typeof(null) in JavaScript?",
        "options": ["A) null", "B) undefined", "C) object", "D) string"],
        "answer": "C) object"
    },
    {
        "question": "Which function is used to convert a string to an integer in JavaScript?",
        "options": ["A) parseInt()", "B) toInteger()", "C) parseNumber()", "D) intConvert()"],
        "answer": "A) parseInt()"
    },
    {
        "question": "Which event occurs when the user clicks on an HTML element?",
        "options": ["A) onhover", "B) onmouseclick", "C) onclick", "D) onpress"],
        "answer": "C) onclick"
    },
    {
        "question": "Which of the following is NOT a valid CSS unit?",
        "options": ["A) px", "B) em", "C) cm", "D) dp"],
        "answer": "D) dp"
    },
    {
        "question": "How can you center a div using CSS flexbox?",
        "options": ["A) align: center;", "B) display: flex; justify-content: center; align-items: center;", "C) center: flex;", "D) flex: center;"],
        "answer": "B) display: flex; justify-content: center; align-items: center;"
    },
    {
        "question": "How do you select an element with id 'myID' in CSS?",
        "options": ["A) #myID", "B) .myID", "C) id=myID", "D) element(myID)"],
        "answer": "A) #myID"
    },
    {
        "question": "What will console.log(2 + '2') output in JavaScript?",
        "options": ["A) 4", "B) 22", "C) NaN", "D) TypeError"],
        "answer": "B) 22"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let skipped = 0;
let timer;
let timeRemaining = 10;
let userResponses = [];

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Start Quiz
document.getElementById("start-quiz-button").onclick = startQuiz;

function startQuiz() {
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    skipped = 0;
    userResponses = [];

    // Shuffle questions every time the quiz starts
    shuffleArray(questions);

    loadQuestion();
}

// Load Question
function loadQuestion() {
    document.getElementById("current-question-number").textContent = currentQuestionIndex + 1;
    if (currentQuestionIndex === 0) {
        document.getElementById("total-questions-number").textContent = questions.length;
    }

    document.getElementById("timer-seconds").textContent = timeRemaining;
    startTimer();

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;

    const answerOptions = document.getElementById("answer-options");
    answerOptions.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleAnswer(option);
        answerOptions.appendChild(button);
    });

    document.getElementById("next-button").style.display = "none";
    document.getElementById("next-button").disabled = true;
    document.getElementById("submit-button").style.display = "none";
}

// Start Timer
function startTimer() {
    timeRemaining = 10;
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer-seconds").textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            handleSkip();
            moveToNextQuestion();
        }
    }, 1000);
}

// Handle Answer Selection
function handleAnswer(selectedOption) {
    clearInterval(timer);

    const options = document.querySelectorAll('#answer-options button');
    options.forEach(option => {
        option.style.backgroundColor = ''; // Reset all options to default color
    });

    const selectedButton = Array.from(options).find(option => option.textContent === selectedOption);
    selectedButton.style.backgroundColor = '#708090'; // Darken the clicked option

    document.getElementById("next-button").style.display = "inline-block";
    document.getElementById("next-button").disabled = false;

    const correctAnswer = questions[currentQuestionIndex].answer;
    const isCorrect = selectedOption === correctAnswer;

    userResponses.push({
        question: questions[currentQuestionIndex].question,
        options: questions[currentQuestionIndex].options,
        selected: selectedOption,
        correct: correctAnswer,
        status: isCorrect ? "correct" : "wrong"
    });

    if (isCorrect) {
        score++;
    }
}

// Handle Skip (when time is over)
function handleSkip() {
    skipped++;
    document.getElementById("next-button").style.display = "inline-block";
    document.getElementById("next-button").disabled = false;

    userResponses.push({
        question: questions[currentQuestionIndex].question,
        options: questions[currentQuestionIndex].options,
        selected: "Skipped",
        correct: questions[currentQuestionIndex].answer,
        status: "skipped"
    });
}

// Move to Next Question (automatically called when time is up or next button is clicked)
function moveToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("next-button").textContent = 'Submit Quiz';
    }
}

// Submit Quiz and Show Score
document.getElementById("next-button").onclick = function () {
    if (currentQuestionIndex === questions.length) {
        showSubmitPage();
    } else {
        moveToNextQuestion();
    }
};

// Show Score Page
function showSubmitPage() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("submit-container").style.display = "block";
    document.getElementById("final-score").textContent = score;
    document.getElementById("skipped-count").textContent = skipped;
    document.getElementById("total-questions").textContent = questions.length;

    let userAnswersHtml = '';
    userResponses.forEach((response, index) => {
        userAnswersHtml += `
            <div class="answer">
                <p><strong>Question ${index + 1}:</strong> ${response.question}</p>
                <p>Your Answer: ${response.selected}</p>
                <p>Status: ${response.status === "correct" ? "Correct" : (response.status === "skipped" ? "Skipped" : "Wrong")}</p>
            </div>`;
    });
    document.getElementById("user-answers").innerHTML = userAnswersHtml;
}

// Show Submit Page
function showSubmitPage() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("submit-container").style.display = "block";
}

// Show Score Page
document.getElementById("view-score-button").onclick = function () {
    document.getElementById("submit-container").style.display = "none";
    document.getElementById("score-container").style.display = "block";
   
    const totalQuestions = questions.length;
    const attemptedQuestions = totalQuestions - skipped;

    document.getElementById("score").innerHTML =
    `<p>Your Score: ${score} / ${totalQuestions}</p>
        <p>Questions Attempted: ${attemptedQuestions}</p>
        <p>Questions Skipped: ${skipped}</p>
    `;
};

// Show Responses
document.getElementById("view-response-button").onclick = function () {
    document.getElementById("submit-container").style.display = "none";
    document.getElementById("response-container").style.display = "block";
    
    console.log(userResponses);
    
    const resultList = document.getElementById("response-list");
    resultList.innerHTML = ""; // Clear previous responses
    
    userResponses.forEach(response => {
        const li = document.createElement("li");
    
        // Add the question text and options for each response
        li.innerHTML = `<strong>${response.question}</strong><br>`;
        response.options.forEach(option => {
            let span = document.createElement("span");
            span.textContent = option;
            span.classList.add("option");
    
            let icon = document.createElement("span");
    
            if (option === response.selected) {
                span.classList.add(option === response.correct ? "correct" : "incorrect");
                icon.innerHTML = option === response.correct ? "✅" : "❌";
            }
    
            if (option === response.correct) {
                span.classList.add("correct-answer");
                if (response.selected !== response.correct) {
                    icon.innerHTML = "✅";
                }
            }
            li.appendChild(span);
            li.appendChild(icon);
            li.appendChild(document.createElement("br"));
        });
    
        if (response.selected === "Skipped") {
            li.innerHTML += `<span class="skipped">⚠️ Skipped</span>`;
        }
    
        resultList.appendChild(li);
    });
};

// Back to Submit Page (From Score & Response)
document.getElementById("back-to-submit-from-score").onclick = function () {
    document.getElementById("score-container").style.display = "none";
    document.getElementById("submit-container").style.display = "block";
};

document.getElementById("back-to-submit-from-response").onclick = function () {
    document.getElementById("response-container").style.display = "none";
    document.getElementById("submit-container").style.display = "block";
};

// Restart Quiz (Redirect to Start Page)
document.getElementById("restart-quiz-button").onclick = function () {
    document.getElementById("submit-container").style.display = "none";
    document.getElementById("welcome-container").style.display = "block";
};
