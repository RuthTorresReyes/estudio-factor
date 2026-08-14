/* Menú responsive */

function setMenuState(isOpen) {

    const menuButton = document.querySelector(".menu-toggle");

    if (!menuButton) {
        return;
    }

    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
}

document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelector(".nav-links");
    const menuButton = document.querySelector(".menu-toggle");

    if (!navLinks || !menuButton) {
        return;
    }

    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("responsive");
        setMenuState(navLinks.classList.contains("responsive"));
    });

});


/* Cerrar menú al cambiar de página */

document.addEventListener("click", (event) => {

    const navLinks = document.querySelector(".nav-links");

    if (!navLinks) {
        return;
    }

    if (
        navLinks.classList.contains("responsive") &&
        event.target.closest(".nav-links a")
    ) {
        navLinks.classList.remove("responsive");
        setMenuState(false);
    }

});


/* Botón volver arriba */

document.addEventListener("DOMContentLoaded", () => {

    const topButton = document.getElementById("backToTop");

    if (!topButton) {
        return;
    }

    window.addEventListener("scroll", () => {
        topButton.classList.toggle("show", window.scrollY > 400);
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});


/* Validación del formulario de contacto */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (!form) {
        return;
    }

    const formMessage = document.getElementById("formMessage");

    const campos = {
        nombre: {
            input: document.getElementById("nombre"),
            error: document.getElementById("errorNombre"),
            validar: (valor) => valor.trim().length > 0,
            mensaje: "Por favor ingresa tu nombre."
        },
        correo: {
            input: document.getElementById("correo"),
            error: document.getElementById("errorCorreo"),
            validar: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),
            mensaje: "Ingresa un correo electrónico válido."
        },
        proyecto: {
            input: document.getElementById("proyecto"),
            error: document.getElementById("errorProyecto"),
            validar: (valor) => valor.trim().length > 0,
            mensaje: "Selecciona un tipo de proyecto."
        },
        mensaje: {
            input: document.getElementById("mensaje"),
            error: document.getElementById("errorMensaje"),
            validar: (valor) => valor.trim().length > 0,
            mensaje: "Cuéntanos algo sobre tu proyecto."
        }
    };

    function validarCampo(campo) {

        const valor = campo.input.value;
        const esValido = campo.validar(valor);

        campo.input.classList.toggle("campo-invalido", !esValido);
        campo.error.textContent = esValido ? "" : campo.mensaje;

        return esValido;
    }

    /* Validar en tiempo real al salir del campo */

    Object.values(campos).forEach((campo) => {

        if (!campo.input) {
            return;
        }

        campo.input.addEventListener("blur", () => validarCampo(campo));
    });

    /* Validar todo al enviar */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        let formularioValido = true;

        Object.values(campos).forEach((campo) => {

            if (!campo.input) {
                return;
            }

            const esValido = validarCampo(campo);

            if (!esValido) {
                formularioValido = false;
            }
        });

        if (!formularioValido) {

            formMessage.textContent = "Por favor revisa los campos marcados en rojo.";
            formMessage.classList.add("show", "error-message");
            return;
        }

        /* Formulario demostrativo: no se envía a ningún servidor */

        formMessage.textContent = "¡Gracias! Tu consulta fue enviada correctamente.";
        formMessage.classList.remove("error-message");
        formMessage.classList.add("show");

        form.reset();
    });

});


/* Lightbox */

document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".gallery .img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    if (
        !images.length ||
        !lightbox ||
        !lightboxImg ||
        !lightboxClose ||
        !lightboxPrev ||
        !lightboxNext
    ) {
        return;
    }

    let currentIndex = 0;

    function openLightbox(index) {

        currentIndex = index;

        const image = images[currentIndex];

        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        lightboxImg.src = "";

        document.body.style.overflow = "";
    }

    function nextImage() {

        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    }

    function previousImage() {

        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    }

    images.forEach((image, index) => {
        image.addEventListener("click", () => openLightbox(index));
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", nextImage);
    lightboxPrev.addEventListener("click", previousImage);

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }
    });

});
