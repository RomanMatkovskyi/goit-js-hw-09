import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let inputEL = document.getElementById('datetime-picker');
let btnEl = document.querySelector('button[data-start]');
let dayInput = document.querySelector('span[data-days]');
let hoursInput = document.querySelector('span[data-hours]');
let minutesInput = document.querySelector('span[data-minutes]');
let secondsInput = document.querySelector('span[data-seconds]');
btnEl.disabled = true;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      btnEl.disabled = false;
      return (selectedDate = selectedDates[0]);
    } else {
      // window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      btnEl.disabled = true;
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnEl.addEventListener('click', updateTimer);

function updateTimer() {
  let timerId = setInterval(() => {
    let timer = convertMs(selectedDate - Date.now());
    if (selectedDate - Date.now() >= 0) {
      dayInput.textContent = addLeadingZero(timer.days);
      hoursInput.textContent = addLeadingZero(timer.hours);
      minutesInput.textContent = addLeadingZero(timer.minutes);
      secondsInput.textContent = addLeadingZero(timer.seconds);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

flatpickr(inputEL, options);
