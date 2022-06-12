const addressForm = document.querySelector('#address-form'),
  cepInput = document.querySelector('#cep'),
  cityInput = document.querySelector('#city'),
  addressInput = document.querySelector('#address'),
  neighbordhoodInput = document.querySelector('#neighbordhood'),
  regionInput = document.querySelector('#region'),
  formInputs = document.querySelectorAll('[data-input]');

const closerBtn = document.querySelector('#closer-message');

const fadeElement = document.querySelector('#fade');

cepInput.addEventListener('keypress', e => {

  const onlyNumbers = /[0-9]/;

  const key = String.fromCharCode(e.keyCode);

  if (!onlyNumbers.test(key)) {
    e.preventDefault();
    return;
  }

})

cepInput.addEventListener('keyup', e => {

  const inputValue = e.target.value

  if (inputValue.length === 8) {
    getAddress(inputValue);
  }

})

const getAddress = async cep => {

  toggleLoader();

  cepInput.blur();

  const apiUrl = `https://viacep.com.br/ws/${cep}/json`;

  const response = await fetch(apiUrl);

  const data = await response.json();

  if (data.erro === 'true') {

    if (!addressInput.hasAttribute('disabled')) {
        toggleDisabled();
    }

    addressForm.reset();
    toggleLoader();
    toggleMessage("CEP inválido, tente novamente !")
    return;
  }

  if (!addressInput.value) {
    toggleDisabled();
  } 

  addressInput.value = data.logradouro;
  cityInput.value = data.localidade;
  neighbordhoodInput.value = data.bairro;
  regionInput.value = data.uf;

  toggleLoader();

}

const toggleDisabled = () => {

  if (regionInput.hasAttribute('disabled')) {

    formInputs.forEach(input => {
      input.removeAttribute('disabled');
    });

  } else {
    formInputs.forEach(input => {
      input.setAttribute('disabled', 'disabled');
    });
  }

}

addressForm.addEventListener('submit', e => {
  
  e.preventDefault();

  toggleLoader();

  setTimeout(() => {

    toggleLoader();

    toggleMessage("Endereço cadastrado !");

    addressForm.reset();

    toggleDisabled();

  }, 1500)

})

const toggleLoader = () => {


  const loadElement = document.querySelector('#load');

  fadeElement.classList.toggle('hide');
  loadElement.classList.toggle('hide');

}

const toggleMessage = message => {

  const messageElement = document.querySelector('#message'),
    messageElementText = document.querySelector('#message p');

  messageElementText.innerText = message;

  fadeElement.classList.toggle('hide');
  messageElement.classList.toggle('hide');

}

closerBtn.addEventListener('click', toggleMessage);
