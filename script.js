//Empty global variables for incrementing
let currentQuestionIndex= 0

let shuffledQuestions= 0

let score = 0


//Shuffles questions and displays
function startQuiz () {
shuffledQuestions = questions.sort( () => Math.random() - .5)
setQuestion()
}

//Chooses and displays a question
function setQuestion () {
showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//displays question and choices
function showQuestion (question) {
  $('#home').addClass('hide')
  $('#question-container').removeClass('hide')
  $('#question-container').html (
    `<div id="score-and-question"><p><strong>Question:  ${currentQuestionIndex
    + 1}/${questions.length}</p>
    <p>Score:  ${score}/${questions.length}</strong></p></div>
    <form id="form">
    <h3>"${question.question}"</h3>
    <label>
    <input type="radio" name= "answer" value="${question.choices[0]}" checked tabindex="1">${question.choices[0]}
    </label>
   <label>
    <input type="radio" name="answer" value="${question.choices[1]}" tabindex="2">${question.choices[1]}
    </label>
    <label>
    <input type="radio" name="answer" value="${question.choices[2]}">${question.choices[2]}
    </label> 
    <label>
    <input type="radio" name="answer" value="${question.choices[3]}">${question.choices[3]}
    </label>
     <button id= "submit" type="submit" value="Submit">Submit</button>
    </form>
        `)
}


//Listens for choice selection after submit button has been pressed. If selection is correct, the score variable is incremented by 1
function submitAnswer(){
  $('#question-container').on('submit',function(event){
    event.preventDefault();
    let selectedOption = $('input:checked').val();
    let correct = questions[currentQuestionIndex].answer;
    if(selectedOption == correct) {
      correctAnswer()
       score++
    } else {
       wrongAnswer()
    }
     $('#submit').hide()
})
nextQuestion()
}


//Displays message if answer is correct
function correctAnswer() {
  $('#form').addClass('hide')
      $('#score-and-question').addClass('hide'
      )      
 $('.container').addClass('correct')
 $('#question-container').append(
         `<strong><h2> That's Right! </h2>
         <div class="next-qtn">
         <button id="next" type="submit">Next</button>
         </div>`
       )
}

//Displays message if answer is incorrect
function wrongAnswer() {
 $('.container').addClass('wrong')
 $('#score-and-question').addClass('hide'
      )     
 $('#form').addClass('hide')
 $('#question-container').append(
         `<strong><h2> Oops! </h2>
         <h3>The correct answer was "${questions[currentQuestionIndex].answer}"</h3>
         <div class="next-qtn">
         <button id="next" type="submit">Next</button>
         </div>`
       )
}

//Listens for next button to be pressed. Sets next question if there is one. Otherwise, displays final score.
function nextQuestion () {
$('#question-container').on('click', '#next', function (event) {
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

//Display page for end of quiz, showing final score and restart button.
function finalScore () {
  if (score>= questions.length - 2) {
$('#question-container').html(
  ` <h2>Nice One!</h2>
  <h3>Your Final Score is: ${score}/${questions.length}</h3>
  <div class="restart">
  <button id="restart">Restart</button>
  </div>`
)
 } else  {
   $('#question-container').html(`
   <h3>Your Final Score is: ${score}/${questions.length}</h3>
   <div class="restart">
   <h2>Press Restart to try again!</h2>
  <button id="restart">Restart</button>
  </div>
  `)
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




