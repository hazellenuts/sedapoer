const questions = [
    {
        pict: "questions/turmeric.png",
        question: "Bumbu dapur apa yang dikenal memiliki warna kuning dan sering digunakan dalam masakan kari?",
        answers: [
            { text: "Jahe", correct: false },
            { text: "Kunyit", correct: true },
            { text: "Lengkuas", correct: false },
            { text: "Serai", correct: false }
        ],
        xp: 100
    },
    {
        pict: "questions/black_pepper.png",
        question: "Rempah apa yang sering digunakan untuk memberikan aroma khas pada makanan dan minuman, serta dikenal sebagai 'king of spices'?",
        answers: [
            { text: "Cengkeh", correct: false },
            { text: "Pala", correct: false },
            { text: "Lada", correct: true },
            { text: "Kapulaga", correct: false }
        ],
        xp: 20
    },
    {
        pict: "questions/cinnamon.png",
        question: "Rempah apa yang sering digunakan dalam bentuk batang dan bubuk, terkenal dengan aroma manis dan hangatnya?",
        answers: [
            { text: "Cengkeh", correct: false },
            { text: "Kayu Manis", correct: true },
            { text: "Pala", correct: false },
            { text: "Jinten", correct: false }
        ],
        xp: 100
    },
    {
        pict: "questions/paprika.png",
        question: "Bumbu apa yang sering digunakan dalam masakan Italia untuk memberikan rasa pedas dan aromatik?",
        answers: [
            { text: "Oregano", correct: false },
            { text: "Basil", correct: false },
            { text: "Paprika", correct: true },
            { text: "Tarragon", correct: false }
        ],
        xp: 200
    },
    {
        pict: "questions/ginger.png",
        question: "Bumbu dapur apa yang sering digunakan dalam masakan Asia dan dikenal dapat membantu mengatasi mual?",
        answers: [
            { text: "Jahe", correct: true },
            { text: "Kunyit", correct: false },
            { text: "Lengkuas", correct: false },
            { text: "Serai", correct: false }
        ],
        xp: 100
    },
    {
        pict: "questions/black_pepper.png",
        question: "Rempah apa yang sering digunakan dalam bentuk biji atau bubuk untuk memberikan rasa pedas dan hangat dalam masakan?",
        answers: [
            { text: "Lada", correct: true },
            { text: "Ketumbar", correct: false },
            { text: "Kapulaga", correct: false },
            { text: "Jinten", correct: false }
        ],
        xp: 200
    },
    {
        pict: null,
        question: "Rempah apa yang sering digunakan dalam bentuk bunga kering dan memiliki aroma kuat serta sedikit pahit?",
        answers: [
            { text: "Cengkeh", correct: true },
            { text: "Kayu Manis", correct: false },
            { text: "Pala", correct: false },
            { text: "Kapulaga", correct: false }
        ],
        xp: 20
    },
    {
        pict: "questions/bay_leaf.png",
        question: "Bumbu dapur apa yang sering digunakan dalam bentuk daun dan memberikan aroma khas pada masakan Asia Tenggara?",
        answers: [
            { text: "Daun Salam", correct: true },
            { text: "Daun Ketumbar", correct: false },
            { text: "Daun Basil", correct: false },
            { text: "Daun Mint", correct: false }
        ],
        xp: 200
    },
    {
        pict: null,
        question: "Rempah apa yang dikenal dengan bentuk biji dan sering digunakan dalam masakan Timur Tengah dan India?",
        answers: [
            { text: "Kapulaga", correct: true },
            { text: "Ketumbar", correct: false },
            { text: "Lada", correct: false },
            { text: "Jinten", correct: false }
        ],
        xp: 200
    },
    {
        pict: "questions/cumin.png",
        question: "Rempah apa yang sering digunakan dalam bentuk bubuk dan biji, serta dikenal dengan rasa pahit dan sedikit pedas?",
        answers: [
            { text: "Jinten", correct: true },
            { text: "Ketumbar", correct: false },
            { text: "Kapulaga", correct: false },
            { text: "Lada", correct: false }
        ],
        xp: 20
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const checkButton = document.getElementById('check-btn');
const scoreElement = document.getElementById('score');
const picture = document.getElementById('question-img'); // Assuming 'question-img' is the ID of the <img> element
const progressBar = document.getElementById('progress-bar');
const modal = document.getElementById('myModal');
const finalScoreElement = document.getElementById('final-score');
const closeModal = document.getElementsByClassName('close')[0];

let currentQuestionIndex, totalXP, selectedAnswer;

function startQuiz() {
    currentQuestionIndex = 0;
    totalXP = 0;
    checkButton.textContent = 'Cek';
    scoreElement.textContent = '';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    questionElement.textContent = question.question;

    // Display the picture if available
    if (question.pict !== null && question.pict !== undefined) {
        const img = document.createElement('img');
        img.src = question.pict;
        img.alt = 'Question Image';
        picture.appendChild(img);
        img.style.width = '200px';
        img.style.height = 'auto';
    } else {
        // Clear any previous image
        picture.innerHTML = '';
    }

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });

    if (currentQuestionIndex === questions.length - 1) {
        checkButton.textContent = 'Finish';
    } else {
        checkButton.textContent = 'Cek';
    }
}

function resetState() {
    checkButton.classList.remove('hide');
    checkButton.disabled = true;
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    picture.innerHTML = '';
}

function selectAnswer(e) {
    selectedAnswer = e.target;
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('selected');
    });
    selectedAnswer.classList.add('selected');
    checkButton.disabled = false;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function showModal() {
    modal.style.display = "block";
    finalScoreElement.textContent = `Your total XP: ${totalXP}`;
}

checkButton.addEventListener('click', () => {
    if (checkButton.textContent === 'Cek') {
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (selectedAnswer && selectedAnswer.dataset.correct) {
            totalXP += questions[currentQuestionIndex].xp;
        }
        checkButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
        updateProgressBar();
    } else {
        currentQuestionIndex++;
        if (questions.length > currentQuestionIndex) {
            showQuestion(questions[currentQuestionIndex]);
            checkButton.textContent = 'Cek';
        } else {
            showConfetti();
            showModal();
        }
    }
});

closeModal.onclick = function() {
    window.location.href = '/sedapoer/quests.html';
}

window.onclick = function(event) {
    if (event.target == modal) {
        window.location.href = 'sedapoer/quests.html';
    }
}

startQuiz();
