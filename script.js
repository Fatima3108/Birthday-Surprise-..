
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");


// OPEN SURPRISE

function openSurprise() {

    document.getElementById("opening").classList.add("hidden");

    document.getElementById("mainContent").classList.remove("hidden");

    musicBtn.classList.remove("hidden");

    music.play().catch(() => {
        musicBtn.textContent = "♫ Play Music";
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    createConfetti();
}


// MUSIC CONTROL

function toggleMusic() {

    if (music.paused) {

        music.play();

        musicBtn.textContent = "♫ Music On";

    } else {

        music.pause();

        musicBtn.textContent = "♫ Music Off";

    }

}


// UPLOAD PHOTO AND VIDEO

const mediaUpload = document.getElementById("mediaUpload");
const gallery = document.getElementById("gallery");

mediaUpload.addEventListener("change", function(event) {

    const files = Array.from(event.target.files);

    if (files.length > 0) {

        gallery.innerHTML = "";

    }

    files.forEach(file => {

        const url = URL.createObjectURL(file);

        const item = document.createElement("div");

        item.className = "gallery-item";

        let media;

        if (file.type.startsWith("image/")) {

            media = document.createElement("img");

            media.src = url;

            media.alt = "Birthday memory";

        } else if (file.type.startsWith("video/")) {

            media = document.createElement("video");

            media.src = url;

            media.controls = true;

            media.playsInline = true;

        } else {

            URL.revokeObjectURL(url);

            return;

        }

        const removeBtn = document.createElement("button");

        removeBtn.textContent = "×";

        removeBtn.onclick = function() {

            URL.revokeObjectURL(url);

            item.remove();

            if (gallery.children.length === 0) {

                gallery.innerHTML = `
                    <div class="empty-gallery">
                        <span>📸</span>
                        <p>Your memories will appear here.</p>
                    </div>
                `;

            }

        };

        item.appendChild(media);

        item.appendChild(removeBtn);

        gallery.appendChild(item);

    });

    // Reset supaya file yang sama bisa dipilih lagi
    mediaUpload.value = "";

});


// CONFETTI EFFECT

function createConfetti() {

    const colors = [
        "#d8b56d",
        "#ffffff",
        "#e8c77d",
        "#8da9c4"
    ];

    for (let i = 0; i < 80; i++) {

        const confetti = document.createElement("div");

        confetti.style.position = "fixed";

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.top = "-20px";

        confetti.style.width = "8px";

        confetti.style.height = "8px";

        confetti.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.borderRadius = "50%";

        confetti.style.zIndex = "9999";

        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const duration = Math.random() * 3000 + 2000;

        const distance = window.innerHeight + 100;

        confetti.animate([

            {
                transform: "translateY(0) rotate(0deg)",
                opacity: 1
            },

            {
                transform: `translateY(${distance}px) rotate(720deg)`,
                opacity: 0
            }

        ], {

            duration: duration,

            easing: "linear"

        });

        setTimeout(() => {

            confetti.remove();

        }, duration);

    }

}