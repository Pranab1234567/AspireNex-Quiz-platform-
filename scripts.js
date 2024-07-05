let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

function addQuestion() {
    const container = document.getElementById('questionsContainer');
    const questionHTML = `
        <div class="question">
            <label>Question: <input type="text" name="question"></label><br>
            <label>Option A: <input type="text" name="optionA"></label><br>
            <label>Option B: <input type="text" name="optionB"></label><br>
            <label>Option C: <input type="text" name="optionC"></label><br>
            <label>Option D: <input type="text" name="optionD"></label><br>
            <label>Correct Answer: 
                <select name="correctAnswer">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </label>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', questionHTML);
}

function saveQuiz() {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    const questions = [];
    const questionsElements = document.getElementsByClassName('question');

    for (let i = 0; i < questionsElements.length; i++) {
        const question = {
            question: formData.getAll('question')[i],
            options: {
                A: formData.getAll('optionA')[i],
                B: formData.getAll('optionB')[i],
                C: formData.getAll('optionC')[i],
                D: formData.getAll('optionD')[i],
            },
            correctAnswer: formData.getAll('correctAnswer')[i],
        };
        questions.push(question);
    }

    quizzes.push(questions);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    alert('Quiz saved!');
    form.reset();
    document.getElementById('questionsContainer').innerHTML = '';
    addQuestion();
}

function loadQuiz() {
    if (quizzes.length === 0) {
        alert('No quizzes available!');
        return;
    }

    const container = document.getElementById('quizContainer');
    container.innerHTML = '';
    const quiz = quizzes[0]; // Load the first quiz for simplicity

    quiz.forEach((q, index) => {
        const questionHTML = `
            <div class="question">
                <p>${index + 1}. ${q.question}</p>
                <label><input type="radio" name="question${index}" value="A"> ${q.options.A}</label><br>
                <label><input type="radio" name="question${index}" value="B"> ${q.options.B}</label><br>
                <label><input type="radio" name="question${index}" value="C"> ${q.options.C}</label><br>
                <label><input type="radio" name="question${index}" value="D"> ${q.options.D}</label>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', questionHTML);
    });
}

function submitQuiz() {
    const quiz = quizzes[0];
    let score = 0;

    quiz.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.correctAnswer) {
            score++;
        }
    });

    alert(`Your score is ${score} out of ${quiz.length}`);
}

function goBack() {
    window.location.href = 'index.html';
}

//delete the quiz
function deleteQuiz() {
    if (quizzes.length === 0) {
        alert('No quizzes available to delete!');
        return;
    }

    const quizIndex = prompt('Enter the quiz number to delete (starting from 1):');
    
    if (quizIndex !== null && !isNaN(quizIndex)) {
        const index = parseInt(quizIndex) - 1;
        if (index >= 0 && index < quizzes.length) {
            quizzes.splice(index, 1);
            localStorage.setItem('quizzes', JSON.stringify(quizzes));
            alert(`Quiz ${quizIndex} has been deleted!`);
        } else {
            alert('Invalid quiz number!');
        }
    } else {
        alert('Please enter a valid number!');
    }
}



document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quizContainer')) {
        loadQuiz();
    }
});
