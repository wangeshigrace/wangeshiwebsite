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


// TYPEWRITER
const text = "Hey, I’m Wangeshi ✨";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typed-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
    }
}

window.onload = typeWriter;
window.addEventListener('scroll', function() {
  const header = document.querySelector('your-header-selector'); // replace with your header selector, e.g., 'header' or '#header'
  if (window.scrollY > 50) { // adjust the scroll value as needed
    header.classList.add('header-transparent');
  } else {
    header.classList.remove('header-transparent');
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

// MODAL
const modal = document.getElementById("cardModal");
const title = document.getElementById("modalTitle");
const desc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".close-modal");

document.querySelectorAll(".identity-card").forEach(card => {
    card.addEventListener("click", () => {
        title.innerText = card.dataset.title;
        desc.innerText = card.dataset.desc;
        modal.style.display = "flex";
    });
});

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};
// ===== 3D TILT =====
document.querySelectorAll(".identity-card").forEach(card => {

    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 10;
        const rotateY = (x - centerX) / 10;

        const inner = card.querySelector(".card-inner");
        inner.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    });

    card.addEventListener("mouseleave", () => {
        const inner = card.querySelector(".card-inner");
        inner.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });

});


// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is tapped
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
        });
    });

    // Close menu on outside tap
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
        }
    });
}
