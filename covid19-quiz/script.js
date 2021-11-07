// wrapping the whole quiz in an IIFE - immediately invoked function expression -
// a function that runs as soon as you define it. It keeps variables out of global
// scope and ensure that the quiz doesn't interfere with any other scripts running on the page. 
(function(){
function buildQuiz() {
    // variable to store the html output
    const output = [];
   
    // for each question
    covidQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // the code we want to run for each questions goes here
            // variable to store the list of possible answers
            const answers = [];
            // and for each available answer - we're lopping here
            for(letter in currentQuestion.answers) {
                // add html radio button
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter}:
                            ${currentQuestion.answers[letter]}
                     </label>`
                );
            }
            // add question and its answers to the output
            output.push(
                `<div class="question">${currentQuestion.question} </div>
                 <div class="answers">${answers.join('')} </div>`
            );
         }
      );
      // combine output list into one string of html and put it on the page
      quizContainer.innerHTML = output.join('');
   }
   
   // displaying the quiz results
   function showResults() {
       // gather answer containers from quiz
       const answerContainers = quizContainer.querySelectorAll('.answers');
       // keep track of user's answers
       let numCorrect = 0;

       // for each question...
       covidQuestions.forEach((currentQuestion, questionNumber) => {
           // find selected answer
           const answerContainer = answerContainers[questionNumber];
           const selector = `input[name=question${questionNumber}]:checked`;
           const userAnswer = (answerContainer.querySelector(selector) || {}).value;

           // if answer is correct
           if(userAnswer === currentQuestion.correctAnswer) {
               // add to the number of correct answers
               numCorrect ++;

               // color the answers green
               answerContainers[questionNumber].style.color = 'green';
           }
           // if answer is wrong or blank
           else {
               // color the answers red
               answerContainers[questionNumber].style.color = 'red';
           }
       });
       // show number of correct answers out of total
       resultsContainer.innerHTML = `${numCorrect} out of ${covidQuestions.length} correct answers`;
    }

// html elements and their references in VARIABLES
const titleContainer = document.getElementById('title');
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
// quiz questions
// object literals represent the individual questions
// array holds all of the questions
const covidQuestions = [
    {
        question: "What is the covid19 known commonly as a coronavirus?",
        answers: {
            a: "It is an infectious disease caused by the SARS-CoV-2 virus",
            b: "It is a movie",
            c: "It is a type of a chronic pain"
        },
        correctAnswer: "a"
    },
    {
        question: "What are the symptoms of the covid19?",
        answers: {
            a: "No symptoms, it is not a disease",
            b: "Fever, chills, cough, shortness of breath, fatique, muscle and body aches",
            c: "Inflammation, the skin color changes to blue"
         },
         correctAnswer: "b"
     },
    {
        question: "When was covid19 discovered?",
        answers: {
            a: "2023",
            b: "1945",
            c: "2019"
        },
        correctAnswer: "c"
    },   
    {
        question: "How long does it take for symptoms of covid19 to appear after exposure?",
        answers: {
            a: "2 to 14 days",
            b: "23 to 45 days",
            c: "immediately"
        },
        correctAnswer: "a"
    },
    {
       question: "What are the recommendations for someone who has symptoms of covid19?",
       answers: {
         a: "stay at home, wear a mask when you're around the others, separate yourself from the others ",
         b: "go to the concert",
         c: "go to the mall to buy new clothes"
     },
       correctAnswer: "a"
    },
    {
        question: "What you should do when you feel a shortage of breath that disables you to breathe?",
        answers: {
          a: "head to the nearest hospital, mask on the face, distance from the people",
          b: "don't worry, it is temporary",
          c: "have a shot of vodka"
    },
        correctAnswer: "a"
  }
 ];

// PRINT THE QUIZ right away
buildQuiz();

// EVENT LISTENERS - show results on submit
submitButton.addEventListener('click', showResults);
})();



