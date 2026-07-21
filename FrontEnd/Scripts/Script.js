const token = localStorage.getItem("token");

if (token) {
    document.querySelector("#edit-mode").style.display = "block";
    document.querySelector("#modify-btn").style.display = "block";
    document.querySelector("#filters").style.display= "none";
}
if (token) {
    const loginLink = document.querySelector("#login-link");
    
    loginLink.textContent = "logout";
    loginLink.href = "#";

    loginLink.addEventListener("click", (event) => {
        event.preventDefault();

        localStorage.removeItem("token");
        window.location.href = "index.html";
    });
}
let works = [];

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    works = await response.json();

    displayWorks(works);
}

function displayWorks(worksList) {

    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = "";

    worksList.forEach(work => {

        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = work.title;

        const caption = document.createElement("figcaption");
        caption.textContent = work.title;

        figure.appendChild(image);
        figure.appendChild(caption);

        gallery.appendChild(figure);

    });

}
 function displayModalWorks(worksList) {

        modalGallery.innerHTML = "";

        worksList.forEach(work => {

        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = work.title;


        const deleteButton = document.createElement("button");
       deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
       deleteButton.classList.add("delete-btn");


       deleteButton.addEventListener("click", () => {
        deleteWork(work.id);
    });
        

        figure.appendChild(image);
        figure.appendChild(deleteButton);

        modalGallery.appendChild(figure);

    });
}


getWorks();
const allButton = document.querySelector("#all");

allButton.addEventListener("click", () => {
    displayWorks(works);
});
const objectsButton = document.querySelector("#objects");

objectsButton.addEventListener("click", () => {

    const objectsWorks = works.filter(work => work.categoryId === 1);

    displayWorks(objectsWorks);

});
const apartmentsButton = document.querySelector("#apartments");

apartmentsButton.addEventListener("click", () => {

    const apartmentsWorks = works.filter(work => work.categoryId === 2);

    displayWorks(apartmentsWorks);

});
const hotelsButton = document.querySelector("#hotels");

hotelsButton.addEventListener("click", () => {

    const hotelsWorks = works.filter(work => work.categoryId === 3);

    displayWorks(hotelsWorks);

});
const modifyBtn = document.querySelector("#modify-btn");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#close-modal");
const modalGallery = document.querySelector(".modal-gallery");
const addPhotoBtn = document.querySelector("#add-photo");
const addModal = document.querySelector("#add-modal");
const closeAddModal = document.querySelector("#close-add-modal");
const backModal = document.querySelector("#back-modal");

const imageInput = document.querySelector("#image");
const preview = document.querySelector("#preview");

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (file) {

        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";

    }

});

closeAddModal.addEventListener("click", () => {

    console.log("CROIX AJOUT PHOTO CLIQUEE");

    addModal.style.display = "none";

});
addPhotoBtn.addEventListener("click", () => {

    modal.style.display = "none";
    addModal.style.display = "block";

});

backModal.addEventListener("click", () => {

    addModal.style.display = "none";
    modal.style.display = "block";

});
modifyBtn.addEventListener("click", () => {

    modal.style.display = "block";

    displayModalWorks(works);

});




window.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.style.display = "none";
    }

});
async function deleteWork(id) {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(`http://localhost:5678/api/works/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression");
        }

        // On retire le projet du tableau
        works = works.filter(work => work.id !== id);

        // On met à jour les deux galeries
        displayWorks(works);
        displayModalWorks(works);

    } catch (error) {

        console.error(error);

    }
}
