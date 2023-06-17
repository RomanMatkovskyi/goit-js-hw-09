import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');
const delayInputEl = document.querySelector('[name="delay"]');
const stepInputEl = document.querySelector('[name="step"]');
const amountInputEl = document.querySelector('[name="amount"]');
formEl.addEventListener('submit', event => {
  event.preventDefault();
  let delay = Number(delayInputEl.value);
  let step = Number(stepInputEl.value);
  let amount = Number(amountInputEl.value);
  let stepValue = delay;
  for (let position = 1; position <= amount; position++) {
    createPromises(position, stepValue)
      .then(results => {
        Notiflix.Notify.success(
          `Fulfilled promise ${position} in ${results} ms`
        );
      })
      .catch(error => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${error} ms`);
      });
    stepValue += step;
  }
});

function createPromises(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });
}
