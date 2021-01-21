var userHand = [];
var dealerHand = [];

var backOfCard = "assets/Images/back-of-card.jpg";
var deckID;

// Set variables for card values 

var userWins // (total user wins)
var userLosses // (tottal user losses)
var userScore; // (total value in hand)
var dealerScore; // (total value in hand)
var totalScore = []
var totalValues = []
var userBetTotal;
// Add bet totals to local storage?



$(document).ready(function() {

    function sumOfHand() {
        totalValues = []
        var value = 0
        userHand.forEach(function(index){
            var cardVal = index[0]
            var total = 0

            if(cardVal === "J" || cardVal ==="K" || cardVal ==="Q" || cardVal ==="0"|| cardVal === "A"){
                cardVal = 10
                console.log("one: " + cardVal)
              
                totalValues.push(cardVal)
                
            } else if(cardVal === "2" || cardVal ==="3" || cardVal ==="4" || cardVal ==="5" || cardVal ==="6" || cardVal ==="7" || cardVal ==="8"  || cardVal ==="9")  {
               
                console.log("Two: " + cardVal)
                console.log(parseInt(cardVal))
               
                totalValues.push(parseInt(cardVal))
            } 
            console.log(totalValues.reduce((a, b) => a + b, 0))
        })
    }

    // when new game button is clicked
    $("#newGameButton").on("click", function(event) {
        event.preventDefault();
        $(".dealerHand").empty();
        userHand = [];

        //displaying back of cards for dealers hand
        var li = $("<li>");
        var li2 = $("<li>");
        var img = $("<img>").addClass("list-group-item cardImg");
        var img2 = $("<img>").addClass("list-group-item cardImg");
        $(img).attr("src", backOfCard);
        $(img2).attr("src", backOfCard);
        $(li).append(img);
        $(li2).append(img2);
        $(".dealerHand").append(li);
        $(".dealerHand").append(li2);

        shuffleCards();
        
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
            
            hitMe(deckID)
        });


    }


    function drawCards(text) {
        //set currentHand div to empty for both players
        $(".userHand").empty();
        userScore = 0;
        dealerScore = 0;
        // console.log(text);

        var userDraw = "https://deckofcardsapi.com/api/deck/" + text + "/draw/?count=2";
        $.ajax({
            url: userDraw,
            method: "GET"
        }).then(function(cards) {
            console.log(cards);


            for (var i = 0; i < cards.cards.length; i++) {
                userHand.push(cards.cards[i].code);
            }  
            console.log(userHand);
            var userUL = $(".userHand");
            displayCards(userHand, userUL);
            //append an image tag to divs set in html(ask others about possibly adding two div tags for the users 2 cards. Can be the back of a playing card as example)

            //we need to add the value of the card into the array for playerHand
        });
        var dealerDraw = "https://deckofcardsapi.com/api/deck/" + text + "/draw/?count=2";
        $.ajax({
            url: dealerDraw,
            method: "GET"
        }).then(function(cards) {
            // var dealerUL = $(".dealerHand");
            // dealCards(dealerHand, dealerUL);
            //append an image tag to divs set in html(ask others about possibly adding two div tags for the users 2 cards. Can be the back of a playing card as example)

            //we need to add the value of the card into the array for dealerHand
            console.log(cards);
        });
       
    }

    //handArr param = dealer or user array & dealerOrUser = dealer or user <ul>
    function displayCards(handArr, dealerOrUser) {
        for (var i = 0; i < handArr.length; i++) {
            var li = $("<li>");
            var img = $("<img>").attr("class", "list-group-item cardImg", "src", "https://deckofcardsapi.com/static/img/" + handArr[i] + ".png");
            $(img).attr("src", "https://deckofcardsapi.com/static/img/" + handArr[i] + ".png")
            $(li).append(img);
            $(dealerOrUser).append(li)
        }
    }

    //CP Hit BTN
    function hitMe(deckID) {
    $('#hitButton').click(function(e){
        e.preventDefault();
        $(".userHand").empty()
        console.log('clicked')
        var userDraw = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1";
        console.log(userDraw)
        $.ajax({
            url: userDraw,
            method: "GET"
        }).then(function(cards) {
            console.log(cards);

            for (var i = 0; i < 1; i++) {
                userHand.push(cards.cards[i].code);
            }  
            console.log(userHand);
            var userUL = $(".userHand");
            displayCards(userHand, userUL);
            //append an image tag to divs set in html(ask others about possibly adding two div tags for the users 2 cards. Can be the back of a playing card as example)
            sumOfHand()
           
            //we need to add the value of the card into the array for playerHand
        });
       
    })

    }

    


    

    //testing
    //console.log(deckID);
    //drawCards();
    // diceBear();




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

// function diceBear () {
//     var faceId = Math.floor(Math.random() * 10000);
//     // console.log(faceId);

//     // var faceMaker = "https://avatars.dicebear.com/4.5/api/human/" + faceId + ".svg?background=%230000ff";
//     // console.log(faceMaker);
// }

//We could use dicebear to have the user give us a dealer name and user name which will give them randomly generated avatars
//Different for male and female so they would have to give use gender as well as name

});

