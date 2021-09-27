

const create = document.querySelector("nav:button");

create.addEventListener('click', () =>{
    document.querySelector('form').style.display = 'block'
})

const submit = document.querySelector("#submit");
submit.addEventListener('click', (e) => {
    e.preventDefault();
    petName = e.target.petname.value;
    petType = e.target.type.value;
})


async function newAnimal(petName, petType){
    let data = {petName:petName,petType:petType}
    fetch('/new', {
        method:"POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
}