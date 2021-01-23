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
var userBetTotal;
var newGameBtn = $("#newGameButton")
// Add bet totals to local storage?



$(document).ready(function() {

    diceBear();

    function sumOfHand() {
        totalValues = []
        var value = 0
        userHand.forEach(function(index){
            var cardVal = index[0]
            

            if(cardVal === "J" || cardVal ==="K" || cardVal ==="Q" || cardVal ==="0"|| cardVal === "A"){
                cardVal = 10
                console.log("Card Value1: " + cardVal)
              
                totalValues.push(cardVal)
                
            } else if(cardVal === "2" || cardVal ==="3" || cardVal ==="4" || cardVal ==="5" || cardVal ==="6" || cardVal ==="7" || cardVal ==="8"  || cardVal ==="9")  {
               
                console.log("Card Value2: " + cardVal)
                console.log(parseInt(cardVal))
               
                totalValues.push(parseInt(cardVal))
            } 
            var totalHandVal = totalValues.reduce((a, b) => a + b, 0) 
            console.log(totalHandVal)
            // set a variable here to check the dealers hand total so we can cross referece them for a push
            if(totalHandVal === 21) {
                //var winnerLoser = $('.winnerLoser')
                //var playArea = document.getElementById("playArea");
                
                //playArea.empty()

                //var winnerDiv = $('<div id="winner">')
                
                //winnerDiv.text("You WIN")
                //winnerLoser.append(winnerDiv)
                document.getElementById("winner").style.display = "block";
                userWins++

            } else if(totalHandVal > 21 ) {
                //var winnerLoser= $('.winnerLoser')
                //var playArea = document.getElementById("playArea");
                //playArea.empty()

                //var loserDiv = $('<div id="loser">')
                
                //loserDiv.text("You LOSE")
                //winnerLoser.append(loserDiv)
                document.getElementById("loser").style.display = "block";
                userLosses++
            }
        })
    }

    // when new game button is clicked

    newGameBtn.on("click", function(event) {
        event.preventDefault();
        document.getElementById("winner").style.display = "none";
        document.getElementById("loser").style.display = "none";
        $('.dealerHand').empty();
        $('.userHand').empty();
        userHand = [];


        if($('#winner') || $('#loser') === true){
        $('#winner').hide()
        $('#loser').hide()
        } else {
        }

        shuffleCards();
    });

    $("#stayButton").on("click", function(event) {
        //needs
        console.log(deckID);
        //change to while after working
        if (dealerScore <= 17) {
            
            var dealerDraw = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1";

            $.ajax({
                url: dealerDraw,
                method: "GET"
            }).then(function(deck) {
                var li = $("<li>");
                var img = $("<img>").attr("class", "list-group-item cardImg");
                $(img).attr("src", "https://deckofcardsapi.com/static/img/" + deck.cards[0].code + ".png")
                $(li).append(img);
                var dealerUL = $(".dealerHand");
                $(dealerUL).append(li)
            });

            
        }

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
            console.log("userHand Length: "+userHand.length);
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
             console.log("TEST" + cards.cards.length);

             

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
        console.log(dealerHand);
        //$(".userHand").empty()
        var userDraw = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1";
        $.ajax({
            url: userDraw,
            method: "GET"
        }).then(function(cards) {
            //console.log(cards);

            userHand.push(cards.cards[0].code);
  
            console.log("This is userhand on 236: "+userHand);
            var userUL = $(".userHand");
            var cardImage = cards.cards[0].image;
            addCard(userUL, cardImage);
            //append an image tag to divs set in html(ask others about possibly adding two div tags for the users 2 cards. Can be the back of a playing card as example)
            sumOfHand();
           
            //we need to add the value of the card into the array for playerHand
        });
       
    });




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