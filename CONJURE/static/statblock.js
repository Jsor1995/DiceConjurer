$(document).ready(function () {
    //pull statblock
    $(".animal-btn").click(async function () { 
        var animal = $(this).text();
        console.log(animal);
        try {
            var response = await fetch(`/create_card/${animal}`);
            var result = await response.json();
            console.log(result);
            statblock(result);
            $(".card").toggle();
        }
        catch {
            console.log("Error: Could Not Retreive Statblock")
        }
    });
});

function statblock(data) {
    var title = data.name;
    var ac = data.armor_class;
    var cr = data.challenge_rating;

    $(".card-deck").html(
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
                <a href="#" class="btn btn-primary">Damage</a>
            </div>
        </div>`);
    document.body.appendChild(card);
}