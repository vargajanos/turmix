function reggeli() {
    // Receptek lekérdezése az adatbázisból
    axios.get('http://localhost:3000/recipes/1')
        .then(function(response) {
            let receptek = response.data; // Receptek tömb feltöltése a lekért adatokkal
            receptek.forEach(function(recipe) {
            // Leírás rövidítése, ha hosszabb mint 15 karakter
            let shortDescription = recipe.description.length > 150 
            ? recipe.description.substring(0, 150) + "..." 
            : recipe.description;
        
        let text = `
            <div><strong>Leírás:</strong> ${shortDescription}</div>
            <div><strong>Elkészítési idő:</strong> ${recipe.time} perc</div>
            <div><strong>Hozzávalók:</strong> ${recipe.additions}</div>
            <div><strong>Kalória:</strong> ${recipe.calory} kcal</div>
        `;
        
        // Card elem létrehozása
        let card = document.createElement("div");
        card.classList.add("card");
        
        // Card image elem létrehozása
        let cardImage = document.createElement("div");
        cardImage.classList.add("card-image");
        
        // Category elem létrehozása
        let category = document.createElement("div");
        category.classList.add("category");
        category.textContent = recipe.title;
        
        // Heading elem létrehozása
        let heading = document.createElement("div");
        heading.classList.add("heading");
        heading.innerHTML = text; // Használj innerHTML-t a formázott szöveghez
        
        // Author elem létrehozása
        let author = document.createElement("div");
        author.classList.add("author");
       // Hozd létre a Date objektumot
    let createdAt = new Date(recipe.createdAt);

    // Formázd a dátumot
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let formattedDate = createdAt.toLocaleDateString('hu-HU', options); // Magyar formátum

    author.innerHTML = `By <span class="name">${recipe.userID}</span> on ${formattedDate}`;
        
        // Az elemek összekapcsolása
        heading.appendChild(author); // Author a heading alá
        card.appendChild(cardImage); // Card image a cardhoz
        card.appendChild(category);   // Category a cardhoz
        card.appendChild(heading);    // Heading a cardhoz
        
        // A card elem hozzáadása a DOM-hoz
        let container = document.querySelector(".cards");
        container.appendChild(card);

            
            });
        })
        .catch(function(error) {
            console.error('Hiba történt a receptek lekérdezése során:', error);
        });
}
