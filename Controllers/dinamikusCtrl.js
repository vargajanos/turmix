function reggeli() {
    // Receptek lekérdezése az adatbázisból
    axios.get('http://localhost:3000/recipes/1')
        .then(function(response) {
            let receptek = response.data; // Receptek tömb feltöltése a lekért adatokkal
            
            // Az összes felhasználó lekérdezése
            axios.get('http://localhost:3000/users')
                .then(function(userResponse) {
                    let users = userResponse.data; // Felhasználók tömb feltöltése

                    // Receptek feldolgozása
                    receptek.forEach(function(recipe) {
                        // Leírás rövidítése
                        let shortDescription = recipe.description.length > 150 
                            ? recipe.description.substring(0, 150) + "..." 
                            : recipe.description;

                        let text = `
                            <div><strong>Leírás:</strong> ${shortDescription}</div>
                            <div><strong>Elkészítési idő:</strong> ${recipe.time} perc</div>
                            <div><strong>Hozzávalók:</strong> ${recipe.additions}</div>
                            <div><strong>Kalória:</strong> ${recipe.calory} kcal</div>
                        `;
                        
                        let card = document.createElement("div");
                        card.classList.add("card");
                        
                        // Aszinkron eseménykezelő
                        card.onclick = function() { 
                            smallrecipe(recipe.id); // Meghívja a receptet ID alapján
                        };
                        
                        // Card image elem létrehozása
                        let cardImage = document.createElement("div");
                        cardImage.classList.add("card-image");
                        
                        // Kép beszúrása
                        let image = document.createElement("img");
                        image.src = `./Assets/recipes/${recipe.ID}.jpg`; 
                        image.alt = recipe.title;
                        image.classList.add("recipe-image"); 
                        cardImage.appendChild(image); 

                        // Category elem létrehozása
                        let category = document.createElement("div");
                        category.classList.add("category");
                        category.textContent = recipe.title;
                        
                        // Heading elem létrehozása
                        let heading = document.createElement("div");
                        heading.classList.add("heading");
                        heading.innerHTML = text; 
                        
                        // Author elem létrehozása
                        let author = document.createElement("div");
                        author.classList.add("author");

                        // Dátum formázása
                        let createdAt = new Date(recipe.createdAt);
                        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                        let formattedDate = createdAt.toLocaleDateString('hu-HU', options);

                        // Felhasználónév keresése a users tömbből
                        let user = users.find(u => u.ID === recipe.userID);
                        let userName = user ? user.name : 'Ismeretlen Felhasználó'; // Ha nem található, alapértelmezett név

                        author.innerHTML = `By <span class="name">${userName}</span> on ${formattedDate}`;
                        
                        // Az elemek összekapcsolása
                        heading.appendChild(author); 
                        card.appendChild(cardImage); 
                        card.appendChild(category);   
                        card.appendChild(heading);    
                        
                        // A card elem hozzáadása a DOM-hoz
                        let container = document.querySelector(".cards");
                        container.appendChild(card);
                    });
                })
                .catch(function(error) {
                    console.error('Hiba történt a felhasználók lekérdezése során:', error);
                });
        })
        .catch(function(error) {
            console.error('Hiba történt a receptek lekérdezése során:', error);
        });
}

function smallrecipe(id) {
    // Egy konkrét recept lekérdezése az ID alapján
    axios.get(`http://localhost:3000/recipes/${id}`)
        .then(function(response) {
            let recipe = response.data; // A recept adatai a válaszból

            let text =  `
            <div>
                <h1>${recipe.title}</h1>
                <p><strong>Kategória:</strong> ${recipe.catID === 1 ? 'Leves' : recipe.catID === 2 ? 'Főétel' : 'Köret'}</p>
                <p><strong>Leírás:</strong> ${recipe.description}</p>
                <p><strong>Elkészítési idő:</strong> ${recipe.time} perc</p>
                <p><strong>Hozzávalók:</strong> ${recipe.additions}</p>
                <p><strong>Kalória:</strong> ${recipe.calory} kcal</p>
                <button onclick="goBack()">Vissza a receptekhez</button>
            </div>
            `;

            // Új div elem létrehozása és a recept tartalom beillesztése
            let div2 = document.createElement("div");
            div2.innerHTML = text;

            // A recept megjelenítése a kereten belül
            let div1 = document.querySelector('#keret');
            div1.innerHTML = ''; // Ürítjük a keret tartalmát, hogy ne legyen többszörös megjelenítés
            div1.appendChild(div2);
        })
        .catch(function(error) {
            console.error('Hiba történt a receptek lekérdezése során:', error);
        });
}

// Visszatérés a receptek listájához
function goBack() {
    window.location.reload(); // Az oldal újratöltése, hogy visszatérjünk a kártya nézethez
}
