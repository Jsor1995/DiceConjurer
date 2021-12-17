$(document).ready(function () {
    //pull statblock
    $(".animal-btn").click(async function () { 
        var animal = $(this).text();
        console.log(animal);
        try {
            var response = await fetch(`/create_card/${animal}`);
            var result = await response.json();
            console.log(result);
            cardCount(result);
            console.log(result.actions);
            console.log(diceRoll(20));
            $(".card").toggle();
            
        }
        catch {
            console.log("Error: Could Not Retreive Statblock")
        }
    });
});

function statblock(data) {
    console.log("test");
    var title = data.name;
    var ac = data.armor_class;
    var cr = data.challenge_rating;
    var cardhtml = 
        `<div class="card ">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
            </div>
            <ul class="list-group list-group-flush stat-detail">
                <li class="list-group-item">Armor Class: ${ac}</li>
                <li class="list-group-item">Challenge Rating: ${cr}</li>
            </ul>
            <div class="card-body dice-button">
                <a href="#" class="btn btn-primary">Attack</a>
            </div>
        </div>`;
    
    $(".card-deck").append(cardhtml);
    return;
}

function cardCount(data) {
    var cr = data.challenge_rating;
    var numIter;
    if (cr <= 0.25) {
        numIter = 8;
    }
    else if (cr <= 0.5) {
        numIter = 4;
    }
    else if (cr <= 1) {
        numIter = 2;

    }
    else if (cr <= 2) {
        numIter = 1;
    }
    else {
        console.log("Challenge Rating Not Found");

    }
    $(".card-deck").empty();

    for (var i = 0; i < numIter; i++) {
        console.log(i);
        statblock(data);
    }
    $(".card").toggle();
};

function diceRoll(formula) {
    console.log("Rolling");
    var roll = Math.floor( Math.random() * formula) + 1; 
    var result = droll.roll('3d6+1');

    console.log(result);
    return roll;
}