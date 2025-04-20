let currentIndex = 0;
let pets = [];
const cardsContainer = document.getElementById("petCards");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const blobId = 'uuidv4';
const apiUrl = `http://localhost:3000/api/jsonBlob/${blobId}`;

// Load pets on page load
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(apiUrl);
    pets = await res.json();
    displayNextPets();
  } catch (error) {
    console.error("Failed to load pets:", error);
  }
});

function createCard(pet, index) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";
  col.innerHTML = `
    <div class="card h-100">
      <img src="${pet.image}" class="card-img-top" alt="${pet.name}" style="height: 250px; object-fit: cover;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${pet.name}</h5>
        <p class="card-text">${pet.breed}, ${pet.age}</p>
        <div class="mt-auto">
          <button class="btn btn-info btn-sm me-2" onclick="viewPet(${index})">More Info</button>
          <button class="btn btn-danger btn-sm" onclick="deletePet(${index})">Delete</button>
        </div>
      </div>
    </div>
  `;
  cardsContainer.appendChild(col);
}

function displayNextPets() {
  const nextPets = pets.slice(currentIndex, currentIndex + 9);
  nextPets.forEach((pet, i) => createCard(pet, currentIndex + i));
  currentIndex += 9;
  if (currentIndex >= pets.length) {
    loadMoreBtn.style.display = "none";
  }
}

function viewPet(index) {
  const pet = pets[index];
  document.getElementById("viewModalTitle").textContent = pet.name;
  document.getElementById("viewModalImage").src = pet.image;
  document.getElementById("viewModalText").textContent = `${pet.species}, ${pet.breed}, ${pet.age}. ${pet.description}`;
  new bootstrap.Modal(document.getElementById("viewModal")).show();
}

async function deletePet(index) {
  pets.splice(index, 1);
  await updatePetsOnServer();
  cardsContainer.innerHTML = "";
  currentIndex = 0;
  displayNextPets();
}

document.getElementById("createPetForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const newPet = {
    name: formData.get("name"),
    species: formData.get("species"),
    breed: formData.get("breed"),
    age: formData.get("age"),
    description: formData.get("description"),
    image: formData.get("image")
  };
  pets.push(newPet);
  await updatePetsOnServer();
  cardsContainer.innerHTML = "";
  currentIndex = 0;
  displayNextPets();
  this.reset();
  bootstrap.Modal.getInstance(document.getElementById("createModal")).hide();
});

async function updatePetsOnServer() {
  try {
    await fetch(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pets)
    });
  } catch (error) {
    console.error("Failed to update pets:", error);
  }
}

loadMoreBtn.addEventListener("click", displayNextPets);

