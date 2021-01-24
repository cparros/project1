var userHand = [];
var dealerHand = [];

var backOfCard = "assets/Images/back-of-card.jpg";
var deckID;

// Set variables for card values 

var userWins = 0; // (total user wins)
var userLosses = 0; // (tottal user losses)
var userScore; // (total value in hand)
var dealerScore; // (total value in hand)
var totalScore = [];
var totalValues = [];
var totalDealerValues = [];
var userBetTotal;
var newGameBtn = $("#newGameButton")
var endOfGame;
var dealerDrawingCards = [];
var secondCardImg;
var oneAce;
var initialHandUser;
var handIndex = 2;

// Add bet totals to local storage?



$(document).ready(function() {

    diceBear();

    function sumOfHand() {
        var totalHandVal;

        if (initialHandUser === true) {
            for (var i = 0; i < userHand.length; i++) {
                var cardVal = userHand[i].charAt(0);
                determineCardValue(cardVal, userScore, totalValues);
                console.log("usersCards:"+totalValues);
                totalHandVal = totalValues.reduce((a, b) => a + b, 0);
                userScore = totalHandVal;

                var handVal = $('.yourHand');
                handVal.text("Your Hand:"+totalHandVal);
            }
            initialHandUser = false;
        } else {
            var cardVal = userHand[handIndex].charAt(0);
            handIndex++;
            console.log(totalValues);

            determineCardValue(cardVal, userScore, totalValues);
            totalHandVal = totalValues.reduce((a, b) => a + b, 0);
            console.log("total hand value at 50:"+totalHandVal);
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

    function determineCardValue(cardVal, userOrDealerScore, wherePush) {
        if (oneAce) {
            if (cardVal === "A") {
                cardVal = 1;
                wherePush.push(cardVal);
            } else if (cardVal === "J" || cardVal ==="K" || cardVal ==="Q" || cardVal ==="0") {
                cardVal = 10;
                wherePush.push(cardVal);
            } else if(cardVal === "2" || cardVal ==="3" || cardVal ==="4" || cardVal ==="5" || cardVal ==="6" || cardVal ==="7" || cardVal ==="8"  || cardVal ==="9") {
                console.log("testingstart: ");
                cardVal = parseInt(cardVal);
                console.log("testingend: "+cardVal);
                wherePush.push(cardVal);
            }
            var tempTotal = wherePush.reduce((a, b) => a + b, 0);
            if (tempTotal> 21) {
                var index;
                console.log(wherePush.length);
                for (var i = 0; i < wherePush.length; i++) {
                    if (wherePush[i] == 11) {
                        index = i;
                    }
                    console.log("for loop");
                }
                console.log(index +"index outside of for loop");
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
            console.log("ace = 1", cardVal, userScore);
        } else if(cardVal === "J" || cardVal ==="K" || cardVal ==="Q" || cardVal ==="0"){
            cardVal = 10;
            wherePush.push(cardVal);
        } else if(cardVal === "2" || cardVal ==="3" || cardVal ==="4" || cardVal ==="5" || cardVal ==="6" || cardVal ==="7" || cardVal ==="8"  || cardVal ==="9")  {
            wherePush.push(parseInt(cardVal));
        } 
    }

    //This will be called at the end of the compareResults function as well as in other places where the game can end before then. Scores are also messed up with buttons being clicked after a game is over so im going to suggest hiding them after a game over and showing them at the start of a game
    
    function displayScores()    {
        $(".winsScore").empty();
        $(".lossesScore").empty();
        $(".winsScore").append("Wins: " + userWins);
        $(".lossesScore").append("Losses: " + userLosses);
    }
    
    function displayWinLoss(outcome)   {
        setTimeout(function(){
            document.getElementById(outcome).style.display = "block";
        }, 1000);
    }


    // when new game button is clicked

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


        if($('#winner') || $('#loser') === true){
        $('#winner').hide();
        $('#loser').hide();
        } else {
        }

        shuffleCards();
    });

    $("#stayButton").on("click", function(event) {
        if (endOfGame) {
            return;
        }
        oneAce = false;
        totalDealerValues = [];

        for (var i = 0; i < dealerHand.length; i++) {
            var valueOfCard = dealerHand[i].charAt(0);

            determineCardValue(valueOfCard, dealerScore, totalDealerValues);
            console.log("DealersCards:"+totalDealerValues);
            var totalHandVal = totalDealerValues.reduce((a, b) => a + b, 0);
            dealerScore = totalHandVal;
        }

        var totalHandValOfUser = totalValues.reduce((a, b) => a + b, 0);
        if(totalHandVal === 21 && totalHandValOfUser < 21) {
            endOfGame = true;
            userLosses++;
            displayScores();
            displayWinLoss("loser");
            console.log("DEALER BLACKJACK");
            return;
        }


        
        //change to while after working
        //modified a bit since tried getting it to work with just an if/else and wasnt due to how the api value is grabbed, might need to tell it to wait or something?
        var count = 0;
        var dealerTotalHandVal;
        while (dealerScore < 17) {
            console.log("THE WHILE LOOP IS USED");
            var cardArray = dealerDrawingCards[count];
            console.log(count);
            console.log(cardArray[0].charAt(0));
            console.log(cardArray[1]);
            var cardValue = cardArray[0].charAt(0);
            var cardImg = cardArray[1];
            var dealerUL = $(".dealerHand");

            addCard(dealerUL, cardImg);

            determineCardValue(cardValue, dealerScore, totalDealerValues);
            dealerTotalHandVal = totalDealerValues.reduce((a, b) => a + b, 0);
            console.log(dealerTotalHandVal);
            dealerScore = dealerTotalHandVal;

            count++;
        }
        console.log(dealerTotalHandVal);
            if(dealerTotalHandVal > 21 ) {
                endOfGame = true;
                userWins++;
                displayScores();
                displayWinLoss("winner");
                return;
        }

        
            console.log("TOTAL HAND VALUE OF DEALER" + dealerTotalHandVal);
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


    function drawCards(text) {
        userHand = [];
        dealerHand = [];
        userScore = 0;
        dealerScore = 0;
    
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
        var dealerDraw = "https://deckofcardsapi.com/api/deck/" + text + "/draw/?count=2";
        $.ajax({
            url: dealerDraw,
            method: "GET"
        }).then(function(cards) {

            for (var i = 0; i < cards.cards.length; i++) {
                dealerHand.push(cards.cards[i].code);
            }

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
            console.log(dealerDrawingCards);
        });
       
    }

    


    function addCard(dealerOrUser, cardImgLink)  {
        var li = $("<li>");
        var img = $("<img>").attr("class", "list-group-item cardImg");
        $(img).attr("src", cardImgLink);
        $(li).append(img);
        $(dealerOrUser).append(li);
    }

 
    $('#hitButton').click(function(e){
        e.preventDefault();
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
            //append an image tag to divs set in html(ask others about possibly adding two div tags for the users 2 cards. Can be the back of a playing card as example)
            sumOfHand();
           
            //we need to add the value of the card into the array for playerHand
        });
       
    });

    function compareHands () {
        console.log("user final score - " +userScore);
        console.log("dealer final score - " +dealerScore);
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



//dicebear info

function diceBear () {
     var faceId = Math.floor(Math.random() * 10000);
     
     //we can change this later if we have the time for the user to input their name or something
     var userFaceID = Math.floor(Math.random() * 10000);

     var faceMaker = "https://avatars.dicebear.com/4.5/api/human/" + faceId + ".svg?background=%230000ff";
     var faceMakerUser = "https://avatars.dicebear.com/4.5/api/human/" + userFaceID + ".svg?background=%230000ff";
    
     $(".img-of-dealer").attr("src", faceMaker);
     $(".img-of-player").attr("src", faceMakerUser);

 }

//We could use dicebear to have the user give us a dealer name and user name which will give them randomly generated avatars
//Different for male and female so they would have to give use gender as well as name

});