document.addEventListener('DOMContentLoaded', function () {
    // Burger Menu
    const burgerButton = document.getElementById('burgerButton');
    const navMenu = document.getElementById('navMenu');

    if (burgerButton && navMenu) {
        burgerButton.addEventListener('click', function () {
            navMenu.classList.toggle('is-active');
        });

        document.addEventListener('click', function (event) {
            const isClickInside = navMenu.contains(event.target) || burgerButton.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('is-active')) {
                navMenu.classList.remove('is-active');
            }
        });
    }

    // Dropdown Menu
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropbtn && dropdownContent) {
        dropbtn.addEventListener('click', function () {
            dropdownContent.classList.toggle('show');
        });

        window.addEventListener('click', function (event) {
            if (!event.target.matches('.dropbtn') && dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        });
    }
});

    

    // Slideshow
    document.addEventListener('DOMContentLoaded', function() {
        let slideIndex = 0; // Commencer à 0 pour l'index
        let autoSlideTimeout;
    
        // Fonction pour afficher les slides
        function showSlides(n) {
            let i;
            const slides = document.getElementsByClassName("mySlides");
            const dots = document.getElementsByClassName("dot");
    
            if (n >= slides.length) {
                slideIndex = 0;
            }
            if (n < 0) {
                slideIndex = slides.length - 1;
            }
    
            // Masquer toutes les slides
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
    
            // Désactiver tous les dots
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
    
            // Afficher la slide active et activer le dot correspondant
            slides[slideIndex].style.display = "block";
            dots[slideIndex].className += " active";
        }
    
        // Fonction pour avancer/reculer dans les slides
        function plusSlides(n) {
            slideIndex += n;
            showSlides(slideIndex);
            resetAutoSlide();
        }
    
        // Fonction pour afficher une slide spécifique avec les dots
        function currentSlide(n) {
            slideIndex = n;
            showSlides(slideIndex);
            resetAutoSlide();
        }
    
        // Fonction pour automatiser le défilement des slides
        function autoSlide() {
            slideIndex++;
            showSlides(slideIndex);
            autoSlideTimeout = setTimeout(autoSlide, 4000);  // Change de slide toutes les 4 secondes
        }
    
        // Réinitialiser le défilement automatique après interaction
        function resetAutoSlide() {
            clearTimeout(autoSlideTimeout);
            autoSlideTimeout = setTimeout(autoSlide, 4000);  // Redémarrer après 4 secondes
        }
    
        // Ajouter les événements pour les dots
        const dots = document.getElementsByClassName("dot");
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', function() {
                currentSlide(i);
            });
        }
    
        // Ajouter les événements pour les flèches (next/prev)
        document.querySelector('.prev').addEventListener('click', function() {
            plusSlides(-1);
        });
    
        document.querySelector('.next').addEventListener('click', function() {
            plusSlides(1);
        });
    
        // Initialiser la première slide et lancer l'auto-défilement
        showSlides(slideIndex);
        autoSlide();
    });
    

    // Function for filtering gallery items
function filterSelection(category) {
    const columns = document.getElementsByClassName("column");
    const filterCategory = category.toLowerCase();

    Array.from(columns).forEach(column => {
        if (filterCategory === "all" || column.className.toLowerCase().includes(filterCategory)) {
            column.style.display = "block"; // Show matching items
            column.classList.add("show");
        } else {
            column.style.display = "none"; // Hide non-matching items
            column.classList.remove("show");
        }
    });

    // Update the active button
    const buttons = document.querySelectorAll("#myBtnContainer .btn2");
    buttons.forEach(button => button.classList.remove("active"));
    document.querySelector(`[onclick="filterSelection('${category}')"]`).classList.add("active");
}