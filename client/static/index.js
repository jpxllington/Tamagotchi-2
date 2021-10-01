
var petnumber;
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
    petnumber = tamagotchis.animal.length;
    for (let a = 0; a < tamagotchis.animal.length; a++){
        console.log(tamagotchis.animal[a]['name'])
        let animalName = tamagotchis.animal[a]['name'];
        let animalType = tamagotchis.animal[a]['type'];
        let animalHunger = tamagotchis.animal[a]['hunger'];
        let animalHappiness = tamagotchis.animal[a]['happiness'];
        let animalDead = tamagotchis.animal[a]['dead']; 
        buildAnimal(animalName, animalType, animalHunger, animalHappiness, animalDead, a)
    }
    return petnumber;
}

petnumber = getTamagotchi();

function buildAnimal(name, type, hunger, happiness, dead, a=0){
    let image;
    
    switch(type){
        case "cat":
            image = "https://i.ebayimg.com/images/g/7WUAAOSwvzRX1Igm/s-l300.jpg";
            break
        case "dog":
            image = "https://cdn.pixabay.com/photo/2020/02/12/05/13/dog-cartoon-4841702_1280.jpg";
            break
        case "moose":
            image = "https://www.how-to-draw-funny-cartoons.com/images/cartoon-moose-9.gif";
            break
        case "racoon":
            image = "https://png.pngtree.com/png-vector/20200423/ourlarge/pngtree-cute-raccoon-cartoon-illustration-png-image_2191774.jpg";
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
    let buttons = document.createElement('div');
    parentDiv.setAttribute('id',`parentDiv${a}`)
    parentDiv.setAttribute('class','parentDiv');
    img.setAttribute('id',`photo${a}`);
    img.setAttribute('class','photo');
    nameplace.setAttribute('id',`animalname${a}`,);
    nameplace.setAttribute('class','animalname');
    stathunger.setAttribute('id',`hunger${a}`);
    stathunger.setAttribute('class','hunger');
    stats.setAttribute('class','stats')
    stathappiness.setAttribute('id',`happiness${a}`);
    stathappiness.setAttribute('class','happiness');
    feed.setAttribute('id',`feed${a}`);
    feed.setAttribute('class','button');
    play.setAttribute('id',`play${a}`);
    play.setAttribute('class','button');
    kill.setAttribute('id',`kill${a}`);
    kill.setAttribute('class','button');
    buttons.setAttribute('class','buttons')

    nameplace.innerText = name;
    stathunger.innerText = `Hunger: ${hunger}`;
    stathappiness.innerText = `Happiness: ${happiness}`;
    img.src = image;

    play.textContent = "Play";
    feed.textContent = 'Feed';
    kill.textContent = "Kill";

    stats.append(stathappiness, stathunger);
    buttons.append(feed,play,kill)
    parentDiv.append(img, nameplace, stats, buttons);

    document.querySelector("#tamagotchiHolder").append(parentDiv);

}


let button = [];
console.log(petnumber);
for(let a = 0; a <= petnumber ; a++){
    button[a] = document.querySelector(`#feed${a}`);
    console.log("feed button identified")
    button[a].addEventListener('click', async (a) => {
        console.log('feed button added')
        await feedpet(a)
    });

    // document.querySelector(`#play${a}`).addEventListener('click', playpet(a));
    // document.querySelector(`#kill${a}`).addEventListener('click', killpet(a));
}

async function newAnimal(petName, petType){
    let data = {petName: petName,petType: petType}
    // console.log(JSON.stringify(data));

    try {
        let response = await fetch('http://localhost:5000/new', {
                    method:"POST",
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                });
        let tamagotchis = await response.json();
        console.log(tamagotchis)
        console.log(tamagotchis['name'])
        let animalName = tamagotchis['name'];
        let animalType = tamagotchis['type'];
        let animalHunger = tamagotchis['hunger'];
        let animalHappiness = tamagotchis['happiness'];
        let animalDead = tamagotchis['dead']; 
        buildAnimal(animalName, animalType, animalHunger, animalHappiness, animalDead)
    } catch(err) { console.log(err)}

    // .then(res => res.json())
    // .then(res => console.log(res))
    // .catch((error) => { console.error('Error:',error)})
}

async function feedpet(pet){
    let data = {pet: pet};
    console.log("feeding")
    response = await fetch('http://localhost:5000/feed',{
        method: "POST",
        body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
    })

    getTamagotchi();
}

// document.querySelector(button).addEventListener('mouseover', () => {document.querySelector('.button').style.backgroundColor = "lightpink"});

