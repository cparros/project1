var userHand = [];
var dealerHand = [];

var backOfCard = "assets/Images/back-of-card.jpg";
var deckID;

// Set variables for card values 

var userWins = 0 // (total user wins)
var userLosses = 0 // (tottal user losses)
var userScore; // (total value in hand)
var dealerScore; // (total value in hand)
var totalScore = []
var totalValues = []
var totalDealerValues = [];
var userBetTotal;
var newGameBtn = $("#newGameButton")
var endOfGame;
// Add bet totals to local storage?



$(document).ready(function() {

    diceBear();

    function sumOfHand() {
        totalValues = [];
        var value = 0;
        userHand.forEach(function(index){
            var cardVal = index[0];
            

            if(cardVal === "J" || cardVal ==="K" || cardVal ==="Q" || cardVal ==="0"|| cardVal === "A"){
                
                cardVal = 10;
                totalValues.push(cardVal);
                
            } else if(cardVal === "2" || cardVal ==="3" || cardVal ==="4" || cardVal ==="5" || cardVal ==="6" || cardVal ==="7" || cardVal ==="8"  || cardVal ==="9")  {
                
                totalValues.push(parseInt(cardVal));

            } 
            var totalHandVal = totalValues.reduce((a, b) => a + b, 0);
            userScore = totalHandVal;
            console.log("TOTAL HAND VALUE OF USER" + totalHandVal);
            // set a variable here to check the dealers hand total so we can cross referece them for a push
            if(totalHandVal === 21) {
                //var winnerLoser = $('.winnerLoser')
                //var playArea = document.getElementById("playArea");
                
                //playArea.empty()

                //var winnerDiv = $('<div id="winner">')
                
                //winnerDiv.text("You WIN")
                //winnerLoser.append(winnerDiv)

                document.getElementById("winner").style.display = "block";
                endOfGame = true;
                userWins++;
                displayScores();


            } else if(totalHandVal > 21 ) {
                //var winnerLoser= $('.winnerLoser')
                //var playArea = document.getElementById("playArea");
                //playArea.empty()

                //var loserDiv = $('<div id="loser">')
                //loserDiv.text("You LOSE")
                //winnerLoser.append(loserDiv)

                document.getElementById("loser").style.display = "block";
                endOfGame = true;
                userLosses++;
                displayScores();
            }
        })
    }

    //This will be called at the end of the compareResults function as well as in other places where the game can end before then. Scores are also messed up with buttons being clicked after a game is over so im going to suggest hiding them after a game over and showing them at the start of a game
    function displayScores()    {
        $(".winsScore").empty();
        $(".lossesScore").empty();
        $(".winsScore").append("Wins: " + userWins);
        $(".lossesScore").append("Losses: " + userLosses);
    }

    // when new game button is clicked

    newGameBtn.on("click", function(event) {
        event.preventDefault();
        endOfGame = false;
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
        if (endOfGame === true) {
            return;
        }

        totalDealerValues = [];

        for (var i = 0; i < dealerHand.length; i++) {
            var valueOfCard = dealerHand[i].charAt(0);

            if(valueOfCard === "J" || valueOfCard ==="K" || valueOfCard ==="Q" || valueOfCard ==="0"|| valueOfCard === "A"){
                valueOfCard = 10;              
                totalDealerValues.push(valueOfCard);
                
            } else if(valueOfCard === "2" || valueOfCard ==="3" || valueOfCard ==="4" || valueOfCard ==="5" || valueOfCard ==="6" || valueOfCard ==="7" || valueOfCard ==="8"  || valueOfCard ==="9")  {
                              
                totalDealerValues.push(parseInt(valueOfCard));
            }
            console.log("DealersCards:"+totalDealerValues);
            var totalHandVal = totalDealerValues.reduce((a, b) => a + b, 0);
            dealerScore = totalHandVal;
        }

        var totalHandValOfUser = totalValues.reduce((a, b) => a + b, 0);
        if(totalHandVal === 21 && totalHandValOfUser < 21) {
            document.getElementById("loser").style.display = "block";
            endOfGame = true;
            userLosses++;
            displayScores();
            return;
        }
        
        //change to while after working
        //modified a bit since tried getting it to work with just an if/else and wasnt due to how the api value is grabbed, might need to tell it to wait or something?
        
        /**
        if (dealerScore < 17) {
            console.log("deep");
            var dealerDraw = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1";

            $.ajax({
                url: dealerDraw,
                method: "GET"
            }).then(function(deck) {
                dealerHand.push(deck.cards[0].code);
                var userUL = $(".dealerHand");
                var cardImage = deck.cards[0].image;
                addCard(userUL, cardImage);

                var cardValue = dealerHand[dealerHand.length - 1].charAt(0);
                console.log("this is val"+cardValue);

                if(cardValue === "J" || cardValue ==="K" || cardValue ==="Q" || cardValue ==="0"|| cardValue === "A"){
                    
                    cardValue = 10;
                    totalDealerValues.push(cardValue);
                    
                } else if(cardValue === "2" || cardValue ==="3" || cardValue ==="4" || cardValue ==="5" || cardValue ==="6" || cardValue ==="7" || cardValue ==="8"  || cardValue ==="9")  {
                   
                    totalDealerValues.push(parseInt(cardValue));

                }
                totalHandVal = totalDealerValues.reduce((a, b) => a + b, 0);
                dealerScore = totalHandVal;
            });
            if(totalHandVal > 21 ) {
                document.getElementById("winner").style.display = "block";
                endOfGame = true;
                userWins++;
                displayScores();
                return;
            }
            //call some compare type function here to compare the values of user and dealer
            console.log("TOTAL HAND VALUE OF DEALER" + totalHandVal);
            compareHands();
            
        } else {
            console.log("TOTAL HAND VALUE OF DEALER" + totalHandVal);
            compareHands();
        }
        */
            console.log("TOTAL HAND VALUE OF DEALER" + totalHandVal);
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
       
    }

    


    function addCard(dealerOrUser, cardImgLink)  {
        var li = $("<li>");
        var img = $("<img>").attr("class", "list-group-item cardImg");
        $(img).attr("src", cardImgLink);
        $(li).append(img);
        $(dealerOrUser).append(li);
    }

    //CP Hit BTN
    //function hitMe(deckID) 
    $('#hitButton').click(function(e){
        e.preventDefault();
        if (endOfGame === true) {
            return;
        }
        //$(".userHand").empty()
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
        if (userScore === dealerScore)  {
            document.getElementById("push").style.display = "block";
            endOfGame = true;
        } else if (userScore > dealerScore) {
            document.getElementById("winner").style.display = "block";
            endOfGame = true;
            userWins++;
            displayScores();
        } else if (dealerScore > userScore) {
            document.getElementById("loser").style.display = "block";
            endOfGame = true;
            userLosses++;
            displayScores();
        }
    }




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