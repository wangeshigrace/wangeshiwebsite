(() => {
// SCROLL REVEAL
function revealOnScroll() {
    let elements = document.querySelectorAll(".reveal");

    elements.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// TYPEWRITER
const text = "Hey, I'm Wangeshi";
let i = 0;

function typeWriter() {
    const target = document.getElementById("typed-text");
    if (!target) return;

    if (i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
    }
}

window.addEventListener("load", typeWriter);
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
// CURSOR GLOW
document.querySelectorAll(".identity-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", e.clientX - rect.left + "px");
        card.style.setProperty("--y", e.clientY - rect.top + "px");
    });
});

// ===== IDENTITY CARD FLIP =====
document.querySelectorAll(".identity-card").forEach(card => {
    const isTouchMode = () => window.matchMedia("(hover: none), (pointer: coarse)").matches || window.innerWidth <= 900;

    card.addEventListener("click", (e) => {
        if (isTouchMode()) {
            e.preventDefault();
            card.classList.toggle("flipped");
        }
    });

    card.addEventListener("mouseenter", () => {
        if (!isTouchMode()) {
            card.classList.add("flipped");
        }
    });

    card.addEventListener("mouseleave", () => {
        if (!isTouchMode()) {
            card.classList.remove("flipped");
        }
    });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    const closeMenu = () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    hamburger.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        toggleMenu();
    }, true);

    // Close menu when a link is tapped
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on outside tap
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });
}
})();
