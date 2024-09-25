function upload(){
    


        let newRecipe = {
            userID: loggedUser[0].ID,
            catID: document.querySelector('#Type1Uj').value,
            title: document.querySelector('#newfoodname').value,
            description: document.querySelector('#newrecipe').value,
            time: document.querySelector('#newfoodtime').value,
            additions: document.querySelector('#newfoodadditions').value,
            calory: document.querySelector('#newfoodcalory').value,
        
    
        }
        if (!document.querySelector('#Type1Uj').value || 
        !document.querySelector('#newfoodname').value || 
        !document.querySelector('#newrecipe').value || 
        !document.querySelector('#newfoodtime').value || 
        !document.querySelector('#newfoodadditions').value || 
        !document.querySelector('#newfoodcalory').value
    ) {
            alert('Kérlek, tölts ki minden mezőt!');
            return;
        }
        
    
        axios.post(`${serverUrl}/recipes/${loggedUser[0].ID}`, newRecipe).then(res => {
            alert('Sikeres feltöltés!');

            // Mezők alaphelyzetbe állítása sikeres feltöltés után
            document.querySelector('#Type1Uj').value = 'Válassz...';  // Kategória alaphelyzetbe
            document.querySelector('#newfoodname').value = '';  // Étel neve mező ürítése
            document.querySelector('#newrecipe').value = '';  // Recept leírás mező ürítése
            document.querySelector('#newfoodtime').value = '';  // Elkészítési idő mező ürítése
            document.querySelector('#newfoodadditions').value = '';  // Hozzávalók mező ürítése
            document.querySelector('#newfoodcalory').value = '';  // Kalória mező ürítése
        })
        .catch(error => {
            console.error('Hiba történt a recept feltöltése során:', error);
            alert('Hiba történt a feltöltés során.');
        });
    
    
}