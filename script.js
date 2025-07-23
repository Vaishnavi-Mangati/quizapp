const questions = [
    {
        question: "What does HTML stand for",
        answers : [
            {text: "Hyperlinks and Text Markup Language", correct: "false"},
            {text: "Home Tool Markup Language", correct: "false"},
            {text: "Hyper Text Markup Language", correct: "true"},
            {text: "Hyperlinking Text Managing Language", correct: "false"},
        ]
    }, 
    {
        question: "Which HTML tag is used to define an internal stylesheet?",
        answers : [
            {text: "<css>", correct: "false"},
            {text: "<style>", correct: "true"},
            {text: "<script>", correct: "false"},
            {text: "<link>", correct: "false"},
        ]
    },
    {
        question: "Which CSS property is used to change text color?",
        answers : [
            {text: "font-color", correct: "false"},
            {text: "Hetext-color", correct: "false"},
            {text: "color", correct: "true"},
            {text: "fontStyle", correct: "false"},
        ]
    },
    {
        question: "How do you add a comment in CSS?",
        answers : [
            {text: "// comment", correct: "false"},
            {text: "<!-- comment -->", correct: "false"},
            {text: "/* comment */", correct: "true"},
            {text: "# comment", correct: "false"},
        ]
    },
    {
        question: "Which JavaScript method is used to select an element by ID?",
        answers : [
            {text: "getElementsByClassName()", correct: "false"},
            {text: "getElementById()", correct: "true"},
            {text: "querySelectorAll()", correct: "false"},
            {text: "getElementsByTagName()", correct: "false"},
        ]
    },
    {
        question: "What does DOM stand for?",
        answers : [
            {text: "Document Object Mapping", correct: "false"},
            {text: "Data Object Model", correct: "false"},
            {text: "Document Object Model", correct: "true"},
            {text: "Display Object Management", correct: "false"},
        ]
    },
    {
        question: "Which of the following is NOT a valid JavaScript data type?",
        answers : [
            {text: " String", correct: "false"},
            {text: "Boolean", correct: "false"},
            {text: "Float", correct: "true"},
            {text: "Undefined", correct: "false"},
        ]
    },
    {
        question: "Which CSS property is used to make a website responsive?",
        answers : [
            {text: "position", correct: "false"},
            {text: "transition", correct: "false"},
            {text: "media", correct: "false"},
            {text: "@media", correct: "true"},
        ]
    },
    {
        question: "In React, what is used to pass data from parent to child component?",
        answers : [
            {text: "Props", correct: "true"},
            {text: "State", correct: "false"},
            {text: "Context", correct: "false"},
            {text: "Refs", correct: "false"},
        ]
    },
    {
        question: "Which attribute is used in HTML to provide alternate text for an image?",
        answers : [
            {text: "alt", correct: "true"},
            {text: "title", correct: "false"},
            {text: "src", correct: "false"},
            {text: "href", correct: "false"},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("ans-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
 
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerElement.appendChild(button);
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
    });
    nextButton.style.display = "none";
}

function resetState(){
    answerElement.innerHTML = "";
}

function selectAnswer(e){
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerElement.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz()