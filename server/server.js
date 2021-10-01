const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


// CORS HEADERS::
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next()
});


var count = 1;
let animal = [];
class Tamagotchi{
    constructor(name="norbert", type="slug", happiness =5 , hunger = 5, dead=false){
        this.name = name;
        this.type = type;
        this.happiness = happiness;
        this.hunger = hunger;
        this.dead = dead
    }
    eat(){
        this.hunger = 0;
        this.happiness ++;
    }

    play(){
        let Hunger = parseInt(this.hunger) + 3;
        this.hunger = Hunger;
        let happiness = parseInt(this.happiness) + 5;
        this.happiness = happiness;
        isdead(this.name, Hunger, happiness);
    }
}



app.get('/', (req,res) => {
    // allTamagotchi = getTamagotchi();
    // console.log(allTamagotchi);
    res.json({animal});
})

app.post('/new', (req,res) => {
    // let data = {...req.params};
    // console.log(req);
    let animalname = req.body.petName;
    let animaltype = req.body.petType;

    if (animalname === ""){
        animalname ="norbert";
        animaltype = "slug";
    }
    // console.log(`name is ${animalname} and type is ${animaltype}`)
    animal[count]= new Tamagotchi(animalname, animaltype, 5, 5);
    res.json(animal[count]);
    console.log(animal[count]);
    count ++;

})


animal[0] = new Tamagotchi("Steve", "chicken", 10, 0, false);

function isdead(name, hunger, happiness){
    if (hunger >=10){
        this.dead = true;
        console.log(`${name} has died`)
    }
}

app.post('http://localhost:5000/feed', (req,res) => {
    // pet = req.pet;
    // console.log(pet);
    res.json({message:"hello"})
})

module.exports = app;