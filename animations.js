document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.querySelector(".main-content");

    function fadeInContent() {
        mainContent.classList.add("visible");
    }

    // Aplicar el efecto fade in después de un pequeño retraso
    setTimeout(fadeInContent, 500);
});
