const AppTitle = "Somodi Konrád és Zsófi Turmixcombo XD";
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
        case 'breakfast': {
            
            recept(4);
            break;
        }

        case 'dinner': {
            recept(6);
            break;
        }
        case 'appetizer': {
            recept(1);
            break;
        }
        case 'dessert': {
            recept(5);
            break;
        }
        case 'maincCourse': {
            recept(2);
            break;
        }
        case 'sideDish': {
            recept(3);
            break;
        }
    
        case 'profile': {
            getMe();
            break;
        }

        case 'users': {
            getUsers();
            break;
        }

    }

}


if (localStorage.getItem('cookbook')){
    loggedUser = JSON.parse(localStorage.getItem('cookbook'));
    render('breakfast');
}else{
    render('login');
}

function renderNavItems() {
 
    let lgdOutNavItems = document.querySelectorAll('.lgdOut');
    let lgdInNavItems = document.querySelectorAll('.lgdIn');
    let admNavItems = document.querySelectorAll('.lgdAdm');
 
    if (!loggedUser ) {
        lgdOutNavItems.forEach(item => {
            item.classList.remove('d-none');
        });
        admNavItems.forEach(item => {
            item.classList.add('d-none');
        });
        lgdInNavItems.forEach(item => {
            item.classList.add('d-none');
        });
    }
 
    if (loggedUser && loggedUser[0].role === 'admin') {
        admNavItems.forEach(item => {
            item.classList.remove('d-none');
        });
 
        lgdInNavItems.forEach(item => {
            item.classList.remove('d-none');
        });
 
        lgdOutNavItems.forEach(item => {
            item.classList.add('d-none');
        });
    }
 
    if (loggedUser && loggedUser[0].role == 'user') {
        admNavItems.forEach(item => {
            item.classList.add('d-none');
        });
 
        lgdInNavItems.forEach(item => {
            item.classList.remove('d-none');
        });
 
        lgdOutNavItems.forEach(item => {
            item.classList.add('d-none');
        });
    }
}
 

function authorize(){
    console.log(loggedUser[0].ID + "Jókó szólsz!")
    let res = {
         headers: { "Authorization": loggedUser[0].ID  }
    }
    return res;
}


renderNavItems();