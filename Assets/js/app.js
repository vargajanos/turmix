const AppTitle = "Somodi Konrád Turmixcombo";
const AppVersion = "v1.0";
const Author = "13.A SZOFT";
const Company = "Bajai SZC Türr István Technikum";

const serverUrl = 'http://localhost:3000';

let loggedUser = null;

let title = document.querySelector('title');
let header = document.querySelector('header');
let footer = document.querySelector('footer');

title.innerHTML = AppTitle + ' ' + AppVersion;
header.innerHTML = title.innerHTML;
footer.innerHTML = Company + ' | ' + Author + ' | 2024.';

// render the actual content to the main div 
async function render(view){
    let main = document.querySelector('main');
    main.innerHTML = await (await fetch(`Views/${view}.html`)).text();

    switch(view){
        case 'login': {
            getMe();
            break;
        }
        case 'registration': {
            getUsers();
            break;
        }
        case '':{
            getStepDatas();
            break;
        }

    }
}