import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = form.querySelector('[name="delay"]');
    const stateInputs = form.querySelectorAll('[name="state"]');
    const selectedState = Array.from(stateInputs).find(input => input.checked);

    if (!delayInput.checkValidity() || !selectedState) {
      iziToast.error({
        title: 'Error',
        message: 'Please fill in all fields.',
      });
      return;
    }

    const delay = parseInt(delayInput.value, 10);
    const selectedStateValue = selectedState.value;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedStateValue === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise.then(
      value => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${value}ms`,
        });
      },
      value => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${value}ms`,
        });
      }
    );
    form.reset();
  });
});
