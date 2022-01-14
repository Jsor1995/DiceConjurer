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
            $(".dropdown-toggle").show();

            //create roll all menu
            $(".dropdown-menu").empty();
            $(".dropdown-menu").append(addAllAttack(result));
        }
        catch {
            console.log("Error: Could Not Retreive Statblock")
        }
            //Roll Attack All At Once
        $(".attack-all").click(function() {
            try {
                var attack = $(this).text();
                console.log(`Attack Name: ${attack}`);
                attackAll(attack);
            }
            catch(error) {
                console.error;
            }
        });
    });
});
//Creates card element
function createCard(data) {
    var title = data.name;
    var ac = data.armor_class;
    var attackbtn = addAtkBtn(data);
    var cardhtml = 
        `<div class="card ">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
            </div>
            <ul class="list-group list-group-flush stat-detail">
                <li class="list-group-item armor-class">Armor Class: ${ac}</li>
                <table class="table table-bordered roll-table">
                    <thead class="rolltable-header">
                        <th scope="col" class="attack-header">Attack</th>
                        <th scope="col" class="damage-header">Damage</th>
                    </thead>
                    <tbody class="rolltable-body" style="display: none">
                        <td class="attack-roll"></td>
                        <td class="damage-roll"></td>
                    </tbody>
                </table>
            </ul>
            <div class="card-body dice-button">
               ${attackbtn}
            </div>
        </div>`;
    $(".card-deck").append(cardhtml);

    $(".attack-btn").off().click(function() {
        console.log("Clicked!");
        try {
            let attack_bonus = attackBonusFind(data.actions);
            let attack_name = $(this).text();
            let attack_display = $(this).parent().parent().find('.attack-roll');
            let attack_header = $(this).parent().parent().find('.attack-header');
            let damage_display = $(this).parent().parent().find('.damage-roll');
            let damage_header = $(this).parent().parent().find('.damage-header');
            let table_body = $(this).parent().parent().find('.rolltable-body');
            let attack_roll = attackRoll(attack_bonus);
            
            //display table
            table_body.show();

            //check if AC is filled out
            if ($("#target-ac").val() == '' || isNaN($("#target-ac").val()) == true) {
                alert("Please input Target AC");
                return;
            }
            else {
                //Roll Dice
                //console.log(attack_roll);
                //console.log(`Current Attack Text: ${attack_display.text()}`);
                attack_display.text(attack_roll);
                if (attack_roll >=  $("#target-ac").val()) {
                    
                    //Beats AC
                    attack_display.css('color', 'green');

                    //Calculate Damage
                    damage_display.text(damageRoll(attack_name, data.actions));

                    attack_header.text('Attack');
                    damage_header.show();
                    damage_display.show();
                }
                else {
                    //Attack Misses
                    attack_header.text('Missed!');
                    attack_display.css('color', 'red');
                    damage_header.hide();
                    damage_display.text('');
                    damage_display.hide();
                }                
            }
            
        }
        catch(error) {
            console.error(error);
            console.log("Error: Cannot Find Attack Bonus");
        }
    });
    return;
}

function addAtkBtn(data) {
    let iter_start = checkMultiAttack(data.actions);
    let button_element = '';  
    for (iter_start; iter_start < data.actions.length; iter_start++) {
        button_element = `${button_element}` + `<a href="#" class="btn btn-primary attack-btn">${data.actions[iter_start].name}</a>`;
    }
    return button_element;
}

//creates menu for rolling for all
function addAllAttack(data) {
    let iter_start = checkMultiAttack(data.actions);
    let button_element = '';  
    for (iter_start; iter_start < data.actions.length; iter_start++) {
        button_element = `${button_element}` + `<li><a href="#" class="btn btn-primary dropdown-item attack-all">${data.actions[iter_start].name}</a></li>`;
    }
    return button_element;
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

//Rolls attack returns number
function attackRoll(attackBonus){
    let result = droll.roll('d20').total + attackBonus;
    return result;
}

function damageRoll(attack, actionArray) {
    console.log("Damage Roll Called");
    var damageFormula;
    for (var i=0; i<actionArray.length; i++) {
        if (actionArray[i].name == attack) {
            damageFormula = actionArray[i].damage[0].damage_dice;
            let result =  droll.roll(damageFormula).total;
            return result;
        }
    }
}

//Finds Attack Bonus in Json data
function attackBonusFind(actionArray) {
    for (var i=0; i < actionArray.length; i++){
        if(actionArray[i].hasOwnProperty('attack_bonus') === true) {
            //console.log(`Attack Bonus: ${actionArray[i].attack_bonus}`);
            return actionArray[i].attack_bonus;
        }
    }
    return "Error: Cannot Find Attack Bonus";
}

//Checks to see if creature has Multiattack
function checkMultiAttack(actionArray) {
    if (actionArray[0].name == 'Multiattack') {
        console.log("Has Multiattack");
        //returns true
        return 1;
    }
    else {
        //returns false
        return 0;
    }
}


function attackAll(attack) {
    if ($("#target-ac").val() == '' || isNaN($("#target-ac").val()) == true) {
        alert("Please input Target AC");
        return;
    }
    else {
        $(`.attack-btn:contains("${attack}")`).each(function(index){
            $(this).trigger('click');
        });
    }
}