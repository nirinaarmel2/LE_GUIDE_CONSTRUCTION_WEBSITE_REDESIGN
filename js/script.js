/* ============================================================
   DONNÉES
   ============================================================ */

const realisations = [
  {
    id: 1,
    categorie: "construction",
    emoji: "🏠",
    fond: "fond-r1",
    nom: "Villa Panoramique Ambatobe",
    annee: "2024",
    type: "Construction clé en main",
    desc: "Construction d'une villa moderne de 280 m² à Ambatobe."
  }
];

/* ============================================================
   VARIABLES
   ============================================================ */

let indexCourant = 0;
let realisationsVisibles = [];

/* ============================================================
   DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  genererRealisations();
  initNavScroll();
  initBurger();
  initFiltres();
  initLightbox();
  initStats();
  initEntrees();
  initNavActif();
});

/* ============================================================
   GÉNÉRER LES CARTES
   ============================================================ */

function genererRealisations() {

  const grille = document.querySelector("#grilleReal");

  if (!grille) return;

  grille.textContent = "";

  realisations.forEach((r) => {

    const carte = document.createElement("div");
    carte.classList.add("real", "visible");

    carte.dataset.cat = r.categorie;
    carte.dataset.id = r.id;

    /* fond */

    const fond = document.createElement("div");
    fond.classList.add("real__fond", r.fond);
    fond.textContent = r.emoji;

    /* info */

    const info = document.createElement("div");
    info.classList.add("real__info");

    const nom = document.createElement("span");
    nom.classList.add("real__nom");
    nom.textContent = r.nom;

    const annee = document.createElement("span");
    annee.classList.add("real__annee");
    annee.textContent = r.annee;

    const type = document.createElement("span");
    type.classList.add("real__type");
    type.textContent = r.type;

    info.appendChild(nom);
    info.appendChild(annee);
    info.appendChild(type);

    carte.appendChild(fond);
    carte.appendChild(info);

    carte.addEventListener("click", () => {
      ouvrirLightbox(r.id);
    });

    grille.appendChild(carte);

  });

}

/* ============================================================
   FILTRES
   ============================================================ */

function initFiltres() {

  const boutons = document.querySelectorAll(".filtre");

  boutons.forEach((btn) => {

    btn.addEventListener("click", () => {

      boutons.forEach((b) => {
        b.classList.remove("actif");
      });

      btn.classList.add("actif");

      appliquerFiltre(btn.dataset.cat);

    });

  });

}

function appliquerFiltre(cat) {

  const cartes = document.querySelectorAll(".real");

  cartes.forEach((carte) => {

    if (cat === "tout" || carte.dataset.cat === cat) {

      carte.classList.add("visible");

    } else {

      carte.classList.remove("visible");

    }

  });

}

/* ============================================================
   LIGHTBOX
   ============================================================ */

function initLightbox() {

  const fermer = document.querySelector("#lightboxFermer");
  const prev = document.querySelector("#lightboxPrev");
  const next = document.querySelector("#lightboxNext");
  const boite = document.querySelector("#lightbox");

  fermer?.addEventListener("click", fermerLightbox);
  prev?.addEventListener("click", lightboxPrecedent);
  next?.addEventListener("click", lightboxSuivant);

  boite?.addEventListener("click", (e) => {

    if (e.target === boite) {

      fermerLightbox();

    }

  });

  document.addEventListener("keydown", (e) => {

    const lb = document.querySelector("#lightbox");

    if (!lb || !lb.classList.contains("ouvert")) return;

    if (e.key === "Escape") fermerLightbox();

    if (e.key === "ArrowLeft") lightboxPrecedent();

    if (e.key === "ArrowRight") lightboxSuivant();

  });

}

function ouvrirLightbox(id) {

  const filtreCourant = document.querySelector(".filtre.actif");

  const cat = filtreCourant
    ? filtreCourant.dataset.cat
    : "tout";

  realisationsVisibles = realisations.filter((r) => {

    return cat === "tout" || r.categorie === cat;

  });

  indexCourant = realisationsVisibles.findIndex((r) => {

    return r.id === id;

  });

  afficherDansLightbox(realisationsVisibles[indexCourant]);

  const lb = document.querySelector("#lightbox");

  lb?.classList.add("ouvert");

  document.body.style.overflow = "hidden";

}

function fermerLightbox() {

  const lb = document.querySelector("#lightbox");

  lb?.classList.remove("ouvert");

  document.body.style.overflow = "";

}

function lightboxPrecedent() {

  if (!realisationsVisibles.length) return;

  indexCourant =
    (indexCourant - 1 + realisationsVisibles.length)
    % realisationsVisibles.length;

  afficherDansLightbox(realisationsVisibles[indexCourant]);

}

function lightboxSuivant() {

  if (!realisationsVisibles.length) return;

  indexCourant =
    (indexCourant + 1)
    % realisationsVisibles.length;

  afficherDansLightbox(realisationsVisibles[indexCourant]);

}

function afficherDansLightbox(r) {

  const apercu = document.querySelector("#lightboxApercu");
  const tag = document.querySelector("#lightboxTag");
  const titre = document.querySelector("#lightboxTitre");
  const annee = document.querySelector("#lightboxAnnee");
  const texte = document.querySelector("#lightboxTexte");

  if (apercu) {

    apercu.className = `lightbox__apercu ${r.fond}`;
    apercu.textContent = r.emoji;

  }

  if (tag) tag.textContent = r.type;

  if (titre) titre.textContent = r.nom;

  if (annee) {

    annee.textContent =
      `${r.annee} · ${r.categorie}`;

  }

  if (texte) texte.textContent = r.desc;

}

/* ============================================================
   NAV SCROLL
   ============================================================ */

function initNavScroll() {

  window.addEventListener("scroll", () => {

    const nav = document.querySelector("#nav");
    const flottant = document.querySelector("#flottant");

    nav?.classList.toggle("scroll", window.scrollY > 50);

    flottant?.classList.toggle(
      "visible",
      window.scrollY > 300
    );

  });

}

/* ============================================================
   BURGER
   ============================================================ */

function initBurger() {

  const burger = document.querySelector("#burger");

  burger?.addEventListener("click", toggleMenu);

}

function toggleMenu() {

  const mobile = document.querySelector("#mobile");

  mobile?.classList.toggle("ouvert");

}

function fermerMenu() {

  const mobile = document.querySelector("#mobile");

  mobile?.classList.remove("ouvert");

}

/* ============================================================
   STATS
   ============================================================ */

function initStats() {

  const stats = document.querySelector(".stats");

  if (!stats) return;

  let dejaAnime = false;

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting && !dejaAnime) {

        dejaAnime = true;

        const chiffres =
          document.querySelectorAll("[data-n]");

        chiffres.forEach((el) => {

          const cible =
            parseInt(el.dataset.n);

          let valeur = 0;

          const pas = cible / 50;

          const timer = setInterval(() => {

            valeur = Math.min(
              valeur + pas,
              cible
            );

            el.textContent =
              Math.floor(valeur) +
              (cible === 100 ? "%" : "+");

            if (valeur >= cible) {

              clearInterval(timer);

            }

          }, 20);

        });

      }

    });

  });

  observer.observe(stats);

}

/* ============================================================
   ENTRÉES
   ============================================================ */

function initEntrees() {

  const elements =
    document.querySelectorAll(".entree");

  const observer =
    new IntersectionObserver((entries) => {

      entries.forEach((entry, i) => {

        if (entry.isIntersecting) {

          setTimeout(() => {

            entry.target.classList.add("visible");

          }, i * 70);

        }

      });

    });

  elements.forEach((el) => {

    observer.observe(el);

  });

}

/* ============================================================
   NAV ACTIVE
   ============================================================ */

function initNavActif() {

  const ids = [
    "services",
    "valeurs",
    "realisations",
    "materiaux",
    "atelier",
    "showroom",
    "contact"
  ];

  window.addEventListener("scroll", () => {

    let courant = "";

    ids.forEach((id) => {

      const section =
        document.querySelector(`#${id}`);

      if (
        section &&
        window.scrollY >= section.offsetTop - 100
      ) {

        courant = id;

      }

    });

    const liens =
      document.querySelectorAll(
        ".nav__liens li a"
      );

    liens.forEach((a) => {

      a.classList.toggle(
        "actif",
        a.getAttribute("href") === `#${courant}`
      );

    });

  });

}