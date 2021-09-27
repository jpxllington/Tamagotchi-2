

const create = document.querySelector("#new");

create.addEventListener('click', () =>{
    document.querySelector('form').style.display = 'block'
})

const form = document.querySelector("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e)
    petName = e.target.petname.value;
    petType = e.target.type.value;
    newAnimal(petName,petType);
})


async function newAnimal(petName, petType){
    let data = {petName: petName,petType: petType}
    console.log(JSON.stringify(data));
    fetch('http://localhost:5000/new', {
        method:"POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
    .catch((error) => { console.error('Error:',error)})
}