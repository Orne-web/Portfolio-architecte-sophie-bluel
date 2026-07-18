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