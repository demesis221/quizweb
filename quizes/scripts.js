// Quiz Questions
const questions = [
    {
        question: "Gender significantly influences the use and management of natural resources, with distinct roles and responsibilities often assigned to men and women.",
        answer: true
    },
    {
        question: "Men play a greater role in resource availability and equity management, while societal norms can restrict their access and control, impacting sustainability and natural resource use.",
        answer: false,
        correctionNote: "Women (not men) play this role"
    },
    {
        question: "Women are often the equally limited users of natural resources, such as water, fuel, and food.",
        answer: false,
        correctionNote: "Women are unequally (not equally) limited"
    },
    {
        question: "Gender equality management faces fair challenges in accessing natural resources.",
        answer: false,
        correctionNote: "Faces greater (not fair) challenges"
    },
    {
        question: "Climate change refers to the deterioration of the environment through the depletion of resources, destruction of ecosystems, and loss of biodiversity.",
        answer: true
    },
    {
        question: "Men are more vulnerable to the impacts of environmental degradation due to their roles in resource management.",
        answer: false,
        correctionNote: "Women (not men) are more vulnerable"
    },
    {
        question: "Women experience different vulnerabilities, particularly in terms of economic impacts.",
        answer: true
    },
    {
        question: "Women have limited access to land and technology while men have more access to resources such as agriculture.",
        answer: true
    },
    {
        question: "Economic instability due to environmental degradation can lead to increased population as men seek work elsewhere, which can disrupt family structures and community cohesion.",
        answer: false,
        correctionNote: "Leads to migration (not increased population)"
    },
    {
        question: "Economic instability due to environmental degradation can lead to migration as men seek work elsewhere, which can disrupt family structures and community cohesion.",
        answer: true
    }
];

// DOM Elements
const quizCard = document.getElementById('quiz-card');
const questionEl = document.getElementById('question');
const scoreEl = document.getElementById('score');
const totalQuestionsEl = document.getElementById('total-questions');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.querySelector('.timer-bar');
const optionBtns = document.querySelectorAll('.option-btn');
const resultsContainer = document.getElementById('results');
const finalScoreEl = document.getElementById('final-score');
const finalTotalEl = document.getElementById('final-total');
const answersReviewEl = document.getElementById('answers-review');
const restartBtn = document.getElementById('restart-btn');
const themeBtn = document.getElementById('theme-btn');
const particlesContainer = document.getElementById('particles-container');

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timerDuration = 15; // seconds
let userAnswers = [];

// Initialize
function initQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    // Update total questions
    totalQuestionsEl.textContent = questions.length;
    finalTotalEl.textContent = questions.length;
    
    // Hide results, show card
    resultsContainer.style.display = 'none';
    quizCard.classList.remove('flipped');
    
    // Show first question
    loadQuestion();
    
    // Initialize particles
    initParticles();
}

// Load question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    
    // Reset option buttons
    optionBtns.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });
    
    // Update score display
    scoreEl.textContent = score;
    
    // Start timer
    startTimer();
}

// Check answer
function checkAnswer(isTrue) {
    clearInterval(timerInterval);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = (isTrue === currentQuestion.answer);
    const userAnswer = {
        question: currentQuestion.question,
        userAnswer: isTrue,
        correctAnswer: currentQuestion.answer,
        isCorrect,
        correctionNote: currentQuestion.correctionNote
    };
    
    userAnswers.push(userAnswer);
    
    // Update score if correct
    if (isCorrect) {
        score++;
    }
    
    // Highlight correct/incorrect answers
    optionBtns.forEach(btn => {
        const btnIsTrue = btn.classList.contains('true-btn');
        btn.disabled = true;
        
        if (btnIsTrue === currentQuestion.answer) {
            btn.classList.add('correct');
        } else if (btnIsTrue === isTrue && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    document.getElementById('feedback').textContent = isCorrect 
        ? "Correct!" 
        : `Incorrect! ${currentQuestion.correctionNote || ''}`;
    
    // Flip card to show feedback
    quizCard.classList.add('flipped');
}

// Start timer
function startTimer() {
    let timeLeft = timerDuration;
    timerEl.style.width = '100%';
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        const percentage = (timeLeft / timerDuration) * 100;
        timerEl.style.width = `${percentage}%`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Time's up - treat as incorrect
            checkAnswer(!questions[currentQuestionIndex].answer);
        }
    }, 1000);
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        quizCard.classList.remove('flipped');
        setTimeout(loadQuestion, 300);
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    clearInterval(timerInterval);
    finalScoreEl.textContent = score;
    
    // Generate review of answers
    answersReviewEl.innerHTML = '';
    userAnswers.forEach((answer, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.classList.add(answer.isCorrect ? 'correct' : 'incorrect');
        
        reviewItem.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${answer.question}</p>
            <p>Your answer: ${answer.userAnswer ? 'True' : 'False'}</p>
            <p>Correct answer: ${answer.correctAnswer ? 'True' : 'False'}</p>
            ${answer.correctionNote ? `<p><em>${answer.correctionNote}</em></p>` : ''}
        `;
        
        answersReviewEl.appendChild(reviewItem);
    });
    
    resultsContainer.style.display = 'block';
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

// Initialize particles
function initParticles() {
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create particles
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    // Start particle interval
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    // Continue creating particles
    setInterval(createParticle, 300);
}

// Create a single particle
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const size = Math.random();
    if (size < 0.3) {
        particle.classList.add('particle-small');
    } else if (size < 0.7) {
        particle.classList.add('particle-medium');
    } else {
        particle.classList.add('particle-large');
    }
    
    // Random position
    const randomX = Math.random() * window.innerWidth;
    particle.style.left = randomX + 'px';
    
    // Random delay
    const randomDelay = Math.random() * 2;
    particle.style.animationDelay = `-${randomDelay}s`;
    
    // Add to container
    particlesContainer.appendChild(particle);
    
    // Remove after animation
    const animationDuration = size < 0.3 ? 5000 : (size < 0.7 ? 4000 : 3000);
    setTimeout(() => {
        particle.remove();
    }, animationDuration);
}

// Event Listeners
optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const isTrue = btn.classList.contains('true-btn');
        checkAnswer(isTrue);
    });
});

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', initQuiz);
themeBtn.addEventListener('click', toggleTheme);
window.addEventListener('resize', initParticles);

// Start the quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);
