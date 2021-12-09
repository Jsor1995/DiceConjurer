async function statblock(animal) {
    let cleaned_data = animal.toLowerCase().replace(/\s+/g, '-');
    let result = await fetch(`https://www.dnd5eapi.co/api/monsters/${cleaned_data}`);
    let statblock = await result.json();
    return console.log(statblock);
}

async function sendStat(data) {
    let response = await fetch(`/statblock/${data}`);
    let result =  response.json();
    console.log(result);
}