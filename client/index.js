

const create = document.querySelector("#new");

create.addEventListener('click', () =>{
    document.querySelector('form').style.display = 'block'
})

const form = document.querySelector("form");
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
    // for (let tamagotchi of tamagotchis){
    //     console.log(tamagotchi);
    // }

}

getTamagotchi();


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

