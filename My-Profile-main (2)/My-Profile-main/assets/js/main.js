// Function to load HTML components
const loadSection = (id, file) => {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const container = document.getElementById(id);
      if (container) {
        container.innerHTML = data;
      }
    })
    .catch(err => console.error("Error loading:", file, err));
};


// Load components
loadSection("navbar", "components/navbar.html");
loadSection("footer", "components/footer.html");

// Load sections
loadSection("home-section", "sections/home.html");
loadSection("about", "pages/about.html");
loadSection("services", "pages/services.html");
loadSection("skills-projects", "pages/skills-projects.html");
loadSection("contact", "pages/contact.html");



const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  document.querySelectorAll("section[id]").forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});



// Dynamic Text Effect in Hero Section
const words = ["Digital", "Secure", "Scalable", "Efficient", "Modern"];
const dynamicText = document.querySelector(".dynamic-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    dynamicText.textContent = currentWord.slice(0, charIndex++);
    if (charIndex > currentWord.length) {
      setTimeout(() => (isDeleting = true), 1200);
    }
  } else {
    dynamicText.textContent = currentWord.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
}
setInterval(typeEffect, 120);

// Service Card "Read More" Toggle
//expand and collapse service cards
// ===== SERVICE CARD INTERACTION =====
const overlay = document.getElementById("service-overlay");

document.addEventListener("click", (e) => {
  const card = e.target.closest(".service-card");

  // READ MORE
  if (e.target.classList.contains("read-more")) {
    const isOpen = card.classList.contains("expanded");

    document.querySelectorAll(".service-card").forEach(c => {
      c.classList.remove("expanded");
      c.querySelector(".read-more").textContent = "READ MORE";
    });

    overlay.classList.remove("active");

    if (!isOpen) {
      card.classList.add("expanded");
      e.target.textContent = "SHOW LESS";
      overlay.classList.add("active");
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // CLOSE BUTTON (×)
  if (e.target.classList.contains("close-btn")) {
    card.classList.remove("expanded");
    card.querySelector(".read-more").textContent = "READ MORE";
    overlay.classList.remove("active");
  }
});

/* Click on overlay closes card */
overlay.addEventListener("click", () => {
  document.querySelectorAll(".service-card").forEach(c => {
    c.classList.remove("expanded");
    c.querySelector(".read-more").textContent = "READ MORE";
  });
  overlay.classList.remove("active");
});

// End of Service Card Interaction


// ===== SERVICE → PROJECT AUTO SCROLL =====
document.addEventListener("click", (e) => {
  const proof = e.target.closest(".proof-item");
  if (!proof) return;

  const targetId = proof.dataset.target;
  const project = document.getElementById(targetId);

  if (project) {
    // close service card
    document.querySelectorAll(".service-card").forEach(c => {
      c.classList.remove("expanded");
      c.querySelector(".read-more").textContent = "READ MORE";
    });

    document.getElementById("service-overlay").classList.remove("active");

    // scroll to project
    project.scrollIntoView({ behavior: "smooth", block: "center" });

    // highlight project
    project.classList.add("highlight-project");
    setTimeout(() => {
      project.classList.remove("highlight-project");
    }, 2000);
  }
});



// ===== END OF SERVICE → PROJECT AUTO SCROLL =====
 



const modal = document.getElementById("project-modal");

// Handle project card clicks
document.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (!card) return;

  // Open modal
  document.getElementById("modal-title").textContent = card.dataset.title;
  document.getElementById("modal-desc").textContent = card.dataset.desc;
  document.getElementById("modal-tech").textContent = card.dataset.tech;
  document.getElementById("modal-services").textContent = card.dataset.services;

  // document.getElementById("modal-github").href = card.dataset.github;
  // document.getElementById("modal-live").href = card.dataset.live;
  const linksContainer = document.getElementById("modal-links");
linksContainer.innerHTML = "";

const frontend = card.dataset.liveFrontend;
const backend = card.dataset.liveBackend;
const github = card.dataset.github;

// Frontend Live
if (frontend) {
  linksContainer.innerHTML += `
    <a href="${frontend}" target="_blank" class="btn primary">
      Frontend Live ↗
    </a>
  `;
}

// Backend API (only if exists)
if (backend) {
  linksContainer.innerHTML += `
    <a href="${backend}" target="_blank" class="btn secondary">
      Backend API ↗
    </a>
  `;
}

// GitHub (always show if exists)
if (github) {
  linksContainer.innerHTML += `
    <a href="${github}" target="_blank" class="btn outline">
      GitHub Repo ↗
    </a>
  `;
}


  modal.classList.add("active");
});

// Close modal
modal.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("modal-close") ||
    e.target === modal
  ) {
    modal.classList.remove("active");
  }
});



// contact form submission

// document.addEventListener("submit", function (e) {
//   const form = e.target;

//   // Only handle contact form
//   if (!form.classList.contains("contact-form")) return;

//   e.preventDefault();

//   const successMsg = form
//     .closest(".contact-right")
//     .querySelector(".status.success");

//   const errorMsg = form
//     .closest(".contact-right")
//     .querySelector(".status.error");

//   const submitBtn = form.querySelector("button");

//   // Reset messages
//   successMsg.classList.remove("show");
//   errorMsg.classList.remove("show");

//   // Validate required fields
//   let valid = true;
//   form.querySelectorAll("[required]").forEach(field => {
//     if (!field.value.trim()) valid = false;
//   });

//   // Button loading state
//   submitBtn.textContent = "SENDING...";
//   submitBtn.disabled = true;

//   setTimeout(() => {
//     submitBtn.textContent = "SUBMIT NOW";
//     submitBtn.disabled = false;

//     if (valid) {
//       successMsg.classList.add("show");
//       form.reset();

//       setTimeout(() => {
//         successMsg.classList.remove("show");
//       }, 4000);

//     } else {
//       errorMsg.classList.add("show");
//     }
//   }, 1200);
  

// });

/*Add emaailJS or formspree integration here in future*/

document.addEventListener("submit", function (e) {
  const form = e.target;
  if (!form.classList.contains("contact-form")) return;

  e.preventDefault();

  const successMsg = form.closest(".contact-right")
    .querySelector(".status.success");
  const errorMsg = form.closest(".contact-right")
    .querySelector(".status.error");

  const btn = form.querySelector("button");

  successMsg.classList.remove("show");
  errorMsg.classList.remove("show");

  btn.textContent = "SENDING...";
  btn.disabled = true;

  // 1️⃣ Send email to YOU
  emailjs.sendForm(
    "service_0wb729w",
    "template_rcasobk",
    form
  ).then(() => {

    // 2️⃣ Send auto-reply to USER
    return emailjs.sendForm(
      "service_0wb729w",
      "template_1gfseig",
      form
    );

  }).then(() => {
    btn.textContent = "SUBMIT NOW";
    btn.disabled = false;

    successMsg.classList.add("show");
    form.reset();

    setTimeout(() => {
      successMsg.classList.remove("show");
    }, 4000);

  }).catch(() => {
    btn.textContent = "SUBMIT NOW";
    btn.disabled = false;
    errorMsg.classList.add("show");
  });
});



// document.addEventListener("submit", function (e) {
//   const form = e.target;
//   if (!form.classList.contains("contact-form")) return;

//   e.preventDefault();

//   const successMsg = form.closest(".contact-right")
//     .querySelector(".status.success");
//   const errorMsg = form.closest(".contact-right")
//     .querySelector(".status.error");

//   const btn = form.querySelector("button");

//   successMsg.classList.remove("show");
//   errorMsg.classList.remove("show");

//   btn.textContent = "SENDING...";
//   btn.disabled = true;

//   emailjs.sendForm(
//     "service_b7an1wk",
//     "template_kizb9e9",
//     form
//   ).then(() => {
//     btn.textContent = "SUBMIT NOW";
//     btn.disabled = false;

//     successMsg.classList.add("show");
//     form.reset();

//     setTimeout(() => {
//       successMsg.classList.remove("show");
//     }, 4000);

//   }).catch(() => {
//     btn.textContent = "SUBMIT NOW";
//     btn.disabled = false;
//     errorMsg.classList.add("show");
//   });
// });


/*footre reveal animation*/
const footerContainer = document.getElementById("footer");

if (footerContainer) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      const footer = footerContainer.querySelector(".footer");
      if (entry.isIntersecting && footer) {
        footer.classList.add("show");
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(footerContainer);
}



/* Back to Top Button */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =====================================================
           OFFER LETTER POPUP
===================================================== */

// Open Popup
function openOffer(imagePath) {

    // Offer letter image change karega
    document.getElementById("popupImage").src = imagePath;

    // Popup show karega
    document.getElementById("offerPopup").classList.add("active");

    // Background scroll band
    document.body.style.overflow = "hidden";
}


// Close Popup
function closeOffer() {

    // Popup hide karega
    document.getElementById("offerPopup").classList.remove("active");

    // Scroll wapas on
    document.body.style.overflow = "auto";
}


// Popup ke bahar click karne par bhi close ho
document.addEventListener("click", function(e){

    const popup=document.getElementById("offerPopup");

    if(!popup) return;

    if(e.target===popup){

        closeOffer();

    }

});


// ESC key press karne par popup close ho
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeOffer();

    }

});