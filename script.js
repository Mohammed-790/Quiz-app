const questions = [
    {
        question: "Which language is primarily used for web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false },
            { text: "Ruby", correct: false }
        ]
    },
    {
        question: "What does 'CSS' stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Cascading Simple Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which language is used for iOS app development?",
        answers: [
            { text: "Swift", correct: true },
            { text: "Java", correct: false },
            { text: "Kotlin", correct: false },
            { text: "C#", correct: false }
        ]
    },
    {
        question: "Which of these is a version control system?",
        answers: [
            { text: "Git", correct: true },
            { text: "Docker", correct: false },
            { text: "Node.js", correct: false },
            { text: "Angular", correct: false }
        ]
    },
    {
        question: "What is the time complexity of binary search?",
        answers: [
            { text: "O(n)", correct: false },
            { text: "O(log n)", correct: true },
            { text: "O(n^2)", correct: false },
            { text: "O(1)", correct: false }
        ]
    },
    {
        question: "Which of the following is a Python framework for web development?",
        answers: [
            { text: "Django", correct: true },
            { text: "React", correct: false },
            { text: "Angular", correct: false },
            { text: "Vue.js", correct: false }
        ]
    },
    {
        question: "What is the main purpose of a 'for' loop?",
        answers: [
            { text: "To iterate over a sequence of values", correct: true },
            { text: "To check a condition", correct: false },
            { text: "To define variables", correct: false },
            { text: "To create objects", correct: false }
        ]
    },
    {
        question: "What does 'SQL' stand for?",
        answers: [
            { text: "Structured Query Language", correct: true },
            { text: "Standard Query Language", correct: false },
            { text: "Simple Query Language", correct: false },
            { text: "System Query Language", correct: false }
        ]
    },
    {
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        answers: [
            { text: "=", correct: true },
            { text: "==", correct: false },
            { text: "===", correct: false },
            { text: ":", correct: false }
        ]
    },
    {
        question: "Which of the following is a NoSQL database?",
        answers: [
            { text: "MySQL", correct: false },
            { text: "MongoDB", correct: true },
            { text: "PostgreSQL", correct: false },
            { text: "Oracle", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("nxt-btn");


let currentQnIndx = 0;
let score = 0;

function startQuiz(){
    currentQnIndx = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQnIndx];
    let questionNo = currentQnIndx + 1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question;
    
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQnIndx++;
    if(currentQnIndx < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQnIndx < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();