const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const buildImageCandidates = (baseName) => {
  const normalized = baseName.trim();
  const slugHyphen = normalized.replace(/\s+/g, "-");
  const slugUnderscore = normalized.replace(/\s+/g, "_");
  const encoded = encodeURIComponent(normalized);
  const roots = [normalized, slugHyphen, slugUnderscore, encoded];
  const extensions = [".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG", ".webp", ".WEBP"];
  const out = [];

  roots.forEach((root) => {
    extensions.forEach((ext) => out.push(`./${root}${ext}`));
  });

  return [...new Set(out)];
};

const resolveImage = (img) => {
  const baseName = img.dataset.base;
  if (!baseName) return;

  const candidates = [img.getAttribute("src"), ...buildImageCandidates(baseName)].filter(Boolean);
  let idx = 0;

  const tryNext = () => {
    if (idx >= candidates.length) {
      img.classList.add("missing-image");
      img.alt = `${img.alt} (image file not found)`;
      return;
    }

    const probe = new Image();
    const candidate = candidates[idx++];
    probe.onload = () => {
      img.src = candidate;
      const link = img.closest("a");
      if (link) {
        link.href = candidate;
      }
      img.classList.remove("missing-image");
    };
    probe.onerror = tryNext;
    probe.src = candidate;
  };

  tryNext();
};

document.querySelectorAll(".auto-image").forEach(resolveImage);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

const openLightbox = (src, alt) => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Expanded project screenshot";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

document.querySelectorAll(".gallery-item").forEach((item) => {
  const link = item.querySelector(".gallery-link");
  const image = item.querySelector("img");
  const expandBtn = item.querySelector(".expand-btn");

  if (!link || !image) return;

  const handleOpen = (event) => {
    event.preventDefault();
    openLightbox(link.href, image.alt);
  };

  link.addEventListener("click", handleOpen);
  if (expandBtn) {
    expandBtn.addEventListener("click", handleOpen);
  }
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
