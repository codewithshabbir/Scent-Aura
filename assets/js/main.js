// Top Bar Slider
let span1 = document.getElementById("top-bar-slide-1");
let span2 = document.getElementById("top-bar-slide-2");

let isSpan1Visible = true;

setInterval(() => {
  if (isSpan1Visible) {
    span1.classList.remove("opacity-100");
    span1.classList.add("opacity-0");

    span2.classList.remove("opacity-0");
    span2.classList.add("opacity-100");
  } else {
    span1.classList.remove("opacity-0");
    span1.classList.add("opacity-100");

    span2.classList.remove("opacity-100");
    span2.classList.add("opacity-0");
  }
  isSpan1Visible = !isSpan1Visible;
}, 3000);

// Header
const header = document.getElementById("main-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileDrawer = document.getElementById("mobile-drawer");
const drawerOverlay = document.getElementById("drawer-overlay");

// Functions for Mobile Drawer
const toggleDrawer = (isOpen) => {
  mobileDrawer.classList.toggle("-translate-x-full", !isOpen);
  drawerOverlay.classList.toggle("hidden", !isOpen);
};

// Functions for Header Scroll Behavior
const handleScroll = () => {
  const shouldFixHeader = window.scrollY > 50;
  header.classList.toggle("fixed", shouldFixHeader);
  header.classList.toggle("top-0", shouldFixHeader);
  header.classList.toggle("left-0", shouldFixHeader);
  header.classList.toggle("shadow-lg", shouldFixHeader);
  header.classList.toggle("relative", !shouldFixHeader);
};

// Event Listeners
menuToggle.addEventListener("click", () => toggleDrawer(true));
drawerOverlay.addEventListener("click", () => toggleDrawer(false));
window.addEventListener("scroll", handleScroll);

