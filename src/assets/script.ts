const form = document.querySelector("form")!;
const toast = document.querySelector(".toast")!;

form.onsubmit = async (event) => {
  event.preventDefault();

  const res = await fetch("/.netlify/functions/validate-input");
  const data = await res.json();
  console.log("data", data);

  //   const success = true;

  //   if (success) {
  //     toast.classList.add("show");
  //     // Remove the "show" class after another 5 seconds
  //     setTimeout(() => {
  //       toast.classList.remove("show");
  //     }, 2900);
  //   }
};
