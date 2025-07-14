import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector(".btn");
const calendar = document.querySelector("#datetime-picker");
const daysHTML = document.querySelector(`.value[data-days]`);
const hoursHTML = document.querySelector(`.value[data-hours]`);
const minutesHTML = document.querySelector(`.value[data-minutes]`);
const secondsHTML = document.querySelector(`.value[data-seconds]`);
let userSelectedDate = null;

button.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
          iziToast.show({
            title: 'Error',
              message: 'Illegal operation',
              position: 'topRight',
              messageColor: '#fff',
              titleColor: '#fff',
              color: '#ef4040',
              iconUrl: '../img/bi_x-octagon.svg'

            });
          button.disabled = true;
          return
      }
     userSelectedDate = selectedDate;
     button.disabled = false;
  },
};

flatpickr(calendar, options);

button.addEventListener("click", handleClick);


let isActive = false
function handleClick() {
    if (isActive) {
        return
    }
    isActive = true;
    if (isActive === true) {
        button.disabled = true;
        calendar.disabled = true;
    }
    setInterval(() => {
        const currentTime = Date.now();
        const chosenTime = userSelectedDate.getTime();
        const deltaTime = chosenTime - currentTime;

         if (deltaTime <= 0) {
            clearInterval(timerId);
            daysHTML.textContent = "00";
            hoursHTML.textContent = "00";
            minutesHTML.textContent = "00";
            secondsHTML.textContent = "00";
            return;
        }
        const {days, hours, minutes, seconds} = convertMs(deltaTime);
        
        const addLeadingZero = (value) => String(value).padStart(2, "0");
        daysHTML.textContent = addLeadingZero(days);
        hoursHTML.textContent = addLeadingZero(hours);
        minutesHTML.textContent = addLeadingZero(minutes);
        secondsHTML.textContent = addLeadingZero(seconds);
        
    
    }, 1000);
    
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}