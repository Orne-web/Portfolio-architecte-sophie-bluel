 // Vérification de la présence du token administrateur
const token = localStorage.getItem("token");

if (token) {

    // Affiche la barre noire "Mode édition" uniquement pour l'administrateur
    document.querySelector("#edit-mode").classList.add("active");

    // Affiche le bouton Modifier uniquement en mode administrateur
    document.querySelector("#modify-btn").style.display = "block";

    // Cache les filtres en mode édition
    document.querySelector("#filters").style.display = "none";
}

 // gère le login logout pour accéder à la page administrateur
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

/* Récupère les catégories depuis l'API */
async function getCategories() {

    /* Envoie une requête GET vers l'API des catégories */
    const response = await fetch("http://localhost:5678/api/categories");

    /* Transforme la réponse JSON en tableau JavaScript */
    const categories = await response.json();

    /* Envoie les catégories à la fonction qui créera les boutons */
    displayFilters(categories);

    /* Utilise aussi les catégories pour remplir le select de la modale */
    displayCategoryOptions(categories);
}
/* Remplit le menu déroulant des catégories avec les données de l'API */
function displayCategoryOptions(categories) {

    /* Récupère le select de la deuxième modale */
    const categorySelect = document.querySelector("#category");

    /* Vide le select avant d'ajouter les options */
    categorySelect.innerHTML = "";

    /* Ajoute une option vide par défaut */
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "";

    categorySelect.appendChild(defaultOption);

    /* Crée une option pour chaque catégorie récupérée depuis l'API */
    categories.forEach(category => {

        const option = document.createElement("option");

        /* L'id de la catégorie devient la valeur envoyée au backend */
        option.value = category.id;

        /* Le nom affiché vient directement de l'API */
        option.textContent = category.name;

        categorySelect.appendChild(option);
    });
}
getWorks();  /* création des filtres dynamiquement */

/*  charge les catégories au démarrage de la page */
getCategories();
/* Crée les boutons de filtres à partir des catégories récupérées depuis l'API */
function displayFilters(categories) {

    /* Récupère le conteneur vide des filtres */
    const filtersContainer = document.querySelector("#filters");

    /* Vide le conteneur au cas où il contiendrait déjà des boutons */
    filtersContainer.innerHTML = "";

    /* Crée d'abord le bouton "Tous" */
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.classList.add("active");

    /* Au clic, affiche tous les projets */
    allButton.addEventListener("click", () => {
        displayWorks(works);

        /* Retire l'état actif des autres boutons */
        document.querySelectorAll(".filters button").forEach(button => {
            button.classList.remove("active");
        });

        /* Rend le bouton "Tous" actif */
        allButton.classList.add("active");
    });

    /* Ajoute le bouton "Tous" dans le conteneur */
    filtersContainer.appendChild(allButton);

    /* Crée un bouton pour chaque catégorie reçue depuis l'API */
    categories.forEach(category => {

        const button = document.createElement("button");

        /* Le nom du bouton vient directement de l'API */
        button.textContent = category.name;

        button.addEventListener("click", () => {

            /* Filtre les projets selon l'id de la catégorie sélectionnée */
            const filteredWorks = works.filter(work => {
                return work.categoryId === category.id;
            });

            /* Affiche uniquement les projets filtrés */
            displayWorks(filteredWorks);

            /* Retire la classe active de tous les boutons */
            document.querySelectorAll(".filters button").forEach(filterButton => {
                filterButton.classList.remove("active");
            });

            /* Rend le bouton sélectionné actif */
            button.classList.add("active");
        });

        /* Ajoute le bouton dans le conteneur */
        filtersContainer.appendChild(button);
    });
}


const modifyBtn = document.querySelector("#modify-btn");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#close-modal");
const modalGallery = document.querySelector(".modal-gallery");
const addPhotoBtn = document.querySelector("#add-photo");
const addModal = document.querySelector("#add-modal");
const closeAddModal = document.querySelector("#close-add-modal");
const backModal = document.querySelector("#back-modal");

const uploadIcon = document.querySelector("#upload-icon");
const uploadLabel = document.querySelector("#upload-label");
const uploadText = document.querySelector("#upload-text");
const imageInput = document.querySelector("#image");
const addForm = document.querySelector("#add-form");
const titleInput = document.querySelector("#title");
const categoryInput = document.querySelector("#category");
   /* Bouton Valider de la deuxième modale */
const validateButton = document.querySelector("#validate-button");
 
/* Vérifie si le formulaire est complet */
function checkFormValidity() {

    /* Vérifie qu'une image est sélectionnée */
    const hasImage = imageInput.files.length > 0;

    /* Vérifie que le titre n'est pas vide */
    const hasTitle = titleInput.value.trim() !== "";

    /* Vérifie qu'une catégorie est sélectionnée */
    const hasCategory = categoryInput.value !== "";

    /* Active ou désactive le bouton */
    validateButton.disabled = !(hasImage && hasTitle && hasCategory);

}
imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (file) {

        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    
        uploadIcon.style.display = "none";
        uploadLabel.style.display = "none";
        uploadText.style.display = "none";
    
    }
    /* Vérifie si le formulaire peut être validé */
    checkFormValidity();  

});

/* Vérifie le formulaire lorsque l'utilisateur saisit le titre */
titleInput.addEventListener("input", () => {
    checkFormValidity();
});

/* Vérifie le formulaire lorsque la catégorie change */
categoryInput.addEventListener("change", () => {
    checkFormValidity();
});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";
    
});

closeAddModal.addEventListener("click", () => {

    console.log("CROIX AJOUT PHOTO CLIQUEE");

    addModal.style.display = "none";

    resetAddForm();

});
addPhotoBtn.addEventListener("click", () => {

    modal.style.display = "none";
    addModal.style.display = "block";

});

backModal.addEventListener("click", () => {

    addModal.style.display = "none";
    modal.style.display = "block";

    resetAddForm();

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
addForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const formData = new FormData();

    formData.append("image", imageInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categoryInput.value);


    const token = localStorage.getItem("token");


    try {

        const response = await fetch("http://localhost:5678/api/works", {

            method: "POST",

            headers: {
                Authorization: `Bearer ${token}`
            },

            body: formData

        });


        if (!response.ok) {

            throw new Error("Erreur lors de l'ajout du projet");

        }


        const newWork = await response.json();

        console.log("Nouveau projet :", newWork);
        works.push(newWork);

        displayWorks(works);

        displayModalWorks(works);


    } catch (error) {

        console.error(error);

    }

});
function resetAddForm() {

    addForm.reset();

    preview.src = "";
    preview.style.display = "none";

    uploadIcon.style.display = "block";
    uploadLabel.style.display = "block";
    uploadText.style.display = "block";

}