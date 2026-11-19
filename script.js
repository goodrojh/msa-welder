const emailLink = document.querySelector("#email-apply");
const subject = "Отклик на вакансию электрогазосварщика";
const body = [
  "Здравствуйте! Хочу откликнуться на вакансию электрогазосварщика.",
  "",
  "Имя:",
  "Телефон:",
  "Разряд и опыт работы:",
].join("\r\n");
emailLink.href = `mailto:hr@unicont.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const heroForm = document.querySelector(".callback-form");
const dialog = document.querySelector(".callback-dialog");
const dialogForm = heroForm.cloneNode(true);
dialog.append(dialogForm);

for (const form of [heroForm, dialogForm]) {
  const name = form.elements.namedItem("Имя");
  const phone = form.elements.namedItem("Телефон");
  phone.addEventListener("input", () => phone.setCustomValidity(""));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const number = phone.value.trim();
    const digits = number.replace(/\D/g, "");
    if (!/^[+\d().\s-]+$/.test(number) || digits.length < 7 || digits.length > 15) {
      phone.setCustomValidity("Введите номер телефона с кодом города или страны.");
      phone.reportValidity();
      return;
    }

    const message = [
      "Здравствуйте! Хочу откликнуться на вакансию электрогазосварщика.",
      "",
      `Имя: ${name.value.trim()}`,
      `Телефон: ${number}`,
    ].join("\r\n");
    window.location.href = `mailto:hr@unicont.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  });
}

for (const trigger of document.querySelectorAll("[data-open-application]")) {
  trigger.addEventListener("click", (event) => {
    if (typeof dialog.showModal !== "function") return;
    event.preventDefault();
    dialog.showModal();
    dialogForm.elements.namedItem("Имя").focus({ preventScroll: true });
  });
}
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

const map = document.querySelector("#location-map");
const mapButtons = document.querySelectorAll(".map-select");
for (const button of mapButtons) {
  button.addEventListener("click", () => {
    if (button.getAttribute("aria-pressed") === "true") return;
    for (const item of mapButtons) {
      item.setAttribute("aria-pressed", String(item === button));
    }
    map.title = `Яндекс Карты — ${button.textContent.trim()}`;
    map.src = button.dataset.map;
  });
}

const mobileApply = document.querySelector(".mobile-apply");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(([entry]) => {
    const formIsVisible = entry.intersectionRatio >= 0.45;
    mobileApply.toggleAttribute("inert", formIsVisible);
    mobileApply.classList.toggle("is-hidden", formIsVisible);
  }, { threshold: 0.45 });
  observer.observe(heroForm);
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-event]");
  if (!link || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event: link.dataset.event });
});
