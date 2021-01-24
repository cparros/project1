var userHand = []; //array of card values for user
var dealerHand = []; //array of card values for dealer

var backOfCard = "assets/Images/back-of-card.jpg"; //image used for back of cards
var deckID; //ID for the deck

// Set variables for card values 

var userWins = 0; // (total user wins)
var userLosses = 0; // (tottal user losses)
var userScore; // (total value in hand)
var dealerScore; // (total value in hand)
var totalValues = []; //user value array, contains all values of cards in userHand
var totalDealerValues = []; //dealer value array, contains all values of cards in dealerHand
var newGameBtn = $("#newGameButton") //sets the jquery to a variable
var endOfGame; //used to determine if game over, used for prevent user from clicking other buttons aside from new game, while also not hiding since it looks better
var dealerDrawingCards = []; //array of card values for dealer to draw from
var secondCardImg; //image value of the hidden second dealer card
var oneAce; //used to determine when the first ace is used
var initialHandUser; //determines if it is the first two dealt cards for user
var handIndex = 2; //used for adding cards for user since it will grab the index where the newest card is

// Add bet totals to local storage?



$(document).ready(function() {

    //calls dicebear function
    diceBear();

    //sum of hand will add up the users total hand to the userScore and will call determineCardValue() to push the cards to the arrays
    function sumOfHand() {
        var totalHandVal;

        if (initialHandUser === true) {
            for (var i = 0; i < userHand.length; i++) {
                var cardVal = userHand[i].charAt(0);
                determineCardValue(cardVal, userScore, totalValues);
                totalHandVal = totalValues.reduce((a, b) => a + b, 0);
                userScore = totalHandVal;

                var handVal = $('.yourHand');
                handVal.text("Your Hand:"+totalHandVal);
            }
            initialHandUser = false;
        } else {
            var cardVal = userHand[handIndex].charAt(0);
            handIndex++;

            determineCardValue(cardVal, userScore, totalValues);
            totalHandVal = totalValues.reduce((a, b) => a + b, 0);
            userScore = totalHandVal;

            var handVal = $('.yourHand');
            handVal.text("Your Hand:"+totalHandVal);

            if(userScore > 21 ) {
            endOfGame = true;
            userLosses++;
            displayScores();
            displayWinLoss("loser");
            }
        }

    }

    //determineCardValue will determine the value of cards and will push those values to the different arrays
    //@param cardVal - string value of what the card is
    //@param userOrDealerScore - The current score of the user/dealer
    //@param wherePush - The array of card values
    function determineCardValue(cardVal, userOrDealerScore, wherePush) {
        if (oneAce) {
            if (cardVal === "A") {
                cardVal = 1;
                wherePush.push(cardVal);
            } else if (cardVal === "J" || cardVal ==="K" || cardVal ==="Q" || cardVal ==="0") {
                cardVal = 10;
                wherePush.push(cardVal);
            } else if(cardVal === "2" || cardVal ==="3" || cardVal ==="4" || cardVal ==="5" || cardVal ==="6" || cardVal ==="7" || cardVal ==="8"  || cardVal ==="9") {
                cardVal = parseInt(cardVal);
                wherePush.push(cardVal);
            }
            var tempTotal = wherePush.reduce((a, b) => a + b, 0);
            if (tempTotal> 21) {
                var index;
                for (var i = 0; i < wherePush.length; i++) {
                    if (wherePush[i] == 11) {
                        index = i;
                    }
                }
                wherePush.splice(index, 1);
                //1 is the new ace value
                wherePush.push(1);
                oneAce = false; //11 was removed so no need for this anymore since other stuff should catch
            } else {
                //nothing
            }
        } else if(cardVal === "A" && userOrDealerScore < 11){
            cardVal = 11;
            wherePush.push(cardVal);
            oneAce = true;
        } else if(userOrDealerScore >= 11 && cardVal === "A"){
            cardVal = 1;
            wherePush.push(cardVal);
        } else if(cardVal === "J" || cardVal ==="K" || cardVal ==="Q" || cardVal ==="0"){
            cardVal = 10;
            wherePush.push(cardVal);
        } else if(cardVal === "2" || cardVal ==="3" || cardVal ==="4" || cardVal ==="5" || cardVal ==="6" || cardVal ==="7" || cardVal ==="8"  || cardVal ==="9")  {
            wherePush.push(parseInt(cardVal));
        } 
    }
    
    //This function displays the scores to the score div
    function displayScores()    {
        $(".winsScore").empty();
        $(".lossesScore").empty();
        $(".winsScore").append("Wins: " + userWins);
        $(".lossesScore").append("Losses: " + userLosses);
    }
    
    //This function will show the win/loss/push block
    //@param outcome - the outcome of the game to display
    function displayWinLoss(outcome)   {
        setTimeout(function(){
            document.getElementById(outcome).style.display = "block";
        }, 1000);
    }


    //When the new game button is clicked
    //In this function we set a lot of our initial values due to this resetting the game itself for a new hand
    //This function will also call shuffleCards which makes the deck
    newGameBtn.on("click", function(event) {
        event.preventDefault();
        endOfGame = false;
        oneAce = false;
        initialHandUser = true;
        dealerDrawingCards = [];
        totalValues = [];
        handIndex = 2;
        document.getElementById("winner").style.display = "none";
        document.getElementById("push").style.display = "none";
        document.getElementById("loser").style.display = "none";
        $('.dealerHand').empty();
        $('.userHand').empty();
        userHand = [];

        shuffleCards();
    });

    //stayButton ends the game for the user and does the calculations for the dealer
    $("#stayButton").on("click", function(event) {
        //This is used to make sure user doesn't click on buttons at end and mess with game
        if (endOfGame) {
            return;
        }
        oneAce = false;
        totalDealerValues = [];


        //This will take the first two dealer values and determine their values and push them
        for (var i = 0; i < dealerHand.length; i++) {
            var valueOfCard = dealerHand[i].charAt(0);

            determineCardValue(valueOfCard, dealerScore, totalDealerValues);
            var totalHandVal = totalDealerValues.reduce((a, b) => a + b, 0);
            dealerScore = totalHandVal;
        }

        //gets users total hand value and compares it to dealers to determine if dealer blackjack
        var totalHandValOfUser = totalValues.reduce((a, b) => a + b, 0);
        if(totalHandVal === 21 && totalHandValOfUser < 21) {
            endOfGame = true;
            userLosses++;
            displayScores();
            displayWinLoss("loser");
            return;
        }


        //counter that will go through the made array 
        var count = 0;
        //sets up the dealerTotalHandVal variable which is the total amount in their hand array
        var dealerTotalHandVal;
        //while loop that will keep going if dealer value is below 17
        while (dealerScore < 17) {
            var cardArray = dealerDrawingCards[count];
            var cardValue = cardArray[0].charAt(0);
            var cardImg = cardArray[1];
            var dealerUL = $(".dealerHand");

            addCard(dealerUL, cardImg);

            determineCardValue(cardValue, dealerScore, totalDealerValues);
            dealerTotalHandVal = totalDealerValues.reduce((a, b) => a + b, 0);
            dealerScore = dealerTotalHandVal;

            count++;
        }

        //dealer bust
        if(dealerTotalHandVal > 21 ) {
            endOfGame = true;
            userWins++;
            displayScores();
            displayWinLoss("winner");
            return;
        }

        compareHands();

    });

    //shuffles cards throughout the api and gets deck id
    function shuffleCards() {
        var shuffle = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6";

        $.ajax({
            url: shuffle,
            method: "GET"
        }).then(function(deck) {
            deckID = deck.deck_id;
            drawCards(deckID);
           
        });


    }

    //draws the two starting cards for dealer and user and displays them. In addition to this it makes the dealers pile of cards.
    //@param text - the deckID
    function drawCards(text) {
        userHand = [];
        dealerHand = [];
        userScore = 0;
        dealerScore = 0;
    
        //users first 2 cards
        var userDraw = "https://deckofcardsapi.com/api/deck/" + text + "/draw/?count=2";
        $.ajax({
            url: userDraw,
            method: "GET"
        }).then(function(cards) {
            for (var i = 0; i < cards.cards.length; i++) {
                userHand.push(cards.cards[i].code);
            }
            for (var i = 0; i < userHand.length; i++) {
                var li = $("<li>");
                var img = $("<img>").attr("class", "list-group-item cardImg");
                $(img).attr("src", cards.cards[i].images.png);
                $(li).append(img);
                $(".userHand").append(li);
            }
           
            sumOfHand();
        });

        //dealers first 2 cards
        var dealerDraw = "https://deckofcardsapi.com/api/deck/" + text + "/draw/?count=2";
        $.ajax({
            url: dealerDraw,
            method: "GET"
        }).then(function(cards) {

            for (var i = 0; i < cards.cards.length; i++) {
                dealerHand.push(cards.cards[i].code);
            }

            //when the stay button is pushed this will show what is in the dealers second card place
            $('#stayButton').click(function () {
                if (this.id == 'stayButton') {
                    $(img2).attr("src", cards.cards[1].images.png);
                }
            });

            secondCardImg = cards.cards[1].images.png;
                
            var li = $("<li>");
            var li2 = $("<li>");
            var img = $("<img>").addClass("list-group-item cardImg");
            var img2 = $("<img>").addClass("list-group-item cardImg");
            $(img).attr("src", cards.cards[0].images.png);
            $(img2).attr("src", backOfCard);
            $(li).append(img);
            $(li2).append(img2);
            $(".dealerHand").append(li);
            $(".dealerHand").append(li2);
        });

        //array of cards for dealer to draw from
        var dealerSetOfHands = "https://deckofcardsapi.com/api/deck/" + text + "/draw/?count=20";
        $.ajax({
            url: dealerSetOfHands,
            method: "GET"
        }).then(function(cards) {
            for (var i = 0; i < 20; i++) {
                var codeAndImage = [];
                codeAndImage.push(cards.cards[i].code);
                codeAndImage.push(cards.cards[i].image);

                dealerDrawingCards.push(codeAndImage);
            }
        });
       
    }

    

    //function for adding cards to the table and displaying them
    //@param dealerOrUser - the class for dealer or user hand
    //@param cardImgLink - the link for the card's image
    function addCard(dealerOrUser, cardImgLink)  {
        var li = $("<li>");
        var img = $("<img>").attr("class", "list-group-item cardImg");
        $(img).attr("src", cardImgLink);
        $(li).append(img);
        $(dealerOrUser).append(li);
    }

    //when the hitbutton is clicked it will grab a card from the ajax and display said card while also calling the sumOfHand to add to the array
    $('#hitButton').click(function(e){
        e.preventDefault();
        //if statement used to prevent the user from spam clicking buttons after game is over
        if (endOfGame) {
            return;
        }
        var userDraw = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1";
        $.ajax({
            url: userDraw,
            method: "GET"
        }).then(function(cards) {

            userHand.push(cards.cards[0].code);
            var userUL = $(".userHand");
            var cardImage = cards.cards[0].image;
            addCard(userUL, cardImage);
            sumOfHand();
        });
       
    });

    //Compares the user and dealer values to declare a victor
    function compareHands () {
        if (userScore === dealerScore) {
            endOfGame = true;
            displayWinLoss("push");
        } else if (userScore === 21 && dealerScore === 21) {
            endOfGame = true;
            displayWinLoss("push");
        } else if (userScore > dealerScore) {
            endOfGame = true;
            userWins++;
            displayScores();
            displayWinLoss("winner");
        } else if (dealerScore > userScore) {
            endOfGame = true;
            userLosses++;
            displayScores();
            displayWinLoss("loser");
        }
    }


//calls dicebear api to make a randomly generated face, 10000 different possibilities for faces in the program
function diceBear () {
     var faceId = Math.floor(Math.random() * 10000);
     
     //we can change this later if we have the time for the user to input their name or something
     var userFaceID = Math.floor(Math.random() * 10000);

     var faceMaker = "https://avatars.dicebear.com/4.5/api/human/" + faceId + ".svg?background=%230000ff";
     var faceMakerUser = "https://avatars.dicebear.com/4.5/api/human/" + userFaceID + ".svg?background=%230000ff";
    
     $(".img-of-dealer").attr("src", faceMaker);
     $(".img-of-player").attr("src", faceMakerUser);

 }
});