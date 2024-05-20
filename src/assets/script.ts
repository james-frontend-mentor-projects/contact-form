const form = document.querySelector("form")!;
const toast = document.querySelector(".toast")!;

function clearErrors() {
  form.querySelectorAll("error").forEach((field) => {
    field.classList.remove("show");
  });
}

function clearErrorInput(event: InputEvent) {
  if (event.data === "") return;
  document
    .querySelectorAll(
      `[data-for*=${(event.target as HTMLElement).getAttribute("name")}].error, [data-for*=${(event.target as HTMLElement).getAttribute("name")}]+.error`
    )
    .forEach((field) => {
      field.classList.remove("show");
    });
}
function clearErrorClick(event: MouseEvent) {
  document
    .querySelectorAll(
      `[data-for*=${(event.target as HTMLElement).getAttribute("name")}].error, [data-for*=${(event.target as HTMLElement).getAttribute("name")}]+.error`
    )
    .forEach((field) => {
      field.classList.remove("show");
    });
}

form.oninput = clearErrorInput;

const generalEnquiry = form.querySelector("[for=general-enquiry]")! as HTMLLabelElement;
generalEnquiry.onclick = clearErrorClick;

const supportQuery = form.querySelector("[for=support-query]")! as HTMLLabelElement;
supportQuery.onclick = clearErrorClick;

const consent = form.querySelector("[for=consent]")! as HTMLLabelElement;
consent.onclick = clearErrorClick;

form.onsubmit = async (event) => {
  event.preventDefault();

  clearErrors();

  const res = await fetch("/.netlify/functions/validate-input", {
    method: "POST",
    body: JSON.stringify({
      "first-name": (form.querySelector('[name="first-name"]') as HTMLInputElement)?.value,
      "last-name": (form.querySelector('[name="last-name"]') as HTMLInputElement)?.value,
      email: (form.querySelector('[name="email"]') as HTMLInputElement)?.value,
      message: (form.querySelector('[name="message"]') as HTMLInputElement)?.value,
      "query-type": (form.querySelector('[name="query-type"]:checked') as HTMLInputElement)?.value,
      consent: (form.querySelector('[name="consent"]') as HTMLInputElement)?.checked,
    }),
  });
  switch (res.status) {
    case 204:
      // Handle success case
      form.reset();
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2900);
      break;
    case 400:
      // Handle bad request case
      const badFields = (await res.json()).badFields;
      const badFieldsSet = new Set(badFields);
      console.log(badFieldsSet);
      badFieldsSet.forEach((field) => {
        form.querySelector(`[id="${field}"] + .error, [id="${field}"].error`).classList.add("show");
      });
      break;
    case 422:
      // Handle unprocessable entity case
      console.error("Unprocessable entity");
      break;
    case 500:
      // Handle server error case
      console.error("Server error");
      break;
    default:
      // Handle other cases
      console.error("Unknown error", res.status);
      break;
  }
};
