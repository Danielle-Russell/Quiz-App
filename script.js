//Empty global variables for incrementing
let currentQuestionIndex= 0;

let shuffledQuestions= 0;

let score = 0;


//Shuffles questions and displays
function startQuiz () {
shuffledQuestions = questions.sort( () => Math.random() - .5)
setQuestion()
}

//Chooses and displays a question
function setQuestion () {
showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//Template to generate question
function generateQuestion () {
return `<div id="score-and-question"><p><strong>Question:  ${currentQuestionIndex
    + 1}/${questions.length}</p>
    <p>Score:  ${score}/${questions.length}</strong></p></div>
    <form id="form">
    <h3>"${questions[currentQuestionIndex].question}"</h3>
    <label>
    <input type="radio" name= "answer" value="${questions[currentQuestionIndex].choices[0]}" checked tabindex="1">${questions[currentQuestionIndex].choices[0]}
    </label>
   <label>
    <input type="radio" name="answer" value="${questions[currentQuestionIndex].choices[1]}" tabindex="2">${questions[currentQuestionIndex].choices[1]}
    </label>
    <label>
    <input type="radio" name="answer" value="${questions[currentQuestionIndex].choices[2]}">${questions[currentQuestionIndex].choices[2]}
    </label> 
    <label>
    <input type="radio" name="answer" value="${questions[currentQuestionIndex].choices[3]}">${questions[currentQuestionIndex].choices[3]}
    </label>
     <button id= "submit" type="submit" value="Submit">Submit</button>
    </form>
    `
}

//displays question and choices
function showQuestion () {
  $('.container').html (generateQuestion);
}


//Listens for choice selection after submit button has been pressed. If selection is correct, the score variable is incremented by 1
function submitAnswer(){
  $('.container').on('submit',function(event){
    event.preventDefault();
    let selectedOption = $('input:checked').val();
    let correct = questions[currentQuestionIndex].answer;
    if(selectedOption == correct) {
      correctAnswer()
       score++
    } else {
       wrongAnswer()
    }
     $('form').hide()
})
nextQuestion()
}

//Template for the display when the user input was correct
function correctDisplay () {
  return `<strong><h2> That's Right! </h2>
         <div class="next-qtn">
         <button id="next" type="submit">Next</button>
         </div>`
}

//Template for the display when the user input was incorrect
function incorrectDisplay () {
  return `<strong><h2> Oops! </h2>
         <h3>The correct answer was "${questions[currentQuestionIndex].answer}"</h3>
         <div class="next-qtn">
         <button id="next" type="submit">Next</button>
         </div>`
}
//Displays message if answer is correct
function correctAnswer() {  
 $('.container').addClass('correct')
 $('.container').append(correctDisplay)
}

//Displays message if answer is incorrect
function wrongAnswer() {
 $('.container').addClass('wrong')
 $('.container').append(incorrectDisplay)
}

//Listens for next button to be pressed. Sets next question if there is one. Otherwise, displays final score.
function nextQuestion () {
$('.container').on('click', '#next', function (event) {
  $('.container').removeClass('correct')
  $('.container').removeClass('wrong')
  event.preventDefault();
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++
setQuestion()
} else {
finalScore()
}
})
}

//Template for end page when user achieves a high score
function finalSuccess () {
return ` <h2>Nice One!</h2>
  <h3>Your Final Score is: ${score}/${questions.length}</h3>
  <div class="restart">
  <button id="restart">Restart</button>
  </div>`
}
//Template for end page when user gets a low score
function finalFail () {
return `
   <h3>Your Final Score is: ${score}/${questions.length}</h3>
   <div class="restart">
   <h2>Press Restart to try again!</h2>
  <button id="restart">Restart</button>
  </div>
  `
}
//Display page for end of quiz, showing final score and restart button.
function finalScore () {
  if (score >= questions.length - 2) {
$('.container').html(finalSuccess)
 } else  {
   $('.container').html(finalFail)
}
resetStats()
restartQuiz()
}

//Restarts quiz upon click of restart button on end page.
function restartQuiz() {
  $('body').on('click','#restart', (event) => {
    startQuiz();
  });
}

//Resets score and question number variables to 0.
function resetStats () {
score=0
currentQuestionIndex=0
}

//Begins Quiz upon click of start button
function startButton() {
$("#home").on('click', '#start-btn', function (){
  startQuiz()
})
}


function handleQuiz () {
submitAnswer()
startButton()
}

$(handleQuiz);




