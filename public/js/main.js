const login_btn = document.querySelector('.login_btn');
const register = document.querySelector('.register');
const login = document.querySelector('.login');
const welcome = document.querySelector('.welcome');
const register_btn= document.querySelector('.register_btn');

login_btn.addEventListener('click', ()=>{
    login.classList.add('active');
    welcome.classList.add('active');
    login_btn.classList.add('active');
    register_btn.classList.add('active');
    register.classList.add('active');
})

register_btn.addEventListener('click',()=>{
    login.classList.remove('active');
    welcome.classList.remove('active');
    login_btn.classList.remove('active');
    register_btn.classList.remove('active');
    register.classList.remove('active');  
})