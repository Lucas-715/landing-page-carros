document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA DO BOTÃO VENDEDOR ---
    const btnVendedor = document.querySelector(".btn-vendedor");
    btnVendedor.addEventListener("click", (event) => {
        event.preventDefault(); // Impede o link de navegar
        alert('O serviço via WhatsApp está indisponível no momento.');
    });

    // --- LÓGICA DO CARROSSEL ---
    let currentIndex = 0;
    const slides = document.querySelectorAll(".carrossel-slide");
    const totalSlides = slides.length;
    const nextBtn = document.querySelector(".carrossel-next");
    const prevBtn = document.querySelector(".carrossel-prev");
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = (i === index) ? "1" : "0";
            slide.style.display = (i === index) ? "block" : "none";
        });
        currentIndex = index;
    }

    function nextSlide() {
        let newIndex = (currentIndex + 1) % totalSlides;
        showSlide(newIndex);
    }

    function prevSlide() {
        let newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(newIndex);
    }

    function startAutoSlide() {
        stopAutoSlide(); // Garante que não haja múltiplos intervalos rodando
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoSlide();
    });

    showSlide(currentIndex);
    startAutoSlide();

    // --- LÓGICA DO BOTÃO VOLTAR AO TOPO ---
    const btnTopo = document.getElementById("btnTopo");

    window.onscroll = function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            btnTopo.style.display = "block";
        } else {
            btnTopo.style.display = "none";
        }
    };

    btnTopo.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- ANIMAÇÃO DE SURGIMENTO AO ROLAR ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Opcional: para a animação ocorrer só uma vez
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(el => observer.observe(el));
});