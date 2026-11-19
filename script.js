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

const mobileApply = document.querySelector(".mobile-apply");
const contacts = document.querySelector("#apply");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(([entry]) => {
    mobileApply.toggleAttribute("inert", entry.isIntersecting);
    mobileApply.classList.toggle("is-hidden", entry.isIntersecting);
  });
  observer.observe(contacts);
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-event]");
  if (!link || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event: link.dataset.event });
});
