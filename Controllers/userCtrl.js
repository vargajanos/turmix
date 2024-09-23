function registration(){
    let newUser = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value,
        passwd: document.querySelector('#passwd').value,
        confirm: document.querySelector('#confirm').value

    }

    axios.post(`${serverUrl}/reg`, newUser).then(res => {
        alert(res.data);
    });
}

function login(){
    let user = {
        name: document.querySelector('#name').value,
        passwd: document.querySelector('#passwd').value
    }

    axios.post(`${serverUrl}/login`, user).then(res =>{
        console.log(res.data);
        if (res.status != 202){
            alert(res.data);
            return;
        }

        loggedUser = res.data;
        localStorage.setItem('cookbook', JSON.stringify(loggedUser));
        renderNavItems();
        render('breakfast');
    });
}

function logout(){
    localStorage.removeItem('cookbook');
    loggedUser = null;
    renderNavItems();
    render('login');
}

