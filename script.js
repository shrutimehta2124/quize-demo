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

let skippedQuestions = 0;
let currentQuestionIndex = 0;
let score = 0;
let skipped = 0;
let totalQuestions = 20; // Adjust according to your quiz length
let attemptedQuestions = 0;
let timer;
let timeRemaining = 10;
let userResponses = [];
let questionTimers = {}; // Store remaining time per question
let stream; // To hold the camera stream

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to start the camera
function startCamera() {
    document.getElementById("videoElement").style.display = "block";

    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((userStream) => {
            document.querySelector("#videoElement").srcObject = userStream;
            stream = userStream; // Save the stream to stop later

            document.querySelector("#start").style.display = "none"; // Hide the button after starting
            document.querySelector("#start-quiz-button").disabled = false; // Enable Start Quiz button
        })
        .catch((error) => {
            console.error("Camera access denied:", error);
            document.querySelector("#message").innerText =
                "Camera access denied. Please enable it in your browser settings.";
        });
}


// Function to stop the camera
function stopCamera() {
    if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks (video)
        document.querySelector("#videoElement").srcObject = null; // Remove the video stream
    }
    document.querySelector("#start-quiz-button").disabled = true; // Disable Start Quiz button when camera stops
}

// Toggle start/stop on button click
document.querySelector("#start").addEventListener("click", () => {
    const buttonText = document.querySelector("#start").innerText;
    if (buttonText === "Start Camera") {
        startCamera(); // Start the camera
    } else {
        stopCamera(); // Stop the camera
    }
});
// Ensure quiz doesn't start until camera is started
document.getElementById("start-quiz-button").onclick = function() {
    if (stream) {
        startQuiz(); // Proceed with quiz if camera is active
    } else {
        alert("Please start the camera before starting the quiz!");
    }
};
// Start Quiz
document.getElementById("start-quiz-button").onclick = startQuiz;

function startQuiz() {
    if (!stream) {
        alert("Please start the camera before starting the quiz!");
        return;
    }

    // Hide the welcome container and show the quiz container
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("quiz-container").classList.add('show'); // Show quiz container

    // Show the sidebar when quiz starts
    document.getElementById('sidebar').classList.add('show');

    document.getElementById("sidebar").style.display = "block"; // Show sidebar

    currentQuestionIndex = 0;
    score = 0;
    skipped = 0;
    userResponses = [];
    questionTimers = {}; // Reset question timers

    // Shuffle questions every time the quiz starts
    shuffleArray(questions);

    setupSidebar();
    loadQuestion();
}
//load question 
function loadQuestion() {
    // Ensure we are working with the correct currentQuestionIndex
    if (currentQuestionIndex < questions.length) {
        document.getElementById("current-question-number").textContent = currentQuestionIndex + 1;
        document.getElementById("total-questions-number").textContent = questions.length;

        if (questionTimers[currentQuestionIndex] === undefined) {
            questionTimers[currentQuestionIndex] = 10; // Default 10 seconds if first attempt
        }
        timeRemaining = questionTimers[currentQuestionIndex];
        document.getElementById("timer-seconds").textContent = timeRemaining;

        startTimer();

        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById("question").textContent = currentQuestion.question;

        const answerOptions = document.getElementById("answer-options");
        answerOptions.innerHTML = ''; // Clear existing options

        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => handleAnswer(option);
            answerOptions.appendChild(button);
        });

        // Reset and disable Next button at the start of each question
        document.getElementById("next-button").disabled = true;
        document.getElementById("next-button").style.backgroundColor = "#dcdcdc"; // Disabled style

        // Display Skip and hide other buttons
        document.getElementById("skipped-button").style.display = "inline-block"; // Show skip button
        document.getElementById("next-button").style.display = "inline-block"; // Show next button
        document.getElementById("submit-button").style.display = "none"; // Hide submit button
        updateSidebar();
    }
}
// Start Timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            questionTimers[currentQuestionIndex] = timeRemaining;
            document.getElementById("timer-seconds").textContent = timeRemaining;

            // Change the color of the timer when time reaches 4 seconds
            if (timeRemaining <= 4) {
                document.getElementById("timer").style.color = "red"; // Red color for warning
            } else {
                document.getElementById("timer").style.color = "green"; // Green color for normal time
            }
        } else {
            clearInterval(timer);  // Clear timer when it reaches zero
            handleSkip();          // Handle skip when time runs out
            moveToNextQuestion();  // Move to the next question
        }
    }, 1000);
}

// Handle Answer Selection
function handleAnswer(selectedOption) {
    if (timeRemaining <= 0) {
        const notification = document.getElementById("notification");
        notification.textContent = "Time's up! You can't access or answer this question anymore.";
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
        return;
    }

    clearInterval(timer);

    const options = document.querySelectorAll('#answer-options button');
    options.forEach(option => option.style.backgroundColor = '');

    const selectedButton = Array.from(options).find(option => option.textContent === selectedOption);
    selectedButton.style.backgroundColor = '#708090';

    // Enable the Next Button
    document.getElementById("next-button").disabled = false;
    document.getElementById("next-button").style.backgroundColor = "#1abc9c"; // Normal background color when enabled

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer; // Full answer (e.g. "B) Hyper Text Markup Language")
    const selectedAnswerLetter = selectedOption.split(" ")[0]; // Get the letter (e.g. "B")

    // Extract correct answer's letter
    const correctAnswerLetter = correctAnswer.split(" ")[0]; // e.g. "B"

    const isCorrect = selectedAnswerLetter === correctAnswerLetter;

    userResponses[currentQuestionIndex] = {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: correctAnswer,
        status: isCorrect ? "correct" : "wrong"
    };

    if (isCorrect) {
        score++;
    }

    updateSidebar();
}
document.getElementById("skipped-button").addEventListener("click", function() {
    handleSkip();  // Call handleSkip when Skip button is clicked
    moveToNextQuestion();  // Move to the next question after skipping
});
// Handle Skip
function handleSkip() {
    skipped++;  // Increment skipped count only
    userResponses[currentQuestionIndex] = {
        question: questions[currentQuestionIndex].question,
        selected: "Skipped",  // Mark as skipped
        correct: questions[currentQuestionIndex].answer,  // Correct answer for reference
        status: "skipped"  // Set status as skipped
    };

    // If it's the last question, show the Submit Quiz button
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById("next-button").textContent = 'Submit Quiz';
        document.getElementById("next-button").disabled = false; // Enable the submit button
    }

    // Update the sidebar with skipped question status
    updateSidebar();
}



// Skip Button Click Event
document.getElementById("skipped-button").addEventListener("click", function() {
    if (timeRemaining > 0) {
        handleSkip();
    } else {
        alert("You cannot skip after time runs out.");
    }
});
function moveToNextQuestion() {
    currentQuestionIndex++;  // Move to next question
    if (currentQuestionIndex < questions.length) {
        loadQuestion();  // Load next question
    } else {
        // If it's the last question, show the Submit Quiz button
        document.getElementById("next-button").textContent = 'Submit Quiz'; // Change button text to 'Submit Quiz'
        
        // Enable the Submit Quiz button if it's the last question
        document.getElementById("next-button").disabled = false;
        
        // Hide the Skip button when it's the last question
        document.getElementById("skipped-button").style.display = "none";
    }
}


// Submit Quiz
document.getElementById("next-button").onclick = function () {
    if (currentQuestionIndex === questions.length) {
        showSubmitPage();
    } else {
        moveToNextQuestion();
    }
};


// Setup Sidebar
function setupSidebar() {
    const sidebar = document.getElementById("question-list");
    sidebar.innerHTML = '';

    questions.forEach((_, index) => {
        const li = document.createElement("li");
        li.textContent = `Question ${index + 1}`;
        li.setAttribute("data-index", index);
        li.classList.add("sidebar-item");

        li.onclick = function () {
            if (questionTimers[index] > 0) {
                currentQuestionIndex = index;
                loadQuestion();
            } else {
                const notification = document.getElementById("notification");
                notification.textContent = "Time's up! You can't access or answer this question anymore.";
                notification.style.display = "block";
                setTimeout(() => {
                    notification.style.display = "none";
                }, 3000);
            }
        };
        

        sidebar.appendChild(li);
    });

    updateSidebar();
}

// Update Sidebar
function updateSidebar() {
    document.querySelectorAll(".sidebar-item").forEach((item, index) => {
        item.className = "sidebar-item";

        if (index === currentQuestionIndex) {
            item.classList.add("current-question");
        } else if (userResponses[index]?.status === "correct" || userResponses[index]?.status === "wrong") {
            item.classList.add("attempted-question");
        } else if (userResponses[index]?.status === "skipped") {
            item.classList.add("skipped-question");
        }
    });
}

// Show Score Page
document.getElementById("view-score-button").onclick = function () {
    document.getElementById("submit-container").style.display = "none";
    document.getElementById("score-container").style.display = "block";

    /*const totalQuestions = questions.length;
    const attemptedQuestions = totalQuestions - skipped;

    document.getElementById("score").innerHTML = `
        <p>Your Score: ${score} / ${totalQuestions}</p>
        <p>Questions Attempted: ${attemptedQuestions}</p>
        <p>Questions Skipped: ${skipped}</p>
    `;*/
};

function submitQuiz() {
    let score = 0;
    let attempted = 0;
    let skipped = 0;

    // Assuming 'questions' is an array of question objects, and 'userResponses' is an array of user's answers/status
    for (let i = 0; i < questions.length; i++) {
        const userResponse = userResponses[i];

        // Check if the user skipped the question
        if (userResponse.status === 'skipped') {
            skipped++;
        }
        // Check if the user answered the question (correct or incorrect)
        else if (userResponse.selected !== undefined && userResponse.selected !== "Skipped") {
            attempted++;
            // If the answer is correct, increase the score
            if (userResponse.selected === questions[i].answer) {
                score++;
            }
        }
    }

    // Display the results
    document.getElementById("score").innerText = `Your Score: ${score} / ${questions.length}`;
    document.getElementById("attempted").innerText = `Questions Attempted: ${attempted}`;
    document.getElementById("skipped").innerText = `Questions Skipped: ${skipped}`;
}


function showSubmitPage() {
    stopCamera(); // Stop the camera when the quiz is submitted

    // Hide camera and quiz containers
    document.getElementById("video-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "none";

    // Hide the sidebar when the quiz is submitted
    document.getElementById('sidebar').style.display = "none"; // Hides the sidebar

    // Show the submit container (score page)
    document.getElementById("submit-container").style.display = "block";

    // Calculate and display the score, attempted, and skipped questions
    submitQuiz(); // Call the submitQuiz function to update the counts

    document.querySelector("#start").style.display = "none"; // Ensure start camera button stays hidden
}

// Show Responses
document.getElementById("view-response-button").onclick = function () {
    document.getElementById("submit-container").style.display = "none";
    document.getElementById("response-container").style.display = "block";
    
    const resultList = document.getElementById("response-list");
    resultList.innerHTML = ""; // Clear previous responses
    
    userResponses.forEach((response, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>Question ${index + 1}: ${response.question}</strong><br>`;

        // Ensure 'options' are available
        if (questions[index] && questions[index].options) {
            questions[index].options.forEach(option => {
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
        } else {
            li.innerHTML += "<p style='color: red;'>Error: No options available.</p>";
        }

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

    document.querySelector("#start").style.display = "block"; // Show the start button again on restart
};
attemptedQuestions = totalQuestions - skippedQuestions;
skippedQuestions = totalQuestions - attemptedQuestions;
attemptedQuestions = Math.max(0, attemptedQuestions);
skippedQuestions = Math.max(0, skippedQuestions);
console.log("Attempted: ", attemptedQuestions);
console.log("Skipped: ", skippedQuestions);
