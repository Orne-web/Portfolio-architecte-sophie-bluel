console.log("login.js fonctionne");
const form = document.querySelector("#login-form");

form.addEventListener("submit", async (event) => {

    event.preventDefault();
    console.log("formulaire envoyé");

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    console.log("EMAIL :", email);
    console.log("PASSWORD :", password);

    const response = await fetch("http://localhost:5678/api/users/login", {

        method: "POST",
    
        headers: {
            "Content-Type": "application/json"
        },
    
        body: JSON.stringify({
            email: email,
            password: password
        })
    
    });
    
    const data = await response.json();

     console.log(data);

if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
}

});