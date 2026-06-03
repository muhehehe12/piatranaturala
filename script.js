document.addEventListener("DOMContentLoaded", () => {

    // --- 1. ANIMAȚIE LA ÎNCĂRCARE PENTRU BARA DE SUS (NAVBAR) ---
    const navbar = document.getElementById("navbar");
    if (navbar) {
        setTimeout(() => {
            navbar.classList.add("opened");
        }, 150); // Deschidere fluidă la 150ms după încărcarea DOM-ului
    }

    // --- 2. ANIMAȚII LA SCROLL (INTERSECTION OBSERVER) ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15, // Elementul se activează când 15% din el este vizibil
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Se rulează animația o singură dată
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- 3. SISTEM BILINGV CURAT (RO / EN) ---
    const btnRo = document.getElementById("lang-ro");
    const btnEn = document.getElementById("lang-en");

    // Selectăm toate elementele care conțin atributele de traducere directă
    const translatableElements = document.querySelectorAll("[data-ro]");

    function switchLanguage(lang) {
        translatableElements.forEach(el => {
            if (lang === "ro") {
                el.textContent = el.getAttribute("data-ro");
            } else if (lang === "en") {
                el.textContent = el.getAttribute("data-en");
            }
        });

        // Actualizare stare vizuală butoane switcher
        if (lang === "ro") {
            btnRo.classList.add("active");
            btnEn.classList.remove("active");
            document.documentElement.setAttribute("lang", "ro");
        } else {
            btnEn.classList.add("active");
            btnRo.classList.remove("active");
            document.documentElement.setAttribute("lang", "en");
        }
    }

    // Evenimente click pentru butoanele de limbă
    btnRo.addEventListener("click", () => switchLanguage("ro"));
    btnEn.addEventListener("click", () => switchLanguage("en"));
});