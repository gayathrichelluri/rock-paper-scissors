let scores = {human: 0, bot: 0};
let rps = ['rock', 'paper', 'scissors'];

function rpsGame(humanChoice) {
    let botChoice = rpsBot();
    let finalResult = whoWon(humanChoice.id, botChoice);
    rpsFrontEnd(humanChoice.id, botChoice, finalResult);
}

function rpsBot() {
    return rps[Math.floor(Math.random() * 3)]; 
}

function reset() {
    scores = {human: 0, bot: 0};
    updateScoreBoard("Let's start the game!");
}

function whoWon(humanChoice, botChoice) {

    var rpsDatabase = {
        'rock': {'rock': 0.5, 'paper': 0, 'scissors': 1},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'rock': 0, 'paper': 1, 'scissors': 0.5}
    }

    humanScore = rpsDatabase[humanChoice][botChoice];
    botScore = rpsDatabase[botChoice][humanChoice];

    if(humanScore === botScore)
        return {message: "It's a draw!", result: 'Tied!'};

    scores.human += humanScore
    scores.bot += botScore;

    if(humanScore === 0)
        return {message: `${botChoice} beats ${humanChoice}!`, result: 'You lost!'};
    else 
        return {message: `${humanChoice} beats ${botChoice}!`, result: 'You won!'}; 
}

function rpsFrontEnd(human, bot, final){

    var imagesDatabase = {
        'rock': document.getElementById('rock'),
        'paper': document.getElementById('paper'),
        'scissors': document.getElementById('scissors')
    }

    var temp = document.getElementById('rps');

    rps.map(type => {
        document.getElementById(type).remove();
    });

    var humanImage = createImage(imagesDatabase[human].src);
    var botImage = createImage(imagesDatabase[bot].src);
    

    if(final.result.includes("lost")) {
        humanImage.setAttribute('id', 'lost');
        botImage.setAttribute('id', 'won');
    } else if(final.result.includes("won")) {
        humanImage.setAttribute('id', 'won');
        botImage.setAttribute('id', 'lost');
    }
    
    var text = document.createTextNode(final.result);
    var resultDiv = document.createElement('div')
    resultDiv.setAttribute('id','result-div');
    resultDiv.appendChild(text);

    temp.appendChild(humanImage);
    temp.appendChild(resultDiv);
    temp.appendChild(botImage);

    setTimeout(function(){
        temp.removeChild(humanImage);
        temp.removeChild(resultDiv);
        temp.removeChild(botImage);

        rps.map(type => {
            temp.appendChild(imagesDatabase[type]);
        });
    }, 1000);
    
    updateScoreBoard(final.message);
}

function createImage(sourceImage) {
    var image = document.createElement('img');
    image.setAttribute('src', sourceImage);
    image.setAttribute('id', 'tied');
    return image;
}

function updateScoreBoard(message){
    document.getElementById('user-score').innerHTML = scores.human;
    document.getElementById('bot-score').innerHTML = scores.bot;
    document.getElementById('result-text').innerHTML = message;
}