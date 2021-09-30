

const create = document.querySelector("#new");

create.addEventListener('click', () =>{
    document.querySelector('#newTamagotchi').style.display = 'flex'
})

const form = document.querySelector("#newTamagotchi");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(e)
    petName = e.target.petname.value;
    petType = e.target.type.value;
    newAnimal(petName,petType);
})

async function getTamagotchi(){
    let res = await fetch('http://localhost:5000/')
    let tamagotchis = await res.json();
    
    console.log(tamagotchis);
    console.log(tamagotchis.animal.length)
    for (let a = 0; a < tamagotchis.animal.length; a++){
        console.log(tamagotchis.animal[a]['name'])
        animalName = tamagotchis.animal[a]['name'];
        animalType = tamagotchis.animal[a]['type'];
        animalHunger = tamagotchis.animal[a]['hunger'];
        animalHappiness = tamagotchis.animal[a]['happiness'];
        animalDead = tamagotchis.animal[a]['dead']; 
        buildAnimal(animalName, animalType, animalHunger, animalHappiness, animalDead)
    }

}

getTamagotchi();

function buildAnimal(name, type, hunger, happiness, dead){
    let image;
    
    switch(type){
        case "cat":
            image = "http://clipart-library.com/images/6ip5jXMMT.png";
            break
        case "dog":
            image = "https://cdn.pixabay.com/photo/2020/02/12/05/13/dog-cartoon-4841702_1280.jpg";
            break
        case "moose":
            image = "https://www.iconspng.com/images/cartoon-moose/cartoon-moose.jpg";
            break
        case "racoon":
            image = "https://www.nicepng.com/png/full/12-121463_cartoon-raccoon-png-jpg-freeuse-library-raccoon-cartoon.png";
            break
        case "slug":
            image ="https://ih1.redbubble.net/image.1164411977.9745/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg";
            break
        case "chicken":
            image = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chicken_cartoon_04.svg/723px-Chicken_cartoon_04.svg.png";
            break
    }

    let parentDiv = document.createElement('div');
    let img = document.createElement('img');
    let nameplace = document.createElement('h3');
    let stats = document.createElement('div');
    let stathunger = document.createElement('p');
    let stathappiness = document.createElement('p');
    let feed = document.createElement('button');
    let play = document.createElement('button');
    let kill = document.createElement('button');

    nameplace.innerText = name;
    stathunger.innerText = `Hunger: ${hunger}`;
    stathappiness.innerText = `Happiness: ${happiness}`;
    img.src = image;

    stats.append(stathappiness, stathunger);
    parentDiv.append(img, nameplace, stats, feed, play, kill);

    document.querySelector("#tamagotchiHolder").append(parentDiv);
}

function newAnimal(petName, petType){
    let data = {petName: petName,petType: petType}
    // console.log(JSON.stringify(data));
    fetch('http://localhost:5000/new', {
        method:"POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch((error) => { console.error('Error:',error)})
}

