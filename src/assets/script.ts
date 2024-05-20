const form = document.querySelector("form")!;
const toast = document.querySelector(".toast")!;

form.onsubmit = (event) => {
  event.preventDefault();

  const success = true;

  if (success) {
    toast.classList.add("show");
    // Remove the "show" class after another 5 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2900);
  }
};
