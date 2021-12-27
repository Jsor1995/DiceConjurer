$(document).ready(function () {
    //pull statblock
    $(".animal-btn").click(async function () { 
        var animal = $(this).text();
        try {
            var response = await fetch(`/create_card/${animal}`);
            var result = await response.json();
            console.log(result);
            conjureCount(result);
            $(".card").toggle();
        }
        catch {
            console.log("Error: Could Not Retreive Statblock")
        }
    });
});



function createCard(data) {
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
                <li class="list-group-item dice-result"></li>
            </ul>
            <div class="card-body dice-button">
                <a href="#" class="btn btn-primary attack-btn">Attack</a>
            </div>
        </div>`;
    
    $(".card-deck").append(cardhtml);
    $(".attack-btn").off().click(function() {
        try {
            let attack_bonus = attackBonusFind(data.actions);
            $(this).parent().parent().find('.dice-result').text(attackRoll(attack_bonus));
        } 
        catch {
            console.log("Error: Cannot Find Attack Bonus");
        }
    });
    return;
}

function conjureCount(data) {
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
        createCard(data);
    }
    $(".card").toggle();
};

function attackRoll(attackBonus){
    let result = droll.roll('d20').total + attackBonus;
    console.log(`Roll: ${result}`);
    if (result >= $("#target-ac").val()) {
        console.log("Attack Hits!");
    }
    else {
        console.log("Attack Misses")
    }
    return result;
}

function attackBonusFind(actionArray) {
    for (var i=0; i < actionArray.length; i++){
        if(actionArray[i].hasOwnProperty('attack_bonus') === true) {
            return actionArray[i].attack_bonus;
        }
    }
    return "Error: Cannot Find Attack Bonus";
}