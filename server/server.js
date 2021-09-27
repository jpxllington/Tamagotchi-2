const express = require('express');
const cors = require('cors');
const server = express();
server.use(express.json());
server.use(cors());


class Tamagotchi{
    constructor(name, happiness =5 , hunger = 5){
        this.name = name;
        this.happiness = happiness;
        this.hunger = hunger;
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
    }
}

server.post('/new', (req,res) => {
    let data = req.body;
    let name = req.params.petName;
    let type = req.params.petType;
})


if (Tamagotchi.hunger === 10){
    console.log(`${Tamagotchi.name} has died`);
}

if (Tamagotchi.happiness === 0){
    console.log(`${Tamagotchi.name} has run away`);
}

let Steve = new Tamagotchi('Steve','5','5');

console.log(Steve.hunger);
Steve.play();
console.log(Steve.happiness)
Steve.play();