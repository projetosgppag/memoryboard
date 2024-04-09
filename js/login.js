const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    const regex = /^[a-zA-Z]+$/;
    if (target.value.length > 2 && regex.test(target.value)) {
        button.removeAttribute('disabled');
        return;
    }

    button.setAttribute('disabled', '');
}
const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location = 'pages/jogo.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);