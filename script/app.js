// Elements
const chooseXButton = document.querySelector('.choose-x-wrapper');
const chooseZeroButton = document.querySelector('.choose-zero-wrapper');



// Functions



function gameStarter(userChoice) {
	const usersChoice = userChoice;
	let currentPlayer = userChoice;

	let playerObject = {
		'x': 'zero',
		'zero': 'x'
	};

	let playerObjectImage = {
		'x': 'img/x-icon.svg',
		'zero': 'img/zero-icon.svg'
	};

	

	const gameStartOption = (function() {

		let gameIndicator = true;
		let currentPlayer = userChoice;
		let player1Numbers = [];
		let player2Numbers = [];

		const gameStartAnimation = () => {
			animationOfStarting();
		};

		const winnerModal = (winnersName) => {
			const winnerModalElement = document.createElement('div');
			winnerModalElement.classList.add('winner-modal');
			const winnerModalRetryButton = document.createElement('div');
			winnerModalRetryButton.classList.add('winner-modal-retry');
			winnerModalRetryButton.textContent = 'retry';

			// retry button logic
			winnerModalRetryButton.onclick = function() {
				window.location.reload();
			};

			const winnerModalText = document.createElement('h3');
			winnerModalText.classList.add('winner-modal-text');
			winnerModalText.textContent = winnersName;
			winnerModalElement.appendChild(winnerModalText);
			winnerModalElement.appendChild(winnerModalRetryButton);
			document.body.appendChild(winnerModalElement); 
			const winnerBackgroundModal = document.createElement('div');
			winnerBackgroundModal.classList.add('winner-background-modal');
			document.body.appendChild(winnerBackgroundModal);
		};

		const validateWinner = () => {

			// Winner's numbers 
			const winnersNumbers = [
				[1, 2, 3],[4, 5, 6],[7, 8, 9],
				[1, 4, 7],[2, 5, 8],[3, 6, 9],
				[1, 5, 9],[3, 5, 7]
			];

			if(player1Numbers.length > 2) {
				for(let i = 0; i < winnersNumbers.length; i++) {
					const checkingArray = winnersNumbers[i];
					let counterPart = 0;
					for(let m = 0; m < checkingArray.length; m++) {
						let checkOrNot = false;
						for(let t = 0; t < player1Numbers.length; t++) {
							if(checkingArray[m] === Number(player1Numbers[t])) {
								checkOrNot = true;
							};
						};
						if(checkOrNot) {
							counterPart = counterPart + 1;
						};
					};
					if(counterPart === 3) {
						return {
							isThereAWinner: true,
							whoIsWinner: 'Winner is: X'
						};
					};
				};	
			};

			if(player2Numbers.length > 2) {
				for(let i = 0; i < winnersNumbers.length; i++) {
					const checkingArray = winnersNumbers[i];
					let counterPart = 0;
					for(let m = 0; m < checkingArray.length; m++) {
						let checkOrNot = false;
						for(let t = 0; t < player2Numbers.length; t++) {
							if(checkingArray[m] === Number(player2Numbers[t])) {
								checkOrNot = true;
							};
						};
						if(checkOrNot) {
							counterPart = counterPart + 1;
						};
					};
					if(counterPart === 3) {
						return {
							isThereAWinner: true,
							whoIsWinner: 'Winner is: 0'
						};
					};
				};	
			};
		};

		const updateGameStatements = () => {
			const winner = validateWinner();
			if(winner) {
				if(winner.isThereAWinner) {
					winnerModal(winner.whoIsWinner);
				};
			};
			if((player1Numbers.length === 5 && player2Numbers.length === 4) || (player1Numbers.length === 4 && player2Numbers.length === 5)) {
					winnerModal('DRAW');
			};
		};

		const generateCurrentUsersUI = () => {
			const h3Element = document.createElement('h3');
			h3Element.classList.add('current-player-title');
			document.querySelector('.main-wrapper').appendChild(h3Element);	
			if(currentPlayer === 'x') {
				h3Element.textContent = 'Your Turn'; 
			} else if (currentPlayer === 'zero') {
				h3Element.textContent = 'Computer"s turn';
			};
		};

		const generateGameBoard = () => {

			const boardWrapper = document.createElement('div');
			boardWrapper.classList.add('boardWrapper');

			const boardWrapperGrid = document.createElement('div');
			boardWrapperGrid.classList.add('boardWrapperGrid');
			boardWrapper.appendChild(boardWrapperGrid);

			const topBorder = document.createElement('div');
			topBorder.classList.add('top-border');

			const rightBorder = document.createElement('div');
			rightBorder.classList.add('right-border');

			const leftBorder = document.createElement('div');
			leftBorder.classList.add('left-border');

			const bottomBorder = document.createElement('div');
			bottomBorder.classList.add('bottom-border');

			boardWrapper.appendChild(topBorder);
			boardWrapper.appendChild(rightBorder);
			boardWrapper.appendChild(leftBorder);
			boardWrapper.appendChild(bottomBorder);

			for(let i = 1; i < 10; i++) {
				const gameItemUnique = GameItemScema();
				const gameItem = gameItemUnique.generateItemSquare(i);
				boardWrapperGrid.appendChild(gameItem);
			};


			document.querySelector('.main-wrapper').appendChild(boardWrapper);

		};

		const timeGenerator = () => {

			const timerDiv = document.createElement('div');
			timerDiv.classList.add('game-timer');
			
			let timerSeconds = 0;
			let timerSecondsSecond = 0;
			let timerMinutes = 0;

			timerDiv.textContent = `${timerMinutes}:${timerSecondsSecond}${timerSeconds}`;

			const timerInterval = setInterval(function() {

				if(timerSeconds + 1 !== 10) {
					timerSeconds = timerSeconds + 1;
					timerDiv.textContent = `${timerMinutes}:${timerSecondsSecond}${timerSeconds}`;
				} else {
					timerSeconds = 0;
					timerSecondsSecond = timerSecondsSecond + 1;
					timerDiv.textContent = `${timerMinutes}:${timerSecondsSecond}${timerSeconds}`;
				};

				if(timerSecondsSecond === 6) {
					timerSecondsSecond = 0;
					timerMinutes = timerMinutes + 1;
					timerDiv.textContent = `${timerMinutes}:${timerSecondsSecond}${timerSeconds}`;
				};

				if(timerMinutes === 60) {
					clearInterval(timerInterval);
					gameIndicator = false;
				};


			}, 1000);

			const mainWrapperElement = document.querySelector('.main-wrapper');
			mainWrapperElement.appendChild(timerDiv);

		};

		return {
			gameStartAnimation,
			generateGameBoard,
			generateCurrentUsersUI,
			generateGameBoard,
			updateGameStatements,
			player1Numbers,
			player2Numbers,
			timeGenerator
		};
	})();

	// Animation for starting
	gameStartOption.gameStartAnimation();
	// Generate timer
	gameStartOption.timeGenerator();
	// Generate Game Title
	gameStartOption.generateCurrentUsersUI();
	// Generating game board
	gameStartOption.generateGameBoard();

	function GameItemScema() {
		
		let isFilled = false;

		const squareClickEvent = (clickedItem) => {
			if(!isFilled) {
				const h3ElementUpdate = document.querySelector(".current-player-title");
				if(currentPlayer === 'x') {
					h3ElementUpdate.textContent = 'Player 2 Turn';
					gameStartOption.player1Numbers.push(clickedItem.getAttribute('data-item-id'));
				} else if (currentPlayer === 'zero') {
					h3ElementUpdate.textContent = 'Player 1 Turn';
					gameStartOption.player2Numbers.push(clickedItem.getAttribute('data-item-id'));
				};			
				isFilled = true;
				const pathToImage = playerObjectImage[currentPlayer];
				currentPlayer = playerObject[currentPlayer];
				const imgItem = document.createElement('img');
				imgItem.classList.add('gameItem-content');
				imgItem.setAttribute('src', pathToImage);
				clickedItem.appendChild(imgItem);
				gameStartOption.updateGameStatements();
			};
		};

		const generateItemSquare = (itemId) => {
			const gameItem = document.createElement('div');
			gameItem.classList.add('gameItem');
			gameItem.setAttribute('data-item-id', itemId);
			gameItem.addEventListener('click', function(event) {
				squareClickEvent(event.srcElement);
			});
			return gameItem;
		};

		return {
			generateItemSquare
		};

	};
	

};

function animationOfStarting() {
	const bigX = document.querySelector('.big-x');
	const bigZero = document.querySelector('.big-zero');
	const title = document.querySelector('.main-title');
	const pickText = document.querySelector('.pick-who-text');
	const chooseX = document.querySelector('.choose-x-wrapper');
	const chooseZero = document.querySelector('.choose-zero-wrapper');

	// Animate fade
	bigX.style.transform = 'translate(-1000%)';
	bigZero.style.transform = 'translateY(-1000%)';
	title.style.opacity = '0%';
	pickText.style.opacity = '0%';
	chooseX.style.transform = 'translate(-1000%)';
	chooseZero.style.transform = 'translate(1000%)';
};

// Events
chooseXButton.addEventListener('click', function() {
	gameStarter('x');
});

chooseZeroButton.addEventListener('click', function() {
	gameStarter('zero');
});