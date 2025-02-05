document.addEventListener("DOMContentLoaded", function () {
    const togglerBtn = document.getElementById("navbarTogglerBtn");
    const togglerIcon = document.getElementById("togglerIcon");

    togglerBtn.addEventListener("click", function () {
        if (togglerIcon.classList.contains("navbar-toggler-icon")) {
            togglerIcon.classList.remove("navbar-toggler-icon");
            togglerIcon.innerHTML = "&times;"; // Agrega una "X"
            togglerIcon.style.color = "white"; // Ajusta el color si es necesario
        } else {
            togglerIcon.classList.add("navbar-toggler-icon");
            togglerIcon.innerHTML = ""; // Vuelve al icono original de Bootstrap
        }
    });
});