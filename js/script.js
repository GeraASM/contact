const inputNames = document.querySelectorAll('input[type="text"]');
const form = document.getElementById('form');

function errorName() {

}

function validForm(e) {
    e.preventDefault();
    const firstname = document.getElementById('firstname');
    firstname.closest('div').querySelector('')
    if (!firstname.value.trim()) {

    }
}








form.addEventListener('submit', validForm);