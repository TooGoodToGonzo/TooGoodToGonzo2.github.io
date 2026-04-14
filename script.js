const pageName = document.body.getAttribute("data-page") || "Unknown Page";
const startTime = Date.now();

document.querySelectorAll("nav a").forEach(function(link) {
  link.addEventListener("click", function() {
    if (typeof gtag === "function") {
      gtag("event", "navigation_click", {
        page_name: pageName,
        link_text: this.textContent,
        destination: this.getAttribute("href")
      });
    }
  });
});

document.querySelectorAll(".track-button").forEach(function(button) {
  button.addEventListener("click", function() {
    if (typeof gtag === "function") {
      gtag("event", "button_click", {
        page_name: pageName,
        button_text: this.textContent
      });
    }
    alert("Button clicked");
  });
});

document.querySelectorAll("form").forEach(function(form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (typeof gtag === "function") {
      gtag("event", "form_submission", {
        page_name: pageName,
        form_id: this.id
      });
    }

    alert("Form submitted");
    this.reset();
  });
});

window.addEventListener("beforeunload", function() {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);

  if (typeof gtag === "function") {
    gtag("event", "time_on_page", {
      page_name: pageName,
      time_seconds: timeSpent
    });
