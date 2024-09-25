


function recept(categoryID) {
axios.get(`http://localhost:3000/recipes`)
        .then(function(response) {
            let recept = response.data; 

    // Receptek lekérdezése az adatbázisból
    axios.get(`http://localhost:3000/recipes/${categoryID}`)
        .then(function(response) {
            let receptek = response.data; // 
            
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
                            <div style="display: none;"><strong>ID:</strong> ${recipe.ID}</div>
                        `;

                       
                        
                        let card = document.createElement("div");
                        card.classList.add("card");
                        
                        // Aszinkron eseménykezelő
                        card.onclick = function() { 
                            smallrecipe(recipe.ID)
                            console.log(recipe.ID)
                        };

                        
                        
                        // Card image elem létrehozása
                        let cardImage = document.createElement("div");
                        cardImage.classList.add("card-image");
                        
                       // Kép beszúrása
let image = document.createElement("img");
image.src = `./Assets/recipes/${recipe.ID}.jpg`; 
image.alt = recipe.title;
image.classList.add("recipe-image"); 

// Ha a kép nem töltődik be, cserélje le egy alapértelmezett képre
image.onerror = function() {
    this.src = './Assets/recipes/default.jpg'; // Alapértelmezett kép
};

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

                        // ID elem létrehozása
                        let id = document.createElement("div");
                        id.innerHTML = recipe.ID; 
                        

                        // Felhasználónév keresése a users tömbből
                        let user = users.find(u => u.ID === recipe.userID);
                        let userName = user ? user.name : 'Ismeretlen Felhasználó'; // Ha nem található, alapértelmezett név

                        author.innerHTML = `By <span class="name">${userName}</span> on ${formattedDate}`;
                        
                        // Az elemek összekapcsolása
                        heading.appendChild(author); 
                        card.appendChild(cardImage); 
                        card.appendChild(category);   
                        card.appendChild(heading);    
                        card.appendChild(id);
                        
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

})
.catch(function(error) {
    console.error('Hiba történt a receptek lekérdezése során:', error);
});
}


function smallrecipe(id){
    
    render('smallrecipe').then(()=>{
            axios.get(`${serverUrl}/recipes/${id}`).then(res => {

                let receptek = res.data;
                document.querySelector('#title').value = receptek.title;
                document.querySelector('#category').value = receptek.catgory;
                document.querySelector('#description').value = receptek.description;
                document.querySelector('#time').value = receptek.time;
                document.querySelector('#additions').value = receptek.additions;
                document.querySelector('#calory').value = receptek.calory;

                document.querySelector('#goBack').onclick = function() {goBack()};
            });
        });
    }





    function sajatReceptek(userID) {
     
        
            // Receptek lekérdezése az adatbázisból
            axios.get(`http://localhost:3000/recipes/${userID}`, authorize)
                .then(function(response) {
                    let receptek = response.data; // 
                    
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
                                    <div style="display: none;"><strong>ID:</strong> ${recipe.ID}</div>
                                `;
        
                               
                                
                                let card = document.createElement("div");
                                card.classList.add("card");
                                
                                // Aszinkron eseménykezelő
                                card.onclick = function() { 
                                    smallrecipe(recipe.ID)
                                    console.log(recipe.ID)
                                };
        
                                
                                
                                // Card image elem létrehozása
                                let cardImage = document.createElement("div");
                                cardImage.classList.add("card-image");
                                
                               // Kép beszúrása
        let image = document.createElement("img");
        image.src = `./Assets/recipes/${recipe.ID}.jpg`; 
        image.alt = recipe.title;
        image.classList.add("recipe-image"); 
        
        // Ha a kép nem töltődik be, cserélje le egy alapértelmezett képre
        image.onerror = function() {
            this.src = './Assets/recipes/default.jpg'; // Alapértelmezett kép
        };
        
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
        
                                // ID elem létrehozása
                                let id = document.createElement("div");
                                id.innerHTML = recipe.ID; 
                                
        
                                // Felhasználónév keresése a users tömbből
                                let user = users.find(u => u.ID === recipe.userID);
                                let userName = user ? user.name : 'Ismeretlen Felhasználó'; // Ha nem található, alapértelmezett név
        
                                author.innerHTML = `By <span class="name">${userName}</span> on ${formattedDate}`;
                                
                                // Az elemek összekapcsolása
                                heading.appendChild(author); 
                                card.appendChild(cardImage); 
                                card.appendChild(category);   
                                card.appendChild(heading);    
                                card.appendChild(id);
                                
                                // A card elem hozzáadása a DOM-hoz
                                let container = document.querySelector(".dinamika");
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
        