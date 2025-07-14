import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then((delay) => {
      iziToast.success({
        title: "✅ Fulfilled",
        message: `Promise in ${delay}ms`,
        position: "topRight",
        color: "#59a10d",
        messageColor: "#fff",
        titleColor: "#fff",
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "❌ Rejected",
        message: `Promise in ${delay}ms`,
        position: "topRight",
        color: "#ef4040",
        messageColor: "#fff",
        titleColor: "#fff",
      });
    });

  form.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}