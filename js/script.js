const inputRadios = document.querySelectorAll('input[type="radio"]');
const form = document.getElementById('form');
const messageSent = document.querySelector('.message-sent');

function isCorrectText(inputText) {
    const value = inputText.value.trim();
    return value !== '';
}

function isCorrectEmail(inputEmail) {
    let requiredEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const email = inputEmail.value.trim();
    if (email) {
        return requiredEmail.test(email) ? true : false;
    } else {return false}
}

function errorText(inputText) {
    const errorText = inputText.closest('div').querySelector('.error');
    inputText.classList.add('error-input');
    errorText.style.display = 'block';
    errorText.setAttribute('aria-hidden', 'false');
}

function removeErrorText(inputText) {
    inputText.classList.remove('error-input');
    inputText.setAttribute('aria-invalid', 'false');
    const errorText = inputText.closest('div').querySelector('.error');
    errorText.style.display = 'none';
    errorText.setAttribute('aria-hidden', 'true');
}

function noSelectedConsent(consent) {
    consent.closest('.part').querySelector('.error').style.display = 'block';
}

function removeErrorConsent(consent) {
    consent.closest('.part').querySelector('.error').style.display = 'none';
}

function validForm(e) {
    e.preventDefault();
    let isAllCorrect = true;
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');
    const isFirstNameCorrect = isCorrectText(firstname);
    const isLastNameCorrect = isCorrectText(lastname);
    const isEmailCorrect = isCorrectEmail(email);
    const isSelecedSomeRadio = Array.from(inputRadios).some(r => r.checked);
    const isMessageCorrect = isCorrectText(message);
    const isConsentSelected = consent.checked; 
    if (!isFirstNameCorrect) {
        errorText(firstname);
        isAllCorrect = false;
    } else if (firstname.classList.contains('error-input')) {
        removeErrorText(firstname);
    }

    if (!isLastNameCorrect) {
        errorText(lastname);
        isAllCorrect = false;
    } else if (lastname.classList.contains('error-input')) {
        removeErrorText(lastname);
    }

    if (!isEmailCorrect) {
        errorText(email);
        isAllCorrect = false;
    } else if (email.classList.contains('error-input')) {
        removeErrorText(email);
    }

    const errorRadio = document.querySelector('.error-radio');
    if (!isSelecedSomeRadio) {
        errorRadio.style.display = 'block';
        isAllCorrect = false;
    } else {
        errorRadio.style.display = 'none';
    }

    if (!isMessageCorrect) {
        errorText(message);
        isAllCorrect = false;
    } else if (message.classList.contains('error-input')) {
        removeErrorText(message);
    }

    if (!isConsentSelected) {
        noSelectedConsent(consent);
        isAllCorrect = false;
    } else {removeErrorConsent(consent)}

    if (isAllCorrect) {
        messageSent.style.display = 'block';
        inputRadios.forEach(input => {
            input.closest('.over').classList.remove('over--active');
        });
        form.reset();

    }
}

function selectRadio(e) {
    const block = e.currentTarget.closest('.over');
    inputRadios.forEach(input => input.closest('.over').classList.remove('over--active'));
    block.classList.add('over--active');
}

function resetAll() {
    inputRadios.forEach(input => {
        input.checked = false;
        input.closest('.over').classList.remove('over--active');
    });
    document.querySelectorAll('input, textarea').forEach(input => {
        input.classList.remove('error-input');
        input.setAttribute('aria-invalid', 'true');
    });
    document.getElementById('consent').checked = false;
    form.reset();
}



inputRadios.forEach(inputRadio => inputRadio.addEventListener('click', selectRadio));
form.addEventListener('submit', validForm);

document.addEventListener('DOMContentLoaded', resetAll);