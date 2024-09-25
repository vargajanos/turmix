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

    axios.post(`${serverUrl}/login`,  user).then(res =>{
        console.log(res.data);
        if (res.status != 202){
            alert(res.data);
            return;
        }

        loggedUser = res.data;
        localStorage.setItem('cookbook', JSON.stringify(loggedUser));
        renderNavItems();
        console.log(loggedUser[0].ID);
        render('breakfast');
    });
}

function logout(){
    localStorage.removeItem('cookbook');
    loggedUser = null;
    renderNavItems();
    render('login');
}

function getMe(){
    axios.get(`${serverUrl}/me/${loggedUser[0].ID}`, authorize()).then(res => {
        document.querySelector('#name').value = res.data[0].name;
        document.querySelector('#email').value = res.data[0].email;
        document.querySelector('#phone').value = res.data[0].phone;
        document.querySelector('#role').value = res.data[0].role;
    });
}

function smallrecipe(id){
    
    render('smallrecipe').then(()=>{
            axios.get(`${serverUrl}/recipes/${id}`, authorize()).then(res => {
                document.querySelector('#title').value = res.data[0].title;
                document.querySelector('#catgory').value = res.data[0].catgory;
                document.querySelector('#description').value = res.data[0].description;
                document.querySelector('#time').value = res.data[0].time;
                document.querySelector('#additions').value = res.data[0].additions;
                document.querySelector('#calory').value = res.data[0].calory;

                document.querySelector('#goBack').onclick = function() {goBack()};
            });
        });
    }