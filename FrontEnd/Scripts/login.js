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
    
    // On récupère l'emplacement où afficher le message d'erreur
    const errorMessage = document.querySelector("#error-message");
    
    // On efface un ancien message d'erreur s'il existe
    errorMessage.textContent = "";
    
    if (response.ok) {
    
        // Si la connexion réussit, on enregistre le token
        localStorage.setItem("token", data.token);
    
        // Puis on redirige vers la page d'accueil
        window.location.href = "index.html";
    
    } else {
    
        // Si les identifiants sont incorrects,
        // on affiche un message d'erreur en rouge
        errorMessage.textContent = "Email ou mot de passe incorrect.";
    
    }
});