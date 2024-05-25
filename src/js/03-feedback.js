import throttle from 'lodash.throttle';

const lsDataKey = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');
const storedFormData = JSON.parse(localStorage.getItem(lsDataKey)) ?? {};

Object.keys(storedFormData).forEach(key => {
  const inputRef = formRef.querySelector(`[name="${key}"]`);
  inputRef.value = storedFormData[key];
});

const formInputHandler = function () {
  const formData = new FormData(this);
  const formDataObj = Object.fromEntries(formData.entries());
  localStorage.setItem(lsDataKey, JSON.stringify(formDataObj));
};

const formSubmitHandler = function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const formDataObj = Object.fromEntries(formData.entries());
  console.log(formDataObj);

  this?.reset();
  localStorage.removeItem(lsDataKey);
};

formRef.addEventListener('input', throttle(formInputHandler, 500));
formRef.addEventListener('submit', formSubmitHandler);
