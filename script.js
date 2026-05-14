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
const text = "Hey, I’m Wangeshi ✨";
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

// ===== REEL VIDEO AUTOPLAY SUPPORT =====
function primeReelVideo(video) {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.preload = "auto";
}

function tryPlayReel(video) {
    primeReelVideo(video);
    const promise = video.play();
    if (promise && typeof promise.catch === "function") {
        promise.catch(() => {});
    }
}

function initReelStrip() {
    const track = document.querySelector(".marquee-track");
    if (!track) {
        return { track: null, videos: [] };
    }

    if (!track.dataset.reelCloned) {
        const originalCards = Array.from(track.children);

        originalCards.forEach((card) => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
        });

        track.dataset.reelCloned = "true";
        track.style.animation = "none";
        track.offsetHeight;
        track.style.animation = "";
    }

    const videos = Array.from(track.querySelectorAll(".reel-card video"));

    videos.forEach((video) => {
        primeReelVideo(video);

        if (video.readyState === 0) {
            try {
                video.load();
            } catch (error) {
                // Ignore browsers that do not want an explicit load() here.
            }
        }

        if (video.readyState >= 2) {
            tryPlayReel(video);
        } else {
            video.addEventListener("loadeddata", () => tryPlayReel(video), { once: true });
            video.addEventListener("canplay", () => tryPlayReel(video), { once: true });
        }
    });

    return { track, videos };
}

const reelStrip = initReelStrip();
const reelVideos = reelStrip.videos;

const reelVideoObserver = typeof IntersectionObserver === "function"
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target;

            if (entry.isIntersecting) {
                tryPlayReel(video);
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.35 })
    : null;

window.addEventListener("load", () => reelVideos.forEach(tryPlayReel));

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        reelVideos.forEach(tryPlayReel);
    } else {
        reelVideos.forEach((video) => video.pause());
    }
});

["touchstart", "click", "scroll"].forEach((eventName) => {
    window.addEventListener(eventName, () => reelVideos.forEach(tryPlayReel), { once: true, passive: true });
});

if (reelStrip.track) {
    reelStrip.track.addEventListener("animationiteration", () => {
        reelVideos.forEach((video) => {
            if (video.paused) {
                try {
                    video.currentTime = 0;
                } catch (error) {
                    // Some browsers can block currentTime writes while buffering.
                }
            }

            tryPlayReel(video);
        });
    });
}

if (reelVideoObserver) {
    reelVideos.forEach((video) => reelVideoObserver.observe(video));
}


// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is tapped
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu on outside tap
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}
