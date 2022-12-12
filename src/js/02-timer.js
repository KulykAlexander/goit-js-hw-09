import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const textEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondstEl = document.querySelector('[data-seconds]');

const currentDate = new Date();
let timeRemain = {};
let msTimeRemain = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    msTimeRemain = selectedDates[0] - currentDate;
    if (selectedDates[0].getTime() <= currentDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtnEl.setAttribute('disabled', 'true');
    } else {
      startBtnEl.removeAttribute('disabled');
    }
  },
};
const fp = flatpickr('#datetime-picker', options);

startBtnEl.addEventListener('click', startBtnHendler);
startBtnEl.setAttribute('disabled', 'true');

function startBtnHendler() {
  setInterval(() => {
    if (msTimeRemain <= 0) {
      return;
    }
    timeRemain = convertMs(msTimeRemain);
    daysEl.textContent = timeRemain.days.toString().padStart(2, '0');
    hoursEl.textContent = timeRemain.hours.toString().padStart(2, '0');
    minutesEl.textContent = timeRemain.minutes.toString().padStart(2, '0');
    secondstEl.textContent = timeRemain.seconds.toString().padStart(2, '0');
    msTimeRemain -= 1000;
  }, 1000);
}

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
