const petsList = document.getElementById('pets-list');
let petIndex = 0;
const petsPerPage = 9;

function loadPets() {
    const currentPets = pets.slice(petIndex, petIndex + petsPerPage);
    currentPets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('col-4');
        petCard.innerHTML = `
            <div class="card">
                <img src="${pet.image}" class="card-img-top" alt="${pet.name}">
                <div class="card-body">
                    <h5 class="card-title">${pet.name}</h5>
                    <p class="card-text">${pet.breed}</p>
                    <button class="btn btn-primary view-btn" data-name="${pet.name}">View Details</button>
                    <button class="btn btn-danger delete-btn" data-name="${pet.name}">Delete</button>
                </div>
            </div>
        `;
        petsList.appendChild(petCard);
    });
    petIndex += petsPerPage;
    if (petIndex >= pets.length) {
        document.getElementById('load-more').style.display = 'none';
    }
}

document.getElementById('load-more').addEventListener('click', () => {
    loadPets();
});

document.getElementById('createPetForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('petName').value;
    const breed = document.getElementById('petBreed').value;
    const age = document.getElementById('petAge').value;
    const description = document.getElementById('petDescription').value;
    const newPet = {
        name,
        breed,
        age,
        description,
        image: "https://placekitten.com/200/304" // Placeholder image
    };

    pets.push(newPet);
    loadPets();
    document.getElementById('createPetModal').classList.remove('show');
    document.getElementById('createPetForm').reset();
});

petsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-btn')) {
        const petName = e.target.getAttribute('data-name');
        const pet = pets.find(pet => pet.name === petName);

        document.getElementById('petDetailsName').textContent = pet.name;
        document.getElementById('petDetailsBreed').textContent = `Breed: ${pet.breed}`;
        document.getElementById('petDetailsAge').textContent = `Age: ${pet.age}`;
        document.getElementById('petDetailsDescription').textContent = `Description: ${pet.description}`;

        new bootstrap.Modal(document.getElementById('petDetailsModal')).show();
    }

    if (e.target.classList.contains('delete-btn')) {
        const petName = e.target.getAttribute('data-name');
        const petIndex = pets.findIndex(pet => pet.name === petName);
        if (petIndex > -1) {
            pets.splice(petIndex, 1);
            petsList.innerHTML = '';
            loadPets();
        }
    }
});

loadPets();
