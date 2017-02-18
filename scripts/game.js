var randomNumber = Math.floor(Math.random() * 100) + 1;		// random number generated between (& including) 1 and 100

// these are the parameters that have to do with after the guess is made
// IOW, how the script will respond after a guess is made
var guesses = document.querySelector('.guesses');		// this variable will hold the guesses made (string)
var lastResult = document.querySelector('.lastResult');	// message displayed (either wrong, correct, or game over)
var lowOrHi = document.querySelector('.lowOrHi');		// will tell user if guess is too low or high

var guessSubmit = document.querySelector('.guessSubmit'); // stores submit
var guessField = document.querySelector('.guessField');	  // user inputted value

var guessCount = 1;	// initiate the count at 1 for the user's first turn
var resetButton;	// stores reset button

function checkGuess() {
	var userGuess = Number(guessField.value);

	if (guessCount === 1) {							// you need this if-statement because without it, the previous guesses
		guesses.textContent = 'Previous guesses: ';	// will show no more than 1 previous guess, b/c its getting reset
	}

	guesses.textContent += userGuess + ' ';			// will display the guess made + previous guesses made

	if (userGuess === randomNumber) {									// if user guesses correctly:
		lastResult.textContent = 'Congradulations! You go it right!';	// winning message displayed
		lastResult.style.backgroundColor = 'green';						// background green
		lowOrHi.textContent = '';										// no low or high msg displayed
		setGameOver();													// run setGameOver() function
	} else if (guessCount === 10) {					// if the user makes 10 wrong guesses:
		lastResult.textContent = '!!!GAME OVER!!!';	// game over message displayed
		setGameOver();								// run setGameOver() function
	} else {
		lastResult.textContent = 'Wrong!';			// if the user makes a wrong guess:
		lastResult.style.backgroundColor = 'red';	// red background color 

		if(userGuess < randomNumber) {							// if guess is too low:
			lowOrHi.textContent = 'Last guess was too low!';
		} else if (userGuess > randomNumber) {					// if guess is too high:
			lowOrHi.textContent = 'Last guess was too high!';
		}
	}

	guessCount++;			// add one to guess count  
	guessField.value = '';	// clear input field
	guessField.focus();		// automatically set cursor inside field
}

guessSubmit.addEventListener('click', checkGuess);	// when the guessSubmit button is clicked, run
													// the checkGuess() function
function setGameOver() {
	guessField.disabled = true;		// disable input field
	guessSubmit.disabled = true;	// disable submit button
	resetButton = document.createElement('button')						// create a <button></button> element
	resetButton.textContent = 'Start New Game.';						// make the button say 'Start New Game.'
	document.querySelector('.resultParas').appendChild(resetButton);	// add the <button></button> to the bottom of the page
	resetButton.addEventListener('click', resetGame)					// if resetButton is clicked, run the resetGame() function
}

function resetGame() {
	guessCount = 1;		// set guessCount back down to 1

	var resetParas = document.querySelectorAll('.resultParas p');		// grab all the <p></p> elements in 
																		// the .resultParas (list)
	for (var i = 0 ; i < resetParas.length ; i++) {		// init i as 0, for i is less than resetParas.length,
		resetParas[i].textContent = '';					// clear content of <p></p> and add 1 to i count
	}

	resetButton.parentNode.removeChild(resetButton);	// remove the button created in setGameOver() 

	guessField.disabled = false;	// re-enable the guessField
	guessSubmit.disabled = false;	// re-enable the guessSubmit 
	guessField.value = '';			// clear content inside guessField input
	guessField.focus();				// automatically set cursor inside field

	lastResult.style.backgroundColor = 'white';		// remove green/red background color

	randomNumber = Math.floor(Math.random() * 100) + 1;		// set randomNumber to a new number
}