const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


class Tamagotchi{
    constructor(name, type=dog, happiness =5 , hunger = 5){
        this.name = name;
        this.type = type;
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

let animal;

app.get('/', (req,res) => {
    res.json({message:"Hi"});
})

app.post('/new', (req,res) => {
    let data = {...req.params};
    console.log(req);
    let name = req.body.petName;
    let type = req.body.petType;
    res.json({ message: "Done"});
    console.log(`name is ${name} and type is ${type}`)
    animal = new Tamagotchi(name, type, 5, 5)
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

module.exports = app;