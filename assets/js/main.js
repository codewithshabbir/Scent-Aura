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

import { Products as data } from "../../data.js";

document.getElementById("counter").innerHTML = `products (${data.length})`;
let product = document.getElementById("product-grid");
let paginationContainer = document.getElementById("pagination");

let currentPage = 1;
let itemsPerPage = 8;
let filteredData = [...data];

const showProduct = () => {
  product.innerHTML = "";
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let paginatedItems = filteredData.slice(start, end);

  paginatedItems.forEach((val) => {
    product.innerHTML += `
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <img src="${val.imgUrl}" alt="Product Image" class="w-full" />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">${val.Name}</h3>
          <p class="text-gray-600 text-sm">${val.Description.slice(
            0,
            60
          )}...</p>
          <p class="mt-2 text-red-500 font-bold">${val.Price}</p>
        </div>
      </div>`;
  });

  updatePagination();
};

const updatePagination = () => {
  paginationContainer.innerHTML = "";
  let totalPages = Math.ceil(filteredData.length / itemsPerPage);

  paginationContainer.innerHTML += `
    <button onclick="changePage(${
      currentPage - 1
    })" class="w-10 h-10 flex items-center justify-center bg-red-700 text-white rounded-full hover:bg-red-800" ${
    currentPage === 1 ? "disabled" : ""
  }>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>`;

  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.innerHTML += `
      <span onclick="changePage(${i})" class="cursor-pointer px-3 py-1 rounded-md ${
      i === currentPage ? "bg-red-700 text-white" : "hover:text-red-600"
    }">${i}</span>`;
  }

  paginationContainer.innerHTML += `
    <button onclick="changePage(${
      currentPage + 1
    })" class="w-10 h-10 flex items-center justify-center bg-red-700 text-white rounded-full hover:bg-red-800" ${
    currentPage === totalPages ? "disabled" : ""
  }>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>`;
};

window.changePage = (page) => {
  let totalPages = Math.ceil(filteredData.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  showProduct();
};

window.removeCategory = (category) => {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    if (checkbox.value == category) {
      checkbox.checked = false;
    }
  });
  checkboxes.forEach((checkbox) => {
    if (checkbox.value === category) {
      checkbox.dispatchEvent(new Event("change"));
    }
  });
};

document.getElementById("price-filter").addEventListener("change", (event) => {
  let value = event.target.value;
  if (value == "low-to-high") {
    filteredData.sort((a, b) => a.Price - b.Price);
  } else if (value == "high-to-low") {
    filteredData.sort((a, b) => b.Price - a.Price);
  }
  currentPage = 1;
  showProduct();
});

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    let selectedCategories = [
      ...document.querySelectorAll('input[type="checkbox"]:checked'),
    ].map((c) => c.value);

    // filter box after clicked
    let filter_box = document.getElementById("filter-box");
    filter_box.innerHTML = "";
    selectedCategories.forEach((category) => {
      filter_box.innerHTML += `<div onclick="removeCategory('${category}')" class="flex items-center bg-red-700 text-white rounded-full hover:bg-red-800 cursor-pointer py-2 px-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>${category}</span>
                      </div>`;
    });

    currentPage = 1;
    filteredData = selectedCategories.length
      ? data.filter((product) => selectedCategories.includes(product.Category))
      : [...data];

    showProduct();
  });
});
showProduct();
