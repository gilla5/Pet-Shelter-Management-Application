const pets = [
    { name: "Sophie", type: "Cat", breed: "Ragdoll", age: "1 year", image: "sophie.png", link: "pet1info.html" },
    { name: "Charlie", type: "Dog", breed: "Golden Retriever", age: "3 years", image: "charlie.jpeg", link: "pet2info.html" },
    { name: "Luna", type: "Cat", breed: "Maine Coon", age: "2 years", image: "luna.jpeg", link: "pet3info.html" },
    { name: "Rosie", type: "Dog", breed: "Beagle", age: "1.5 years", image: "rosie.jpeg", link: "pet4info.html" },
    { name: "Max", type: "Cat", breed: "Siamese", age: "1.5 years", image: "max.jpeg", link: "pet5info.html" },
    { name: "Bruno", type: "Dog", breed: "Boxer", age: "4 years", image: "bruno.jpeg", link: "pet6info.html" },
    { name: "Bella", type: "Dog", breed: "Labrador Retriever", age: "2 years", image: "bella.jpeg", link: "pet7info.html" },
    { name: "Oscar", type: "Cat", breed: "Persian", age: "5 years", image: "oscar.jpeg", link: "pet8info.html" },
    { name: "Daisy", type: "Dog", breed: "Bulldog", age: "3 years", image: "daisy.jpeg", link: "pet9info.html" },
    { name: "Gizmo", type: "Dog", breed: "Poodle", age: "2 years", image: "gizmo.jpeg", link: "pet10info.html" },
    { name: "Luna", type: "Cat", breed: "Sphynx", age: "1 year", image: "luna2.jpeg", link: "pet11info.html" },
    { name: "Rocky", type: "Dog", breed: "German Shepherd", age: "4 years", image: "rocky.jpeg", link: "pet12info.html" }
];

function displayPets() {
    const petList = document.getElementById('pet-list');

    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('col-md-4');
        petCard.innerHTML = `
            <div class="card">
                <img src="../Pet images/${pet.image}" class="card-img-top" alt="${pet.name}">
                <div class="card-body">
                    <h5 class="card-title">${pet.name}</h5>
                    <p class="card-text">${pet.breed}, ${pet.age}, loves to play and cuddle.</p>
                    <a href="../html/${pet.link}" class="link">View Details</a>
                </div>
            </div>
        `;
        petList.appendChild(petCard);
}

document.addEventListener('DOMContentLoaded', displayPets);
