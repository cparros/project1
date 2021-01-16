var playerHand = [];
var dealerHand = [];

var deckID;

// Set variables for card values 

var userScore; // (total value in hand)
var dealerScore; // (total value in hand)

var userBetTotal;
// Add bet totals to local storage?



$(document).ready(function() {


    //shuffles cards throught the api and gets deck id

    function shuffleCards() {
        var shuffle = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6";

        $.ajax({
            url: shuffle,
            method: "GET"
        }).then(function(deck) {
            deckID = deck.deck_id;
            console.log(deckID);
            drawCards(deckID);
        });

    }


    function drawCards(text) {
        //set currentHand div to empty for both players
        $("#dealerHand").empty();
        $("#userHand").empty();
        userScore = 0;
        dealerScore = 0;
        console.log(text);

        var userDraw = "https://deckofcardsapi.com/api/deck/" + text + "/draw/?count=2";
        $.ajax({
            url: userDraw,
            method: "GET"
        }).then(function(cards) {
            //append an image tag to divs set in html(ask others about possibly adding two div tags for the users 2 cards. Can be the back of a playing card as example)

            //we need to add the value of the card into the array for playerHand
            console.log(cards);
        });
        var dealerDraw = "https://deckofcardsapi.com/api/deck/" + text + "/draw/?count=2";
        $.ajax({
            url: dealerDraw,
            method: "GET"
        }).then(function(cards) {
            //append an image tag to divs set in html(ask others about possibly adding two div tags for the users 2 cards. Can be the back of a playing card as example)

            //we need to add the value of the card into the array for dealerHand
            console.log(cards);
        });
    }

    

    //testing
    shuffleCards();
    //console.log(deckID);
    //drawCards();
    diceBear();




//will probably need some variable that accounts for if this is the first turn, due to doubling down only being an option then(will use this variable to hide the double button after first hit)
//”https://deckofcardsapi.com/api/deck/” + deckID + “/draw/?count=2”
// create hit button event listener for user
// while loop with if statements to determine if user goes above 21 or clicks stay
// while loop where dealer draws cards until reaching 17 or higher, this will utilize if/else trees to see where the current value is and if they should keep hitting




// function compareResults
//will basically compare the values of the user array against the values of the dealer array
//will update the score with the current bet size(winning adds the bet, losing subtracts the bet)

//function generateRandomFace 
//https://github.com/public-apis/public-apis

//dicebear info

function diceBear () {
    var faceId = Math.floor(Math.random() * 10000);
    console.log(faceId);

    var faceMaker = "https://avatars.dicebear.com/4.5/api/human/" + faceId + ".svg?background=%230000ff";
    console.log(faceMaker);
}

//We could use dicebear to have the user give us a dealer name and user name which will give them randomly generated avatars
//Different for male and female so they would have to give use gender as well as name

});

