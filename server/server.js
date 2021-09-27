const express = require('express');
const cors = require('cors');
const { get } = require('http');
const { join } = require('path/posix');
const app = express();
app.use(express.json());
app.use(cors());

var count = 1;

class Tamagotchi{
    constructor(name, type=dog, happiness =5 , hunger = 5, dead=false){
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
    allTamagotchi = getTamagotchi();
    console.log(allTamagotchi.json());
})

app.post('/new', (req,res) => {
    let data = {...req.params};
    console.log(req);
    let name = req.body.petName;
    let type = req.body.petType;
    console.log(`name is ${name} and type is ${type}`)
    let str = "let animal_" + count +" = new Tamagotchi( " + "name, " + "type" + ", 5, 5);"
    eval(str);
    res.json = (getTamagotchi());
    count ++;

})


if (Tamagotchi.hunger === 10){
    console.log(`${Tamagotchi.name} has died`);
}

if (Tamagotchi.happiness === 0){
    console.log(`${Tamagotchi.name} has run away`);
}

let animal_0 = new Tamagotchi('Steve', "Dog",'5','5');

function isdead(name, hunger, happiness){
    if (hunger >=10){
        this.dead = true;
        console.log(`${name} has died`)
    }
}
count=1;
let animal_1 = new Tamagotchi('bob','moose','6','6',true);

console.log(animal_0.hunger);
animal_0.play();
console.log(animal_0.happiness)
animal_0.play();

getTamagotchi()

function getTamagotchi(){
    let allTamagotchi = [];
    for (let a=0; a <= count; a++){
        let tamagotchi;
        let str = "tamagotchi = animal_" + a + ";";
        eval(str);
        allTamagotchi.push(tamagotchi);
    }
    return allTamagotchi.json();
}

module.exports = app;